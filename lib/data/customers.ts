import { createClient } from "@/lib/supabase/server";
export async function getCustomers(){ const supabase=await createClient(); const {data,error}=await supabase.from("customers").select("*").order("name"); if(error) throw new Error(error.message); return data||[]; }
