# Architecture

## Stack
Next.js 14 (App Router) + Supabase (Postgres) + Vercel.

## Build Now vs Later
- **Now:** orders CRUD, delivery scheduling, overdue dashboard, seeded demo data
- **Later:** auth + per-user RLS, AI priority scoring, automated admin reminders, WhatsApp integration

## Key User Action Flow
1. Admin opens "New Order" → enters customer, order details, assigned admin, payment status
2. Admin sets a delivery date on the same form
3. System stores order + delivery, computes overdue flags
4. Owner opens dashboard → sees overdue/incomplete items ranked
5. Owner clicks any item → sees full order + delivery detail, updates status

## Nav Shell
Persistent left sidebar (Dashboard, Orders, Deliveries, Customers) on desktop; hamburger menu on mobile. Current section highlighted.

## Layer Plan
1. **Data-access layer** — all Supabase queries in `lib/data/`
2. **UI components** — forms, lists, badges, dashboard cards
3. **Prioritization module** — overdue scoring in `lib/ai/` (additive; core works without it)

## Why Core Runs Without AI
Overdue detection is a date comparison (`scheduled_date < today AND status != delivered`). Priority scoring adds ranking — it doesn't gate functionality.

## Repo Structure
```
app/
  layout.tsx           # sidebar shell
  page.tsx             # dashboard
  orders/page.tsx      # list
  orders/new/page.tsx  # create
  orders/[id]/page.tsx # detail/edit
  deliveries/page.tsx  # list
  customers/page.tsx   # list
components/
  sidebar.tsx  order-form.tsx  status-badge.tsx  delivery-card.tsx
lib/
  data/     # orders.ts deliveries.ts customers.ts admin-staff.ts
  ai/       # prioritization.ts
  utils.ts
tests/
  orders.test.ts  deliveries.test.ts
```

## Module Map
1. **data-access** — owns all DB queries (orders, deliveries, customers, admin_staff). Built first.
2. **dashboard** — owns overdue/incomplete overview. Built second.
3. **orders** — owns create/edit/list forms + pages. Built third.
4. **deliveries** — owns scheduling + status tracking. Built fourth.
5. **prioritization** — owns overdue/risk scoring. Built last (additive).