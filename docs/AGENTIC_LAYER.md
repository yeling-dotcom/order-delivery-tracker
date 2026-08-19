# Agentic Layer

## Draftable Actions (low risk — auto)
- Compute priority score for new/updated orders
- Draft a summary of overdue items for the owner

## Executable After Approval (medium risk)
- Send reminder to assigned admin about overdue delivery (owner approves send)
- Flag delivery as "missed" when overdue by 3+ days (admin approves)

## Human-Only (high/critical risk)
- Cancel an order
- Mark payment as paid (financial impact)
- Delete any record

## Named Tools
`compute_priority` · `draft_overdue_summary` · `send_admin_reminder` · `flag_delivery_missed`

No raw SQL or arbitrary execution — every automated action calls a named server function.

## Audit-Log Fields
`action_type` · `actor` (user_id or 'system') · `target_type` · `target_id` · `before_state` (jsonb) · `after_state` (jsonb) · `timestamp` · `approved_by`

## v1 vs Later
- **v1:** no agentic actions — owner and admin do everything manually. Priority score is computed but not acted upon.
- **Later:** automated reminders, auto-status updates with approval, WhatsApp integration for staff notifications.