# MEXUS SELLER — Landing (mexusseller.com)

Marketing site for [MEXUS SELLER](https://mexusseller.com). Companion to the client dashboard at `app.mexusseller.com`.

## Stack
- Vanilla HTML / CSS / JS — no frameworks
- Google Fonts (Barlow Condensed + Inter)
- Express static server for Railway deploy

## Local dev

```bash
npm install
npm start
# → http://localhost:3000
```

## Deploy (Railway)

1. Push to GitHub (`MMEXUSSELLER/mexus-landing`).
2. Create a new Railway project → **Deploy from GitHub repo**.
3. Railway auto-detects Node, installs deps, starts `npm start`.
4. Attach custom domain `mexusseller.com` in Railway → Settings → Domains.
5. Point DNS records at Railway (A + CNAME).

The client dashboard is a **separate** Railway project deployed at `app.mexusseller.com`.

## TODOs
- Replace placeholder WhatsApp number (`wa.me/525512345678`) with real line.
- Replace platform-screenshot placeholders in `#plataforma` with real dashboard screenshots (see `assets/platform/`).
- Add proper `og-image.png` for social sharing.
- Update LOGIN href from staging Railway URL to `https://app.mexusseller.com` once that DNS is live.
