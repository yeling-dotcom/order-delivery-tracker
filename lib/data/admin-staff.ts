import { ensureCurrentAdmin } from "@/lib/auth";
export async function getAdminStaff(){ const {supabase}=await ensureCurrentAdmin(); const {data,error}=await supabase.from("admin_staff").select("*").order("name"); if(error) throw new Error(error.message); return data||[]; }
