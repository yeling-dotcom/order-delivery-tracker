export type OrderStatus = "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";
export type PaymentStatus = "unpaid" | "partial" | "paid";
export type DeliveryStatus = "scheduled" | "out_for_delivery" | "delivered" | "failed" | "missed";
export type Customer = { id:string; name:string; phone:string|null; email:string|null; address:string|null; created_at:string };
export type AdminStaff = { id:string; name:string; email:string|null; phone:string|null; role:string };
export type Delivery = { id:string; order_id:string; scheduled_date:string; status:DeliveryStatus; delivered_date:string|null; notes:string|null; created_at:string };
export type Order = { id:string; order_number:string; customer_id:string; status:OrderStatus; payment_status:PaymentStatus; total_amount:number; assigned_admin_id:string|null; notes:string|null; priority_score:number; created_at:string; customer?:Customer|null; assigned_admin?:AdminStaff|null; delivery?:Delivery|null; isOverdue?:boolean };
