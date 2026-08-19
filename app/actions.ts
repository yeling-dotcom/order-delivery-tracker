"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const text=(form:FormData,key:string)=>String(form.get(key)||"").trim();
async function audit(supabase:any,action_type:string,target_type:string,target_id:string,before_state:any,after_state:any){await supabase.from("audit_log").insert({action_type,target_type,target_id,before_state,after_state});}

export async function createOrder(form:FormData){
  const supabase=await createClient(); const customerName=text(form,"customer_name"); const orderNumber=text(form,"order_number"); const scheduledDate=text(form,"scheduled_date");
  if(!customerName||!orderNumber||!scheduledDate) throw new Error("Customer, order number, and delivery date are required.");
  const {data:customer,error:customerError}=await supabase.from("customers").insert({name:customerName,phone:text(form,"phone")||null,email:text(form,"email")||null,address:text(form,"address")||null}).select().single();
  if(customerError) throw new Error(customerError.message);
  const payload={order_number:orderNumber,customer_id:customer.id,status:text(form,"status")||"pending",payment_status:text(form,"payment_status")||"unpaid",total_amount:Number(text(form,"total_amount")||0),assigned_admin_id:text(form,"assigned_admin_id")||null,notes:text(form,"notes")||null};
  const {data:order,error:orderError}=await supabase.from("orders").insert(payload).select().single();
  if(orderError){await supabase.from("customers").delete().eq("id",customer.id);throw new Error(orderError.message);}
  const {error:deliveryError}=await supabase.from("deliveries").insert({order_id:order.id,scheduled_date:scheduledDate,status:"scheduled",notes:text(form,"delivery_notes")||null});
  if(deliveryError){await supabase.from("orders").delete().eq("id",order.id);await supabase.from("customers").delete().eq("id",customer.id);throw new Error(deliveryError.message);}
  await audit(supabase,"order.created","order",order.id,null,{...order,scheduled_date:scheduledDate}); revalidatePath("/");revalidatePath("/orders");revalidatePath("/deliveries"); redirect(`/orders/${order.id}`);
}

export async function updateOrder(form:FormData){
  const supabase=await createClient(); const id=text(form,"id"); const {data:before}=await supabase.from("orders").select("*").eq("id",id).single();
  const payload={status:text(form,"status"),payment_status:text(form,"payment_status"),total_amount:Number(text(form,"total_amount")||0),assigned_admin_id:text(form,"assigned_admin_id")||null,notes:text(form,"notes")||null};
  const {data,error}=await supabase.from("orders").update(payload).eq("id",id).select().single(); if(error) throw new Error(error.message); await audit(supabase,"order.updated","order",id,before,data); revalidatePath("/");revalidatePath("/orders");revalidatePath(`/orders/${id}`);
}

export async function updateDelivery(form:FormData){
  const supabase=await createClient(); const id=text(form,"delivery_id"); const orderId=text(form,"order_id"); const {data:before}=await supabase.from("deliveries").select("*").eq("id",id).single(); const status=text(form,"delivery_status");
  const payload={scheduled_date:text(form,"scheduled_date"),status,notes:text(form,"delivery_notes")||null,delivered_date:status==="delivered"?(before?.delivered_date||new Date().toISOString()):null};
  const {data,error}=await supabase.from("deliveries").update(payload).eq("id",id).select().single();if(error)throw new Error(error.message);await audit(supabase,"delivery.updated","delivery",id,before,data);revalidatePath("/");revalidatePath("/deliveries");revalidatePath(`/orders/${orderId}`);
}

export async function deleteOrder(form:FormData){const supabase=await createClient();const id=text(form,"id");const {data:before}=await supabase.from("orders").select("*").eq("id",id).single();await audit(supabase,"order.deleted","order",id,before,null);const {error}=await supabase.from("orders").delete().eq("id",id);if(error)throw new Error(error.message);revalidatePath("/");revalidatePath("/orders");revalidatePath("/deliveries");redirect("/orders");}
