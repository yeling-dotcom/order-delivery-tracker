# Order & Delivery Tracker — PRD

## Problem
Admin staff process orders and arrange deliveries through WhatsApp, paper, and spreadsheets. Orders get missed, deliveries delayed, and the owner spends hours chasing staff for status.

## Target User
- **Business owner** — needs instant oversight of overdue/incomplete items
- **Admin staff** — records orders, schedules deliveries, updates status

## Core Objects
- **customers** — name, contact, address
- **admin_staff** — name, role, contact
- **orders** — order_number, customer, status, payment_status, assigned admin, notes
- **deliveries** — order, scheduled_date, status, delivered_date

## MVP (v1) Checklist
- [ ] Admin creates an order (customer, items, payment status, assigned admin)
- [ ] Admin schedules a delivery date on the same order
- [ ] Update order status (pending → confirmed → in_progress → completed/cancelled)
- [ ] Update delivery status (scheduled → out_for_delivery → delivered/failed)
- [ ] Dashboard: overdue deliveries + incomplete orders, ranked
- [ ] Orders list with status/payment badges, filterable
- [ ] Deliveries list with overdue highlighting
- [ ] No login wall — seeded demo data renders immediately

## Non-goals (v1)
Mobile app, accounting, inventory, route planning, GPS tracking, automated customer messaging.

## Success Criteria
Owner opens the dashboard, sees 2 overdue deliveries and 1 unpaid-but-completed order highlighted, drills into details. An admin then creates a new order with a scheduled delivery — all without leaving the app or signing in.