import Link from "next/link";
import { getDashboardOrders } from "@/lib/data/orders";
import { formatCurrency, formatDate, getPriority } from "@/lib/utils";
import { StatusBadge } from "@/components/status-badge";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const orders = await getDashboardOrders();
  const overdue = orders.filter((order) => order.isOverdue);
  const unpaidCompleted = orders.filter(
    (order) => order.status === "completed" && order.payment_status !== "paid",
  );

  return (
    <div className="page-wrap">
      <header className="page-header split">
        <div>
          <p className="eyebrow">Wednesday operations</p>
          <h1>Good morning, team.</h1>
          <p className="subtitle">Here’s what needs your attention today.</p>
        </div>
        <Link className="button primary" href="/orders/new">+ New order</Link>
      </header>

      <section className="stat-grid" aria-label="Overview">
        <article className="stat-card urgent"><span>Overdue deliveries</span><strong>{overdue.length}</strong><small>Needs action now</small></article>
        <article className="stat-card"><span>Open orders</span><strong>{orders.filter((o) => !["completed", "cancelled"].includes(o.status)).length}</strong><small>Across all admins</small></article>
        <article className="stat-card"><span>Unpaid completed</span><strong>{unpaidCompleted.length}</strong><small>Follow up on payment</small></article>
      </section>

      <section className="summary-card">
        <div className="summary-icon">✦</div>
        <div><p className="eyebrow">Daily brief</p><strong>{overdue.length > 0 ? `${overdue.length} ${overdue.length === 1 ? "delivery is" : "deliveries are"} overdue.` : "No deliveries are overdue."}</strong><p>{overdue.length > 0 ? `${overdue[0].order_number} is the highest-priority follow-up at score ${overdue[0].priority_score}. ${unpaidCompleted.length ? `${unpaidCompleted.length} completed order also needs payment follow-up.` : "Completed orders are paid up."}` : unpaidCompleted.length ? `${unpaidCompleted.length} completed order needs payment follow-up.` : "The team is fully caught up."}</p></div>
      </section>

      <section className="section-block">
        <div className="section-heading"><div><p className="eyebrow">Priority queue</p><h2>Needs attention</h2></div><Link href="/orders">View all orders →</Link></div>
        {orders.length === 0 ? (
          <div className="empty-state"><span>✓</span><h3>All caught up</h3><p>No overdue or incomplete items.</p></div>
        ) : (
          <div className="attention-list">
            {orders.map((order) => {
              const priority = getPriority(order);
              return (
                <Link className="attention-row" href={`/orders/${order.id}`} key={order.id}>
                  <div className={`priority-dot ${priority.tone}`}><strong>{priority.score}</strong><span>score</span></div>
                  <div className="grow"><div className="row-title"><strong>{order.order_number}</strong><StatusBadge value={order.status} /></div><p>{order.customer?.name} · {order.notes || "No order details"}</p></div>
                  <div className="row-meta"><span className={order.isOverdue ? "danger-text" : ""}>{order.delivery ? formatDate(order.delivery.scheduled_date) : "Not scheduled"}</span><small>{order.assigned_admin?.name || "Unassigned"}</small></div>
                  <div className="amount">{formatCurrency(order.total_amount)}</div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
