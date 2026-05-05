import { useState, useEffect, useCallback } from 'react'

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'

/* ─── Agent colour palette ─────────────────────────────────────────────── */
const TRADING_AGENT = {
  id: 'trading',
  label: 'TRADING',
  color: '#facc15',
  glow: 'rgba(250,204,21,0.25)',
  icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
    </svg>
  ),
  endpoint: '/api/office/trading/portfolio',
  render: (d) => {
    if (!d) return null;
    const { openPosition, stats, recentTrades, dailyLoss } = d;
    const pnlColor = (stats?.totalPnL || 0) >= 0 ? '#39ff14' : '#ff453a';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Portfolio summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {[
            { k: 'totalTrades', l: 'Trades', c: '#facc15' },
            { k: 'winRate', l: 'Win %', c: '#39ff14' },
            { k: 'totalPnL', l: 'Total PnL', c: pnlColor },
          ].map(s => (
            <div key={s.k} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '8px 6px', textAlign: 'center' }}>
              <div style={{ fontSize: 16, fontFamily: 'var(--mono)', fontWeight: 700, color: s.c }}>
                {s.k === 'winRate' ? `${stats?.[s.k] || 0}%` : s.k === 'totalPnL' ? `$${(stats?.[s.k] || 0).toFixed(2)}` : (stats?.[s.k] || 0)}
              </div>
              <div style={{ fontSize: 9, color: 'var(--ink-mute)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Open position */}
        {openPosition ? (
          <div style={{ background: 'rgba(250,204,21,0.08)', border: '1px solid rgba(250,204,21,0.25)', borderRadius: 8, padding: '10px 12px' }}>
            <div style={{ fontSize: 9, color: '#facc15', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>Open Position</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: '#facc15' }}>{openPosition.productId}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, marginTop: 6 }}>
              <div><span style={{ fontSize: 9, color: 'var(--ink-mute)' }}>Entry </span><span style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--ink-dim)' }}>${parseFloat(openPosition.entryPrice).toFixed(4)}</span></div>
              <div><span style={{ fontSize: 9, color: 'var(--ink-mute)' }}>Qty </span><span style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--ink-dim)' }}>{parseFloat(openPosition.qty).toFixed(4)}</span></div>
              <div><span style={{ fontSize: 9, color: 'var(--ink-mute)' }}>SL </span><span style={{ fontSize: 11, fontFamily: 'var(--mono)', color: '#ff453a' }}>${parseFloat(openPosition.stopLoss).toFixed(4)}</span></div>
              <div><span style={{ fontSize: 9, color: 'var(--ink-mute)' }}>TP1 </span><span style={{ fontSize: 11, fontFamily: 'var(--mono)', color: '#39ff14' }}>${parseFloat(openPosition.tp1).toFixed(4)}</span></div>
            </div>
          </div>
        ) : (
          <div style={{ fontSize: 11, color: 'var(--ink-mute)', textAlign: 'center', padding: '8px', background: 'rgba(255,255,255,0.02)', borderRadius: 8 }}>
            No open position — waiting for signal
          </div>
        )}

        {/* Daily loss guard */}
        <div style={{ fontSize: 9, color: dailyLoss > 2 ? '#ff453a' : 'var(--ink-faint)', fontFamily: 'var(--mono)' }}>
          Daily loss: ${(dailyLoss || 0).toFixed(2)} / $2 limit
        </div>

        {/* Recent trades */}
        {recentTrades?.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ fontSize: 9, color: 'var(--ink-faint)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Recent</div>
            {recentTrades.slice(0, 4).map((t, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontFamily: 'var(--mono)', padding: '3px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ color: t.status === 'open' ? '#facc15' : t.pnlUsd >= 0 ? '#39ff14' : '#ff453a' }}>
                  {t.productId} {t.status === 'open' ? '🟡' : t.pnlUsd >= 0 ? '🟢' : '🔴'}
                </span>
                <span style={{ color: t.pnlUsd >= 0 ? '#39ff14' : '#ff453a' }}>
                  {t.pnlPct >= 0 ? '+' : ''}{t.pnlPct?.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Growth Trajectory Chart */}
        <GrowthChart trades={recentTrades} openPos={openPosition} stats={stats} />
      </div>
    );
  },
};

/* ─── Growth Trajectory Chart (canvas) ─────────────────────────────────── */
function GrowthChart({ trades, openPos, stats }) {
  const canvasRef = useRef(null);
  const [horizon, setHorizon] = useState('3d');

  const HORIZONS = {
    '24h': { points: 24, label: '24H', tickStep: 4 },
    '3d':  { points: 72, label: '3D',  tickStep: 12 },
    '1wk': { points: 168, label: '1W', tickStep: 24 },
    '2wk': { points: 336, label: '2W', tickStep: 48 },
    '1mo': { points: 720, label: '1M', tickStep: 120 },
  };


  const generateProjection = useCallback((startVal, hourlyReturn, volatility) => {
    const pts = HORIZONS[horizon].points;
    const data = [startVal];
    let v = startVal;
    for (let i = 1; i < pts; i++) {
      const rng = (Math.random() * 2 - 1) * volatility;
      v = v * (1 + hourlyReturn + rng);
      if (v < startVal * 0.5) v = startVal * 0.5; // floor at 50% loss
      data.push(v);
    }
    return data;
  }, [horizon]);


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.scale(dpr, dpr);


    const startVal = 20;
    const tradesCount = trades?.length || 0;
    const winRate = stats?.winRate ? parseFloat(stats.winRate) / 100 : 0.5;
    // Hourly return based on strategy: avg TP ~7.5%, avg SL ~3%, weighted by win rate
    const baseHourlyReturn = (winRate * 0.0035 - (1 - winRate) * 0.0015) || 0.001;
    const conservative = generateProjection(startVal, baseHourlyReturn * 0.5, 0.008);
    const base = generateProjection(startVal, baseHourlyReturn, 0.015);
    const optimistic = generateProjection(startVal, baseHourlyReturn * 1.8, 0.025);

    const allData = [...conservative, ...base, ...optimistic];
    const min = Math.min(...allData);
    const max = Math.max(...allData);
    const pad = (max - min) * 0.15 || startVal * 0.1;

    const yMin = Math.max(0, min - pad);
    const yMax = max + pad;
    const xMap = (i) => (i / (conservative.length - 1)) * W;
    const yMap = (v) => H - ((v - yMin) / (yMax - yMin)) * H;


    const drawLine = (data, color, dashed = false) => {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      if (dashed) ctx.setLineDash([4, 3]);
      else ctx.setLineDash([]);
      data.forEach((v, i) => {
        data.forEach((v, i) => { if (i === 0) ctx.moveTo(xMap(i), yMap(v)); else ctx.lineTo(xMap(i), yMap(v)); });
      });
      ctx.stroke();
    };


    const drawFill = (data, color) => {
      ctx.beginPath();
      data.forEach((v, i) => { if (i === 0) ctx.moveTo(xMap(i), yMap(v)); else ctx.lineTo(xMap(i), yMap(v)); });
      ctx.lineTo(xMap(data.length - 1), H);
      ctx.lineTo(xMap(0), H);
      ctx.closePath();
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, color + '30');
      grad.addColorStop(1, color + '00');
      ctx.fillStyle = grad;
      ctx.fill();
    };

    ctx.clearRect(0, 0, W, H);


    // Grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 0.5;
    ctx.setLineDash([]);
    for (let i = 0; i <= 4; i++) {
      const y = (H / 4) * i;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      const val = yMax - ((yMax - yMin) / 4) * i;
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.font = '9px JetBrains Mono, monospace';
      ctx.fillText(`$${val.toFixed(1)}`, 4, y - 3);
    }

    drawFill(conservative, '#64d2ff');
    drawFill(base, '#facc15');
    drawFill(optimistic, '#39ff14');
    drawLine(conservative, '#64d2ff', true);
    drawLine(base, '#facc15');
    drawLine(optimistic, '#39ff14', true);

    // Start dot
    const dotX = xMap(0), dotY = yMap(startVal);
    ctx.beginPath(); ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();
    ctx.strokeStyle = '#facc15'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.font = '9px JetBrains Mono, monospace';
    ctx.fillText(`$${startVal}`, dotX + 6, dotY + 3);


    // Open position entry marker
    if (openPos) {
      const entryX = xMap(0), entryY = yMap(startVal);
      ctx.setLineDash([2, 2]);
      ctx.strokeStyle = '#facc15'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(entryX, entryY + 20); ctx.lineTo(entryX + 50, entryY + 20); ctx.stroke();
      ctx.fillStyle = '#facc15'; ctx.font = '8px JetBrains Mono, monospace';
      ctx.fillText(`▶ ${openPos.productId} entry`, entryX + 4, entryY + 28);
    }

    // Horizon labels
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.font = '8px JetBrains Mono, monospace';
    ctx.fillText('NOW', 2, H - 3);
    ctx.textAlign = 'right';
    ctx.fillText(horizon, W - 2, H - 3);
    ctx.textAlign = 'left';
  }, [trades, openPos, stats, horizon, generateProjection]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 9, color: 'var(--ink-mute)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Growth Trajectory</span>
        {/* Horizon selector */}
        <div style={{ display: 'flex', gap: 3 }}>
          {Object.entries(HORIZONS).map(([k, v]) => (
            <button key={k} onClick={() => setHorizon(k)}
              style={{
                fontSize: 8, fontFamily: 'var(--mono)', letterSpacing: '0.06em',
                background: horizon === k ? 'rgba(250,204,21,0.2)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${horizon === k ? '#facc1560' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 4, padding: '2px 6px', color: horizon === k ? '#facc15' : 'var(--ink-faint)',
                cursor: 'pointer',
              }}>
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        {[
          { c: '#64d2ff', l: 'Conservative' },
          { c: '#facc15', l: 'Base Case' },
          { c: '#39ff14', l: 'Optimistic' },
        ].map(s => (
          <div key={s.l} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 16, height: 1.5, background: s.c, borderRadius: 1 }} />
            <span style={{ fontSize: 8, color: 'var(--ink-faint)', fontFamily: 'var(--mono)' }}>{s.l}</span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <canvas ref={canvasRef} width={320} height={120}
        style={{ borderRadius: 6, display: 'block', width: '100%', height: 'auto', background: 'rgba(255,255,255,0.02)' }} />

    </div>
  );
};

const AGENTS = [
  {
    id: 'campaign',
    label: 'CAMPAIGN',
    color: '#00f5d4',
    glow: 'rgba(0,245,212,0.25)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    endpoint: '/api/office/campaign',
    statKeys: [
      { key: 'total',        label: 'Total Leads' },
      { key: 'candidates',   label: 'Candidates' },
      { key: 'sent',         label: 'Sent' },
      { key: 'positiveReplies', label: 'Positive' },
      { key: 'followUpsDue', label: 'F/U Due' },
    ],
    render: (d) => d ? (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {[
          { key: 'total',        label: 'Total Leads' },
          { key: 'candidates',   label: 'Candidates' },
          { key: 'sent',         label: 'Sent' },
          { key: 'positiveReplies', label: 'Positive' },
          { key: 'followUpsDue', label: 'F/U Due' },
        ].map(sk => (
          <div key={sk.key} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '10px 12px' }}>
            <div style={{ fontSize: 22, fontFamily: 'var(--mono)', fontWeight: 700, color: '#00f5d4' }}>{d.campaign?.[sk.key] ?? '—'}</div>
            <div style={{ fontSize: 10, color: 'var(--ink-mute)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 2 }}>{sk.label}</div>
          </div>
        ))}
      </div>
    ) : null,
  },
  {
    id: 'signals',
    label: 'SIGNALS',
    color: '#39ff14',
    glow: 'rgba(57,255,20,0.25)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    endpoint: '/api/office/signals',
    render: (d) => d?.signal ? (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 10, color: 'var(--ink-mute)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Latest</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ink-dim)' }}>{d.signal.date}</span>
          {d.signal.hasDesign && <span style={{ fontSize: 9, background: 'rgba(57,255,20,0.15)', color: '#39ff14', borderRadius: 4, padding: '2px 6px', letterSpacing: '0.06em' }}>DESIGN ✓</span>}
        </div>
        {d.signal.tickers?.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {d.signal.tickers.map(t => (
              <span key={t} style={{ fontFamily: 'var(--mono)', fontSize: 12, background: 'rgba(57,255,20,0.12)', color: '#39ff14', border: '1px solid rgba(57,255,20,0.3)', borderRadius: 6, padding: '3px 8px' }}>${t}</span>
            ))}
          </div>
        )}
      </div>
    ) : <span style={{ color: 'var(--ink-mute)', fontSize: 12 }}>No signal data</span>,
  },
  {
    id: 'subscribers',
    label: 'SUBSCRIBERS',
    color: '#bf5af2',
    glow: 'rgba(191,90,242,0.25)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    endpoint: '/api/office/subscribers',
    render: (d) => (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
        {[
          { k: 'total',     l: 'Total',     c: '#bf5af2' },
          { k: 'active',    l: 'Active',    c: '#39ff14' },
          { k: 'pending',   l: 'Pending',   c: '#ff9f0a' },
          { k: 'cancelled', l: 'Cancelled', c: '#ff453a' },
        ].map(s => (
          <div key={s.k} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '10px 8px', textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontFamily: 'var(--mono)', fontWeight: 700, color: s.c }}>{d?.[s.k] ?? 0}</div>
            <div style={{ fontSize: 9, color: 'var(--ink-mute)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 2 }}>{s.l}</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'system',
    label: 'SYSTEM',
    color: '#ff9f0a',
    glow: 'rgba(255,159,10,0.25)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    endpoint: '/api/office/health',
    render: (d) => d?.checks ? (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {Object.entries(d.checks).map(([k, v]) => (
          <div key={k} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 10, color: 'var(--ink-mute)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{k}</span>
            <span style={{ fontSize: 10, fontFamily: 'var(--mono)', color: v.ok ? '#39ff14' : '#ff453a' }}>{v.ok ? '✓' : '✗'}</span>
          </div>
        ))}
      </div>
    ) : null,
  },
  {
    id: 'outreach',
    label: 'OUTREACH',
    color: '#64d2ff',
    glow: 'rgba(100,210,255,0.25)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
      </svg>
    ),
    endpoint: '/api/office/outreach',
    render: (d) => {
      const logs = d?.logs?.slice(-5).reverse() ?? []
      if (!logs.length) return <span style={{ color: 'var(--ink-mute)', fontSize: 12 }}>No outreach runs yet</span>
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {logs.map((log, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '8px 10px' }}>
              <div style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--ink-mute)', marginBottom: 4 }}>{log.date?.slice(0, 10)}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-dim)' }}>
                {log.results?.length > 0
                  ? log.results.map(r => `${r.platform}: ${r.posted ?? 0} posted`).join(' · ')
                  : <span style={{ color: 'var(--ink-mute)' }}>no results</span>
                }
              </div>
            </div>
          ))}
        </div>
      )
    },
  },
]

/* ─── Skeleton card ────────────────────────────────────────────────────── */
function Skeleton({ color }) {
  return (
    <div style={{
      background: 'var(--bg-2)', border: `1px solid rgba(255,255,255,0.06)`,
      borderLeft: `4px solid ${color}40`, borderRadius: 12, padding: 20,
      animation: 'pulse 1.5s ease-in-out infinite',
    }}>
      <div style={{ height: 16, background: 'rgba(255,255,255,0.06)', borderRadius: 4, marginBottom: 12 }} />
      <div style={{ height: 60, background: 'rgba(255,255,255,0.04)', borderRadius: 6 }} />
    </div>
  )
}

/* ─── Agent card ───────────────────────────────────────────────────────── */
function AgentCard({ agent, data, loading, error }) {
  const ts = data?.ts ? new Date(data.ts).toLocaleTimeString() : null

  return (
    <div style={{
      background: 'var(--bg-2)',
      border: `1px solid ${agent.color}30`,
      borderLeft: `4px solid ${agent.color}`,
      borderRadius: 12,
      padding: 20,
      boxShadow: `0 0 24px ${agent.glow}`,
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      transition: 'box-shadow 0.3s',
    }}>
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: agent.color }}>{agent.icon}</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: agent.color }}>{agent.label}</span>
        </div>
        {error && <span style={{ fontSize: 9, color: '#ff453a', fontFamily: 'var(--mono)', letterSpacing: '0.06em' }}>ERROR</span>}
        {ts && <span style={{ fontSize: 9, color: 'var(--ink-faint)', fontFamily: 'var(--mono)' }}>{ts}</span>}
      </div>

      {/* body */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[1,2].map(i => <div key={i} style={{ height: i === 1 ? 50 : 30, background: 'rgba(255,255,255,0.04)', borderRadius: 6, animation: 'pulse 1.5s ease-in-out infinite' }} />)}
        </div>
      ) : error ? (
        <div style={{ fontSize: 11, color: '#ff453a', fontFamily: 'var(--mono)' }}>{String(error).slice(0, 80)}</div>
      ) : (
        agent.render(data)
      )}
    </div>
  )
}

/* ─── Main page ────────────────────────────────────────────────────────── */
export default function MissionControl() {
  const [cards, setCards] = useState(Object.fromEntries([...AGENTS, TRADING_AGENT].map(a => [a.id, { data: null, loading: true, error: null }])))
  const [refreshedAt, setRefreshedAt] = useState(null)
  const [issues, setIssues] = useState([])

  const fetchAll = useCallback(async () => {
    await Promise.all([...AGENTS, TRADING_AGENT].map(async (agent) => {
      setCards(c => ({ ...c, [agent.id]: { ...c[agent.id], loading: true } }))
      try {
        const r = await fetch(API + agent.endpoint)
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        const json = await r.json()
        setCards(c => ({ ...c, [agent.id]: { data: json, loading: false, error: null } }))
      } catch (e) {
        setCards(c => ({ ...c, [agent.id]: { data: null, loading: false, error: e.message } }))
      }
    }))
    setRefreshedAt(new Date())
  }, [])

  useEffect(() => {
    fetchAll()
    const id = setInterval(fetchAll, 30_000)
    return () => clearInterval(id)
  }, [fetchAll])

  // Derive issues for coordinator
  useEffect(() => {
    const problems = []
    const c = cards
    if (c.system?.data && !c.system.data.ok) problems.push('SYSTEM DEGRADED')
    if (c.campaign?.data?.campaign?.followUpsDue > 0) problems.push(`${c.campaign.data.campaign.followUpsDue} FOLLOW-UPS DUE`)
    if (c.campaign?.error) problems.push('CAMPAIGN AGENT ERROR')
    if (c.signals?.error) problems.push('SIGNALS AGENT ERROR')
    if (c.trading?.data?.dailyLoss > 2) problems.push('TRADING DAILY LOSS LIMIT HIT')
    setIssues(problems)
  }, [cards])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--ink)', padding: '40px 20px' }}>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .mc-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(340px,1fr)); gap:20px; max-width:1200px; margin:0 auto; }
        .mc-bg { position:fixed; inset:0; z-index:0; pointer-events:none; overflow:hidden; }
        .mc-bg-line { position:absolute; background:rgba(255,255,255,0.025); }
      `}</style>

      {/* bg grid */}
      <div className="mc-bg">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={`h${i}`} className="mc-bg-line" style={{ left: 0, right: 0, top: `${i * 5}%`, height: 1 }} />
        ))}
        {Array.from({ length: 20 }, (_, i) => (
          <div key={`v${i}`} className="mc-bg-line" style={{ top: 0, bottom: 0, left: `${i * 5}%`, width: 1 }} />
        ))}
      </div>

      {/* coordinator header */}
      <div      style={{
        position: 'relative', zIndex: 1, textAlign: 'center', marginBottom: 40,
        maxWidth: 1200, margin: '0 auto 40px',
      }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.2em', color: 'var(--ink-faint)', marginBottom: 8 }}>
          F.R.I.D.A.Y. AGENT OFFICE
        </div>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, color: 'var(--ink)', margin: '0 0 12px', letterSpacing: '-0.02em' }}>
          Mission Control
        </h1>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: issues.length ? 'rgba(255,69,58,0.12)' : 'rgba(57,255,20,0.1)',
          border: `1px solid ${issues.length ? '#ff453a40' : '#39ff1440'}`,
          borderRadius: 999, padding: '5px 14px',
        }}>
          <div style={{
            width: 7, height: 7, borderRadius: '50%',
            background: issues.length ? '#ff453a' : '#39ff14',
            boxShadow: `0 0 6px ${issues.length ? '#ff453a' : '#39ff14'}`,
            animation: 'pulse 2s ease-in-out infinite',
          }} />
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', color: issues.length ? '#ff453a' : '#39ff14' }}>
            {issues.length ? issues.join(' · ') : 'ALL SYSTEMS NOMINAL'}
          </span>
        </div>
        {refreshedAt && (
          <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--ink-faint)', marginTop: 8 }}>
            LAST REFRESH {refreshedAt.toLocaleTimeString()}
          </div>
        )}
      </div>

      {/* agent grid */}
      <div className="mc-grid" style={{ position: 'relative', zIndex: 1 }}>
        {[...AGENTS, TRADING_AGENT].map(agent => (
          <AgentCard
            key={agent.id}
            agent={agent}
            data={cards[agent.id]?.data}
            loading={cards[agent.id]?.loading}
            error={cards[agent.id]?.error}
          />
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginTop: 40 }}>
        <button
          onClick={fetchAll}
          style={{
            fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em',
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 8, padding: '8px 20px', color: 'var(--ink-dim)',
            cursor: 'pointer', transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.1)'}
          onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.06)'}
        >
          REFRESH ↺
        </button>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--ink-faint)', marginTop: 10 }}>
          Auto-refreshes every 30s
        </div>
      </div>
    </div>
  )
}
