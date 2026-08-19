import { createOrder } from "@/app/actions";
import type { AdminStaff } from "@/lib/types";
export function OrderForm({admins}:{admins:AdminStaff[]}){const tomorrow=new Date(Date.now()+86400000).toISOString().slice(0,10);return <form action={createOrder} className="form-card">
  <section className="form-section"><p className="eyebrow">Step 1</p><h2>Customer</h2><div className="form-grid">
    <div className="field"><label htmlFor="customer_name">Customer name <span className="required">*</span></label><input id="customer_name" name="customer_name" required placeholder="e.g. Sarah Lim"/></div>
    <div className="field"><label htmlFor="phone">Phone</label><input id="phone" name="phone" placeholder="+60 12-345 6789"/></div>
    <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" placeholder="sarah@example.com"/></div>
    <div className="field"><label htmlFor="address">Delivery address</label><input id="address" name="address" placeholder="Street, city, postcode"/></div>
  </div></section>
  <section className="form-section"><p className="eyebrow">Step 2</p><h2>Order details</h2><div className="form-grid">
    <div className="field"><label htmlFor="order_number">Order number <span className="required">*</span></label><input id="order_number" name="order_number" required placeholder="ORD-1045"/></div>
    <div className="field"><label htmlFor="assigned_admin_id">Assigned admin</label><select id="assigned_admin_id" name="assigned_admin_id"><option value="">Unassigned</option>{admins.map(a=><option key={a.id} value={a.id}>{a.name}</option>)}</select></div>
    <div className="field"><label htmlFor="status">Order status</label><select id="status" name="status" defaultValue="pending"><option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="in_progress">In progress</option></select></div>
    <div className="field"><label htmlFor="payment_status">Payment</label><select id="payment_status" name="payment_status" defaultValue="unpaid"><option value="unpaid">Unpaid</option><option value="partial">Partial</option><option value="paid">Paid</option></select></div>
    <div className="field"><label htmlFor="total_amount">Total amount (MYR)</label><input id="total_amount" name="total_amount" min="0" step="0.01" type="number" defaultValue="0"/></div>
    <div className="field full"><label htmlFor="notes">Items & notes</label><textarea id="notes" name="notes" placeholder="What was ordered? Include quantities and special instructions."/></div>
  </div></section>
  <section className="form-section"><p className="eyebrow">Step 3</p><h2>Schedule delivery</h2><div className="form-grid"><div className="field"><label htmlFor="scheduled_date">Delivery date <span className="required">*</span></label><input id="scheduled_date" name="scheduled_date" required type="date" defaultValue={tomorrow}/></div><div className="field"><label htmlFor="delivery_notes">Delivery notes</label><input id="delivery_notes" name="delivery_notes" placeholder="Access or handoff instructions"/></div></div></section>
  <div className="form-actions"><a className="button" href="/orders">Cancel</a><button className="button primary" type="submit">Create order & schedule delivery</button></div>
</form>}
