# Security

## Secret Handling
- Supabase service role key: server-side only (env var, never imported in client components)
- Client uses anon key with RLS policies
- No secrets in frontend code or environment-exposed vars

## Permission Model
- **v1 (demo-first):** permissive policies — open read/write so demo works without login
- **Lock-down sprint:** replace with `auth.uid() = user_id` on all tables
  - Owner: sees all data for their business
  - Admin staff: create/edit orders and deliveries, cannot delete

## Approved-Tools Rule
Any automated action calls a named server function (e.g. `send_admin_reminder`), never raw SQL or arbitrary code execution. Agent inherits the acting user's permissions.

## Audit Principle
Every status change, delivery update, and deletion writes to audit_log with before/after state. The owner can see who changed what and when. No meaningful action goes unlogged.

## Data Integrity
- `order_number` is required (not null)
- `scheduled_date` is required on deliveries
- Foreign keys enforce referential integrity
- Cascade delete: removing an order removes its delivery
- Status values constrained at the application layer (enum validation)