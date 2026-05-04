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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Endpoints: /api/webhook/stripe | /api/subscribe | /api/contact`);
});
