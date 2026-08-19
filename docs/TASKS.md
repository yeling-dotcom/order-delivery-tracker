# Tasks & Sprints

## Sprint 1: DB + Core Engine *(v1 functional milestone)*
Goal: Orders and deliveries created, tracked, and flagged as overdue — no login required.
- [ ] Supabase migration (customers, admin_staff, orders, deliveries) + seed data
- [ ] Data-access layer (`lib/data/`) for all CRUD
- [ ] Sidebar nav shell (Dashboard, Orders, Deliveries, Customers)
- [ ] "New Order" form (customer, order details, assigned admin, schedule delivery)
- [ ] Orders list with status/payment badges
- [ ] Order detail page: status update + delivery scheduling
- [ ] Deliveries list with overdue highlighting
- [ ] Dashboard: overdue deliveries + incomplete orders, ranked
- **DoD:** Admin creates an order with a scheduled delivery → it appears on the dashboard → if delivery date is past, it shows overdue. All without login.

## Sprint 2: Polish + Edge States
- [ ] Loading/empty/error states on every page
- [ ] Filter orders by status, payment, assigned admin
- [ ] Edit existing orders and deliveries
- [ ] Delete order (cascade) with confirmation modal
- [ ] Customer list page
- **DoD:** Every screen handles empty/error/loading. Filters + edits persist.

## Sprint 3: Lock It Down (Auth + RLS)
- [ ] Supabase auth (signup/login)
- [ ] Replace permissive policies with `auth.uid() = user_id`
- [ ] Assign user_id on all creates
- [ ] Redirect unauthenticated users to login
- **DoD:** User signs up, creates orders, sees only their data. Another user's data is invisible.

## Sprint 4: Smart Features
- [ ] Priority scoring engine (rule-based, stored on order)
- [ ] Dashboard ranks by priority_score
- [ ] Overdue summary draft for owner
- **DoD:** Dashboard items ranked by computed priority. Summary is readable.

## Gantt
```
S1 ████████  DB + Core Engine (v1 functional)
S2 ████      Polish + Edge States
S3 ████      Lock It Down (Auth + RLS)
S4 ████      Smart Features
```