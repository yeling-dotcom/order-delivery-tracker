# Dispatch — Order & Delivery Tracker

A working operations app for recording customer orders, scheduling deliveries,
and surfacing overdue, incomplete, and unpaid work. The demo-first v1 opens
directly to seeded data and does not require sign-in.

## Local development

1. Pull the linked Vercel environment: `vercel env pull .env.local`.
2. Apply `supabase/migrations/202608190001_initial_order_tracker.sql` to the
   linked Supabase project if the tables are not present.
3. Install dependencies and start Next.js: `pnpm install && pnpm dev`.
4. Open <http://localhost:3000>.

The production app is deployed by pushing `main`; do not deploy local files
with the Vercel CLI.
