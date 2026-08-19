import { createClient } from "@/lib/supabase/server";
import { isDeliveryOverdue, getPriority } from "@/lib/utils";
import type { Order } from "@/lib/types";

const orderSelect = "*, customer:customers(*), assigned_admin:admin_staff(*), delivery:deliveries(*)";
function normalize(row:any):Order { const delivery=Array.isArray(row.delivery)?row.delivery[0]||null:row.delivery; const order={...row,delivery} as Order; order.isOverdue=isDeliveryOverdue(delivery?.scheduled_date,delivery?.status); order.priority_score=getPriority(order).score; return order; }
export async function getOrders(){ const supabase=await createClient(); const {data,error}=await supabase.from("orders").select(orderSelect).order("created_at",{ascending:false}); if(error) throw new Error(error.message); return (data||[]).map(normalize); }
export async function getDashboardOrders(){ const orders=await getOrders(); return orders.filter(o=>!["completed","cancelled"].includes(o.status)||(o.status==="completed"&&o.payment_status!=="paid")).sort((a,b)=>b.priority_score-a.priority_score); }
export async function getOrder(id:string){ const supabase=await createClient(); const {data,error}=await supabase.from("orders").select(orderSelect).eq("id",id).single(); if(error) return null; return normalize(data); }
