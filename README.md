# PrivexLabs website

The marketing site for PrivexLabs: one page, built with [Next.js](https://nextjs.org) (App Router, TypeScript, CSS modules) and deployed on Vercel.

## Develop

Requires Node.js 24 (`nvm use` picks it up from `.nvmrc`).

```
npm install
npm run dev        # http://localhost:3000
npm test           # Vitest
npm run lint
npm run typecheck
npm run build      # production build (what Vercel runs)
```

## Where things live

- `src/content/site.ts`: every piece of copy and data on the page (nav, sections, capabilities, questions, WhatsApp links). Edit text here first.
- `src/components/sections/*`: one component per section, in page order (see `src/components/HomePage.tsx`).
- `src/layouts/SiteLayout`: header, index menu, footer, theme, custom cursor, and the shared site context.
- `src/lib`: canvas effects, hooks, and `contactForm.ts`, which posts the contact card to the PrivexLabs Google Form.
- `src/styles/tokens`: the design tokens; `src/app/globals.css` loads them.
- `public/theme-init.js`: applies the stored light/dark theme before first paint.

## Deploy

Vercel builds `main` with the Next.js preset; no configuration is needed beyond the Node 24 pin in `package.json`. Security headers are set in `next.config.ts`.
