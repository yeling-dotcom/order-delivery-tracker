# Data Model

## customers
- `id: uuid` (pk) · `name: text` · `phone: text` · `email: text` · `address: text` · `user_id: uuid` (nullable) · `created_at: timestamptz`

## admin_staff
- `id: uuid` (pk) · `name: text` · `email: text` · `phone: text` · `role: text` (default 'admin') · `user_id: uuid` (nullable) · `created_at: timestamptz`

## orders
- `id: uuid` (pk) · `order_number: text` · `customer_id: uuid` (fk → customers) · `status: text` (pending|confirmed|in_progress|completed|cancelled) · `payment_status: text` (unpaid|partial|paid) · `total_amount: numeric` · `assigned_admin_id: uuid` (fk → admin_staff) · `notes: text`
- AI fields: `priority_score: numeric` · `priority_source: text` · `priority_confidence: numeric` · `priority_review_status: text` (default 'unreviewed')
- `user_id: uuid` (nullable) · `created_at: timestamptz`

## deliveries
- `id: uuid` (pk) · `order_id: uuid` (fk → orders, cascade delete) · `scheduled_date: date` · `status: text` (scheduled|out_for_delivery|delivered|failed|missed) · `delivered_date: timestamptz` · `notes: text` · `user_id: uuid` (nullable) · `created_at: timestamptz`

## Relationships
- customer 1:N orders · admin_staff 1:N orders (assigned) · order 1:1 deliveries (v1)

## Derived Logic (not stored)
- **Delivery overdue:** `scheduled_date < today AND status NOT IN (delivered, failed)`
- **Order incomplete:** `status NOT IN (completed, cancelled)`
- **Order at risk:** incomplete AND (has overdue delivery OR (status = completed AND payment_status != paid))

## RLS
All tables: RLS enabled, permissive v1 policies (open read/write). Lock-down sprint replaces with `auth.uid() = user_id`.