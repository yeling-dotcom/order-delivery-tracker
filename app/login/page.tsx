import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { createClient } from "@/lib/supabase/server";

export default async function LoginPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) redirect("/");
  return <main className="auth-page"><div className="auth-intro"><span className="brand-mark">D</span><p className="eyebrow">Dispatch</p><h1>Keep every order moving.</h1><p>Sign in to manage your private order and delivery workspace.</p></div><AuthForm /></main>;
}
