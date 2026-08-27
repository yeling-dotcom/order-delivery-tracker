"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";

export type AccountState = { error?: string; message?: string };

export async function updateProfile(_state: AccountState, formData: FormData): Promise<AccountState> {
  const { supabase, user } = await requireUser();
  const fullName = String(formData.get("full_name") || "").trim();
  if (!fullName) return { error: "Name is required." };
  const { error: authError } = await supabase.auth.updateUser({ data: { full_name: fullName } });
  if (authError) return { error: authError.message };
  const { error: staffError } = await supabase.from("admin_staff").update({ name: fullName }).eq("user_id", user.id);
  if (staffError) return { error: staffError.message };
  revalidatePath("/account");
  return { message: "Name updated." };
}

export async function updateEmail(_state: AccountState, formData: FormData): Promise<AccountState> {
  const { supabase } = await requireUser();
  const email = String(formData.get("email") || "").trim();
  if (!email.includes("@")) return { error: "Enter a valid email address." };
  const { error } = await supabase.auth.updateUser(
    { email },
    { emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/account` },
  );
  if (error) return { error: error.message };
  return { message: "Check both your current and new inboxes to confirm the email change." };
}

export async function updatePassword(_state: AccountState, formData: FormData): Promise<AccountState> {
  const { supabase } = await requireUser();
  const password = String(formData.get("password") || "");
  const confirmation = String(formData.get("password_confirmation") || "");
  if (password.length < 8) return { error: "Password must be at least 8 characters." };
  if (password !== confirmation) return { error: "Passwords do not match." };
  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { error: error.message };
  return { message: "Password updated." };
}
