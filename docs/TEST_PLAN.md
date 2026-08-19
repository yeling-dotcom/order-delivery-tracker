# Test Plan

## v1 Success Scenario
1. Open app → dashboard shows seeded demo data, overdue items highlighted
2. Click "New Order" → fill customer name, order number, select assigned admin, set payment unpaid, schedule delivery for tomorrow
3. Save → order appears in Orders list with "pending" badge
4. Dashboard → new order shows incomplete, not overdue (delivery is tomorrow)
5. Edit order → change delivery date to 3 days ago → save
6. Dashboard → order now shows overdue, ranked at top
7. Click order → update status to "completed", payment to "paid"
8. Dashboard → order gone from overdue/incomplete list

## Empty States
- Delete all orders → Orders page: "No orders yet. Create your first order."
- Dashboard with no overdue items → "All caught up — no overdue or incomplete items."
- No deliveries scheduled → Deliveries page: "No deliveries scheduled yet."

## Error States
- Network down on form submit → "Couldn't save. Check your connection and try again."
- Missing required field (customer name) → inline validation, save button disabled

## Loading States
- Orders list → skeleton rows while fetching
- Dashboard → loading cards before data arrives
- Order detail → spinner until order + delivery loaded

## Permission Check (post Sprint 3)
- User A creates an order → User B cannot see it in their dashboard or orders list