const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Security: basic hardening
app.disable('x-powered-by');

// Redirect www → apex
app.use((req, res, next) => {
  if (req.hostname && req.hostname.startsWith('www.')) {
    return res.redirect(301, 'https://' + req.hostname.slice(4) + req.originalUrl);
  }
  next();
});

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
