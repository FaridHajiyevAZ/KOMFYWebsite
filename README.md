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

## Notes
- `.env`, `prisma/dev.db`, `uploads/` and `node_modules` are gitignored.
- SQLite is for local/dev. For production, switch `DATABASE_URL` to a hosted DB (Postgres/Turso) and run `prisma migrate deploy`.
- Email notifications activate when `SMTP_*` vars are set (and `npm i nodemailer`).
