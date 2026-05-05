require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Subscriber DB ─────────────────────────────────────────────────────────
const DB_FILE = path.join(__dirname, '../data/subscribers.json');

function loadSubs() {
  if (!fs.existsSync(DB_FILE)) return [];
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}
function saveSubs(subs) {
  fs.writeFileSync(DB_FILE, JSON.stringify(subs, null, 2));
}
function upsertSub(email, updates = {}) {
  const subs = loadSubs();
  const existing = subs.find(s => s.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    Object.assign(existing, updates, { updatedAt: Date.now() });
  } else {
    subs.push({ email, subscribedAt: Date.now(), plan: 'pro', ...updates });
  }
  saveSubs(subs);
  return loadSubs().find(s => s.email.toLowerCase() === email.toLowerCase());
}

// ─── Middleware ────────────────────────────────────────────────────────────
app.use(cors());

// Stripe webhook needs raw body — mount before json parser
app.post('/api/webhook/stripe', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.warn('[webhook] STRIPE_WEBHOOK_SECRET not set — skipping signature verification');
    return res.status(500).json({ error: 'Webhook secret not configured' });
  }

  let event;
  try {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('[webhook] Signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  const subs = loadSubs();

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const email = session.customer_email || session.metadata?.email;
    if (email) {
      const existing = subs.find(s => s.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        existing.status = 'active';
        existing.customerId = session.customer;
        existing.plan = session.metadata?.plan || 'pro';
      } else {
        subs.push({
          email,
          status: 'active',
          customerId: session.customer,
          subscribedAt: Date.now(),
          plan: session.metadata?.plan || 'pro',
        });
      }
      console.log(`[webhook] Activated: ${email}`);
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object;
    const record = subs.find(s => s.customerId === sub.customer);
    if (record) {
      record.status = 'cancelled';
      console.log(`[webhook] Cancelled: ${record.email}`);
    }
  }

  saveSubs(subs);
  res.json({ received: true });
});

// ─── Welcome email (instant first signal) ──────────────────────────────────
function sendWelcomeEmail(email) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('[subscribe] RESEND_API_KEY not set — skipping welcome email');
    return;
  }
  const scriptPath = path.join(__dirname, '../../data/stocks/scripts/send-welcome-email.cjs');
  if (!fs.existsSync(scriptPath)) {
    console.warn('[subscribe] send-welcome-email.cjs not found at', scriptPath);
    return;
  }
  spawn('node', [scriptPath, email], {
    stdio: ['ignore', 'pipe', 'pipe'],
    detached: true,
    env: { ...process.env },
  }).on('error', (err) => {
    console.error('[subscribe] Welcome email spawn error:', err.message);
  });
  console.log(`[subscribe] Triggered welcome email for ${email}`);
}

// ─── API Routes ─────────────────────────────────────────────────────────────
app.use(express.json());

// Add a pending subscriber (called from email capture or admin)
app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email required' });
  }
  const existing = loadSubs().find(s => s.email.toLowerCase() === email.toLowerCase());
  if (existing?.status === 'active') {
    return res.json({ message: 'Already subscribed', status: 'active' });
  }
  upsertSub(email, { status: 'pending' });
  sendWelcomeEmail(email);
  res.json({ message: "You're in — check your inbox for your first signal!", status: 'pending' });
});

// Confirm a subscriber manually (admin use)
app.post('/api/admin/activate', (req, res) => {
  const { email, apiKey } = req.body;
  if (apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  if (!email) return res.status(400).json({ error: 'email required' });
  upsertSub(email, { status: 'active' });
  res.json({ message: 'Activated', email });
});

// Get subscriber stats
app.get('/api/subscribers', (req, res) => {
  const subs = loadSubs();
  const active = subs.filter(s => s.status === 'active');
  res.json({
    total: subs.length,
    active: active.length,
    pending: subs.filter(s => s.status === 'pending').length,
    cancelled: subs.filter(s => s.status === 'cancelled').length,
  });
});

// ─── Contact Form ───────────────────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { name, email, focus, details } = req.body;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email required' });
  }
  if (!details || details.trim().length < 10) {
    return res.status(400).json({ error: 'Please describe your task (at least 10 characters)' });
  }
  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'Email service not configured' });
  }

  const https = require('https');
  const b = '<br><br>';
  const htmlBody = [
    `New inquiry from preciadotech.com`,
    b,
    `<strong>Name:</strong> ${name || '(not provided)'}`,
    `<strong>Email:</strong> ${email}`,
    `<strong>Interested in:</strong> ${focus || 'automation'}`,
    b,
    `<strong>Task / Pain point:</strong>`,
    `<p>${details}</p>`,
  ].join('');

  const payload = JSON.stringify({
    from: 'Preciado Tech Website <signals@preciado-tech.com>',
    to: ['michael@preciadotech.com'],
    subject: `[Lead] ${name || email} — ${focus || 'automation'} inquiry`,
    html: htmlBody,
  });

  const apiKey = process.env.RESEND_API_KEY;
  const opts = {
    hostname: 'api.resend.com', path: '/emails', method: 'POST',
    headers: { 'Authorization': 'Bearer ' + apiKey, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) },
  };


  return new Promise((resolve) => {
    const req2 = https.request(opts, (r) => {
      let data = ''; r.on('data', c => data += c);
      r.on('end', () => {
        if (r.statusCode === 200) {
          res.json({ message: 'Message received — Michael will reply within 1 business day.' });
        } else {
          console.error('[contact] Resend error:', data);
          res.status(500).json({ error: 'Failed to send. Please email directly at michael@preciadotech.com' });
        }
        resolve();
      });
    });
    req2.on('error', (e) => {
      console.error('[contact] request error:', e.message);
      res.status(500).json({ error: 'Network error. Please email directly at michael@preciadotech.com' });
      resolve();
    });
    req2.write(payload); req2.end();
  });
});

// Health check
app.get('/api/health', (_, res) => res.json({ ok: true, ts: Date.now() }));

// ═══════════════════════════════════════════════════════════════════════════
// MISSION CONTROL — Agent Office Endpoints
// ═══════════════════════════════════════════════════════════════════════════

const LEADS_FILE = '/home/mp/Documents/Preciado Tech/Friday/Outreach/leads.md';
const DATA_DIR   = '/home/mp/openclaw-workspaces/friday/data/stocks/data';
const SCRIPTS_DIR = '/home/mp/openclaw-workspaces/friday/data/stocks/scripts';

function runScript(scriptName, args = []) {
  return new Promise((resolve) => {
    const scriptPath = path.join(SCRIPTS_DIR, scriptName);
    if (!fs.existsSync(scriptPath)) { resolve({ error: `Script not found: ${scriptPath}` }); return; }
    const child = spawn('node', [scriptPath, ...args], { stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = '', stderr = '';
    child.stdout.on('data', d => stdout += d);
    child.stderr.on('data', d => stderr += d);
    child.on('close', code => resolve({ stdout, stderr, code }));
    child.on('error', err => resolve({ error: err.message }));
  });
}

function parseLeads() {
  if (!fs.existsSync(LEADS_FILE)) return [];
  const content = fs.readFileSync(LEADS_FILE, 'utf8');
  const lines = content.split('\n');
  const leads = [];
  let inTable = false;
  for (const line of lines) {
    if (line.includes('Date Added')) { inTable = true; continue; }
    if (!inTable) continue;
    if (line.includes('---')) continue;
    if (!line.trim()) { inTable = false; continue; }
    const cols = line.split('|').slice(1, -1).map(c => c.trim()).filter(Boolean);
    if (cols.length < 9) continue;
    leads.push({
      name: cols[1], contact: cols[2], industry: cols[3],
      source: cols[4], score: parseInt(cols[5]) || 0,
      painPoint: cols[6], offer: cols[7],
      status: (cols[8] || '').toLowerCase().trim(),
      dateContacted: cols[9] || '', followUpDue: cols[10] || '',
      response: cols[11] || '', nextStep: cols[12] || '', notes: cols[13] || '',
    });
  }
  return leads;
}

function getSubscriberStats() {
  const dbPath = path.join(DATA_DIR, 'subscribers.json');
  if (!fs.existsSync(dbPath)) return { total: 0, active: 0, pending: 0, cancelled: 0 };
  const subs = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  return {
    total: subs.length,
    active: subs.filter(s => s.status === 'active').length,
    pending: subs.filter(s => s.status === 'pending').length,
    cancelled: subs.filter(s => s.status === 'cancelled').length,
  };
}

function getLatestSignal() {
  const artifactsDir = path.join(DATA_DIR, '../artifacts');
  if (!fs.existsSync(artifactsDir)) return null;
  const dirs = fs.readdirSync(artifactsDir).filter(d => /^\d{4}-\d{2}-\d{2}$/.test(d));
  if (!dirs.length) return null;
  dirs.sort().reverse();
  const latestDir = dirs[0];
  const files = fs.readdirSync(path.join(artifactsDir, latestDir)).filter(f => f.endsWith('.md') && !f.includes('design'));
  if (!files.length) return { date: latestDir, hasDesign: fs.existsSync(path.join(artifactsDir, latestDir, 'ticker-signals-design.png')) };
  const signalFile = path.join(artifactsDir, latestDir, files[0]);
  const raw = fs.readFileSync(signalFile, 'utf8');
  const titleMatch = raw.match(/^#\s+(.+)/m);
  const tickerMatch = raw.match(/\$([A-Z]{1,5})/g);
  return {
    date: latestDir,
    title: titleMatch ? titleMatch[1].trim() : files[0].replace('.md', ''),
    tickers: tickerMatch ? [...new Set(tickerMatch.map(m => m.substring(1)))] : [],
    hasDesign: fs.existsSync(path.join(artifactsDir, latestDir, 'ticker-signals-design.png')),
    designPath: `/artifacts/${latestDir}/ticker-signals-design.png`,
  };
}

// GET /api/office/summary — high-level overview of all agents
app.get('/api/office/summary', async (_, res) => {
  const leads = parseLeads();
  const subs = getSubscriberStats();
  const signal = getLatestSignal();
  const today = new Date().toISOString().split('T')[0];
  const followUpsDue = leads.filter(l => l.followUpDue?.trim() && l.followUpDue.trim() <= today && l.status === 'sent');
  const outreachLogPath = path.join(DATA_DIR, 'outreach-log.json');
  const lastOutreach = fs.existsSync(outreachLogPath)
    ? JSON.parse(fs.readFileSync(outreachLogPath, 'utf8')).slice(-1)[0]
    : null;

  res.json({
    ts: Date.now(),
    campaign: {
      total: leads.length,
      candidates: leads.filter(l => l.status === 'candidate').length,
      sent: leads.filter(l => l.status === 'sent').length,
      positiveReplies: leads.filter(l => l.status === 'positive_reply').length,
      followUpsDue: followUpsDue.length,
    },
    subscribers: subs,
    signal: signal ? { date: signal.date, tickers: signal.tickers } : null,
    outreach: lastOutreach ? { date: lastOutreach.date, results: lastOutreach.results } : null,
  });
});

// GET /api/office/campaign — full campaign agent data
app.get('/api/office/campaign', (_, res) => {
  const leads = parseLeads();
  const today = new Date().toISOString().split('T')[0];
  const buckets = { candidate: 0, approved_to_send: 0, sent: 0, follow_up_due: 0, positive_reply: 0, not_interested: 0, client: 0 };
  leads.forEach(l => { buckets[l.status] = (buckets[l.status] || 0) + 1; });
  const sortedLeads = [...leads].sort((a, b) => b.score - a.score);
  const enriched = sortedLeads.map(l => ({
    ...l,
    followUpDueSoon: !!(l.followUpDue?.trim() && l.followUpDue.trim() <= today && l.status === 'sent'),
  }));
  res.json({ buckets, leads: enriched, ts: Date.now() });
});

// GET /api/office/subscribers — enhanced subscriber data
app.get('/api/office/subscribers', (_, res) => {
  const dbPath = path.join(DATA_DIR, 'subscribers.json');
  if (!fs.existsSync(dbPath)) return res.json({ total: 0, active: 0, pending: 0, cancelled: 0, subscribers: [], ts: Date.now() });
  const subs = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  const stats = getSubscriberStats();
  res.json({
    ...stats,
    subscribers: subs.map(s => ({
      email: s.email,
      status: s.status,
      plan: s.plan,
      subscribedAt: s.subscribedAt,
      updatedAt: s.updatedAt,
    })),
    ts: Date.now(),
  });
});

// GET /api/office/outreach — outreach log + last run
app.get('/api/office/outreach', (_, res) => {
  const logPath = path.join(DATA_DIR, 'outreach-log.json');
  const logs = fs.existsSync(logPath) ? JSON.parse(fs.readFileSync(logPath, 'utf8')) : [];
  res.json({ logs, ts: Date.now() });
});

// GET /api/office/signals — latest signal metadata
app.get('/api/office/signals', (_, res) => {
  const signal = getLatestSignal();
  res.json({ signal, ts: Date.now() });
});

// GET /api/office/health — system health check
app.get('/api/office/health', async (_, res) => {
  const checks = {
    leadsFile: { ok: fs.existsSync(LEADS_FILE), path: LEADS_FILE },
    subscriberDb: { ok: fs.existsSync(path.join(DATA_DIR, 'subscribers.json')), path: path.join(DATA_DIR, 'subscribers.json') },
    outreachLog: { ok: fs.existsSync(path.join(DATA_DIR, 'outreach-log.json')), path: path.join(DATA_DIR, 'outreach-log.json') },
    scriptsDir: { ok: fs.existsSync(SCRIPTS_DIR), path: SCRIPTS_DIR },
    resendConfigured: { ok: !!process.env.RESEND_API_KEY },
    stripeConfigured: { ok: !!process.env.STRIPE_SECRET_KEY },
  };
  const allOk = Object.values(checks).every(c => c.ok);
  res.json({ ok: allOk, checks, ts: Date.now() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Endpoints: /api/webhook/stripe | /api/subscribe | /api/contact`);
});
