# Deployment Guide

## Vercel

1. Import `michaelpreciado/business-page` into Vercel.
2. Framework preset should detect as `Vite`.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy.

## Domain setup

Primary domain:
- `preciado-tech.com`

Optional redirect/supporting domain:
- `www.preciado-tech.com`

After adding the domain in Vercel, update DNS at your registrar using the records Vercel provides.

## Safety notes

- No environment variables are required for the current version.
- If you add secrets later, keep them in Vercel project environment variables or local `.env.local` files.
- Never commit real tokens, API keys, or private credentials.
