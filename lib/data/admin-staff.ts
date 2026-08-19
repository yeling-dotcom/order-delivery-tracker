import { createClient } from "@/lib/supabase/server";
export async function getAdminStaff(){ const supabase=await createClient(); const {data,error}=await supabase.from("admin_staff").select("*").order("name"); if(error) throw new Error(error.message); return data||[]; }
