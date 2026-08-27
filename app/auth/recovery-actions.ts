"use server";

import { createClient } from "@/lib/supabase/server";
import type { AccountState } from "@/app/account/actions";

export async function requestPasswordReset(_state: AccountState, formData: FormData): Promise<AccountState> {
  const supabase = await createClient();
  const email = String(formData.get("email") || "").trim();
  if (!email.includes("@")) return { error: "Enter a valid email address." };
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/reset-password`,
  });
  if (error) return { error: error.message };
  return { message: "If that account exists, a password-reset link is on its way." };
}

export async function resetPassword(_state: AccountState, formData: FormData): Promise<AccountState> {
  const supabase = await createClient();
  const password = String(formData.get("password") || "");
  const confirmation = String(formData.get("password_confirmation") || "");
  if (password.length < 8) return { error: "Password must be at least 8 characters." };
  if (password !== confirmation) return { error: "Passwords do not match." };
  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { error: "Your reset link may have expired. Request a new one." };
  return { message: "Password updated. You can continue to your dashboard." };
}
