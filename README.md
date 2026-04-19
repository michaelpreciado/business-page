# business-page

Business landing page for Preciado Tech.

## About

Preciado Tech is a remote studio focused on practical AI workflows, automation systems, and polished digital tools.

This repository is safe to use as a starting point for your own studio or business landing page. The current version is intentionally static, contains no backend services, and does not include secrets, private keys, analytics tokens, or deployment credentials.

## Reuse and customization

You are welcome to fork or adapt this design under the MIT license.

Suggested first edits for reuse:
- update brand name and contact email
- adjust colors and copy to match your offer
- replace external links with your own projects and contact routes
- add your preferred deployment target

## Security notes

- No environment variables are required for the current site
- No third-party API keys are included
- `dist/` and `node_modules/` are ignored and should not be committed
- Use `.env.local` for future secrets and never commit it

## Tech Stack

- React
- Vite

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

This site is intended to be deployed to `preciado-tech.com`.

## License

MIT
