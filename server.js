const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Security: basic hardening
app.disable('x-powered-by');

// --- World Cup 2026 results proxy (football-data.org) ---
// Hides the API token and caches upstream so the free tier (10 req/min) is hit
// at most once per cache window regardless of how many visitors are on the page.
// 2 min keeps us at ~30 calls/hour (well under the limit) while surfacing a
// finished score within ~2 min — and live/in-play scores too if the free tier
// exposes them.
const WC_CACHE_MS = 2 * 60 * 1000;
const WC_CACHE = { at: 0, data: null };
app.get('/mundial/api/results', async (_req, res) => {
  const token = process.env.FOOTBALL_DATA_TOKEN;
  if (!token) return res.json({ matches: [], note: 'no token configured' });
  const now = Date.now();
  if (WC_CACHE.data && now - WC_CACHE.at < WC_CACHE_MS) return res.json(WC_CACHE.data);
  try {
    const r = await fetch('https://api.football-data.org/v4/competitions/WC/matches', {
      headers: { 'X-Auth-Token': token },
    });
    if (!r.ok) throw new Error('upstream ' + r.status);
    const j = await r.json();
    const matches = (j.matches || []).map(m => ({
      group: m.group,
      stage: m.stage,
      status: m.status,
      utcDate: m.utcDate,
      venue: m.venue || null,
      homeTeam: { name: m.homeTeam && m.homeTeam.name },
      awayTeam: { name: m.awayTeam && m.awayTeam.name },
      // winner + penalties are needed for knockout rounds (a tie in fullTime can
      // still have a winner via extra time / shootout).
      score: {
        winner: m.score?.winner ?? null,
        duration: m.score?.duration ?? null,
        fullTime: { home: m.score?.fullTime?.home ?? null, away: m.score?.fullTime?.away ?? null },
        penalties: { home: m.score?.penalties?.home ?? null, away: m.score?.penalties?.away ?? null },
      },
    }));
    if (matches.length > 0) { // empty almost always means rate-limited — don't poison cache
      WC_CACHE.data = { matches };
      WC_CACHE.at = now;
    }
    res.json(WC_CACHE.data || { matches });
  } catch (e) {
    if (WC_CACHE.data) return res.json(WC_CACHE.data); // serve stale on upstream error
    res.json({ matches: [], error: String(e) });
  }
});

// Note: apex → www redirect is handled by GoDaddy's domain forwarding feature,
// so the Express app only ever sees www.mexusseller.com requests. No app-level
// redirect needed.

app.use(express.static(__dirname, {
  extensions: ['html'],
  maxAge: '1h',
  setHeaders: (res, filePath) => {
    // Long cache for immutable assets
    if (/\.(png|jpe?g|svg|webp|ico|woff2?)$/i.test(filePath)) {
      res.setHeader('Cache-Control', 'public, max-age=2592000, immutable');
    }
  },
}));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Simple 200 OK for Railway/Render health probes
app.get('/health', (_req, res) => res.status(200).json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`MEXUS Landing running on port ${PORT}`);
});
