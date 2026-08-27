"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AuthState = { error?: string; message?: string };

export async function authenticate(_state: AuthState, formData: FormData): Promise<AuthState> {
  const supabase = await createClient();
  const mode = String(formData.get("mode") || "login");
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const fullName = String(formData.get("full_name") || "").trim();

  if (!email || password.length < 8) {
    return { error: "Enter a valid email and a password of at least 8 characters." };
  }

  if (mode === "signup") {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName || email.split("@")[0] },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });
    if (error) return { error: error.message };
    if (!data.session) return { message: "Check your email to confirm your account, then sign in." };
  } else {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: "Email or password is incorrect." };
  }

  redirect("/");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
