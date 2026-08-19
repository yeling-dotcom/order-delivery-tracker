import { createClient } from "@/lib/supabase/server";
import { isDeliveryOverdue } from "@/lib/utils";
export async function getDeliveries(){ const supabase=await createClient(); const {data,error}=await supabase.from("deliveries").select("*, order:orders(*, customer:customers(*), assigned_admin:admin_staff(*))").order("scheduled_date"); if(error) throw new Error(error.message); return (data||[]).map((d:any)=>({...d,isOverdue:isDeliveryOverdue(d.scheduled_date,d.status)})); }
