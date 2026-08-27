import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireUser() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) redirect("/login");
  return { supabase, user };
}

export async function ensureCurrentAdmin() {
  const { supabase, user } = await requireUser();
  const { data: existing } = await supabase
    .from("admin_staff")
    .select("id")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();

  if (!existing) {
    const name = String(user.user_metadata?.full_name || user.email?.split("@")[0] || "Owner");
    const { error } = await supabase.from("admin_staff").insert({
      name,
      email: user.email,
      role: "owner",
      user_id: user.id,
    });
    if (error) throw new Error(error.message);
  }
  return { supabase, user };
}
