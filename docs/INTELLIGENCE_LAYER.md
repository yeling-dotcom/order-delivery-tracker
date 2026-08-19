# Intelligence Layer

## Messy Inputs
Freehand order notes, customer details from WhatsApp messages, delivery instructions typed ad hoc.

## Auto-Structure (computed per order)
```json
{
  "order_id": "uuid",
  "priority_score": 85,
  "factors": {
    "days_overdue": 3,
    "payment_unpaid": true,
    "status_incomplete": true
  },
  "label": "overdue",
  "source": "rule_engine",
  "confidence": 1.0
}
```

## Events Tracked
order.created · order.status_changed · delivery.scheduled · delivery.status_changed · delivery.overdue_detected

## Scoring Rules (v1, rule-based)
| Factor | Points |
|---|---|
| Delivery overdue by 1+ days | +40 |
| Each additional day overdue (cap 30) | +10/day |
| Order incomplete (not completed/cancelled) | +20 |
| Payment unpaid on completed order | +15 |
| No delivery scheduled on confirmed order | +25 |

Score 0–100, ranked descending on dashboard.

## What Gets Ranked
All incomplete orders on the dashboard, sorted by priority_score desc.

## v1 vs Later
- **v1:** pure rule-based scoring computed at query time
- **Later:** ML on historical delivery patterns to predict delays before they happen; auto-extract order details from WhatsApp screenshots