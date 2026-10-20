# KOMFY — Mattress Manufacturer Website

B2B mattress manufacturer site (OEM & Private Label, Industries, Manufacturing, Quality, Quote) + retail catalog, with a built-in admin panel. Next.js 15 (App Router) · TypeScript · Tailwind CSS · Prisma (SQLite) · 3 languages (AZ / EN / RU).

## Features
- **Public B2B site** — home, OEM, Manufacturing, Industries, Quality, Products, Request-a-Quote (working forms).
- **i18n** — `/az`, `/en`, `/ru` with locale routing, `hreflang`, per-locale `<html lang>` and metadata.
- **Admin panel** (`/admin`) — products & prices, reviews, homepage blocks (per language), leads/enquiries, site settings, users & roles (RBAC: admin / operator).
- **Database** — Prisma + SQLite; forms save to DB and (optionally) email.

## Setup
```bash
npm install
cp .env.example .env          # then edit AUTH_SECRET etc.
npx prisma generate
npx prisma migrate dev        # creates the SQLite DB
npm run db:seed               # seeds products, reviews, users
npm run dev                   # http://localhost:3000
```

Default admin: `admin@komfy.az` / `admin123` · operator: `operator@komfy.az` / `operator123` (change after first login).

## Deploy (Render)
The `build` script runs `prisma/prepare-db.mjs` first. On Render (detected via the `RENDER` env var) it runs `prisma generate`, `prisma db push` (creates all tables, incl. `Lead`), then **seeds only if the DB is empty** — so products/reviews/users appear on first deploy and admin edits are preserved on later deploys. Locally it only runs `prisma generate` (db push is skipped because it hangs on iCloud).

**In the Render dashboard set:**
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm run start`
- **Environment variables:** `AUTH_SECRET` (long random string), `SITE_URL` (your live URL), and `DATABASE_URL`.
- **Persistence (recommended):** add a **Disk** mounted at `/var/data` and set `DATABASE_URL=file:/var/data/komfy.db`. Without a disk the SQLite file is **ephemeral** — products still show (re-seeded each deploy) but admin edits and new leads are lost on every deploy. `render.yaml` captures this setup.
- Homepage/product **images** uploaded in admin save to `public/uploads/` (git-tracked). On Render's ephemeral FS, upload **locally** then commit+push for them to persist, or rely on the disk if the upload path is on it.

## Notes
- `.env`, `prisma/dev.db` and `node_modules` are gitignored. Root `/uploads/` (lead files) is ignored; `public/uploads/` (site images) is tracked.
- SQLite works in production with a Render disk; for scale switch `DATABASE_URL` to Postgres/Turso.
- Email notifications activate when `SMTP_*` vars are set (and `npm i nodemailer`).
