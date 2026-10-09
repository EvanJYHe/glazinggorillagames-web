# Agents

This project uses the Payload CMS skill at `.agents/skills/payload/`.
Start with `.agents/skills/payload/SKILL.md` for a quick reference, then see `.agents/skills/payload/reference/` for detailed docs.

## Verification

- `pnpm test:int` — vitest integration tests (needs `DATABASE_URL` in `.env`).
- `pnpm test:e2e` — Playwright against `pnpm dev` on :3000; run `pnpm exec playwright install chromium` once first.
- `pnpm build` — check the static social preview at `http://localhost:3000/` → `og:image` URL after `pnpm start`.
- `pnpm lint` currently fails on the legacy `.eslintrc` config (circular `react` plugin reference), unrelated to app code.

## Social preview

`public/social-preview.png` is the static 1200×630 share image. Shared Open Graph
and Twitter metadata, including its alt text, lives in `src/lib/site.js`.
Replace the PNG when the preview design changes. Do not restore runtime image generation:
repeated image processing was implicated in production memory growth.
