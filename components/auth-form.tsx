"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { authenticate, type AuthState } from "@/app/auth/actions";

const initialState: AuthState = {};

export function AuthForm() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [state, action, pending] = useActionState(authenticate, initialState);

  return (
    <div className="auth-card">
      <div className="auth-tabs" role="tablist" aria-label="Account access">
        <button className={mode === "login" ? "active" : ""} type="button" onClick={() => setMode("login")}>Sign in</button>
        <button className={mode === "signup" ? "active" : ""} type="button" onClick={() => setMode("signup")}>Create account</button>
      </div>
      <form action={action} className="stack">
        <input type="hidden" name="mode" value={mode} />
        {mode === "signup" && <div className="field"><label htmlFor="full_name">Your name</label><input id="full_name" name="full_name" autoComplete="name" required /></div>}
        <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" required /></div>
        <div className="field"><label htmlFor="password">Password</label><input id="password" name="password" type="password" minLength={8} autoComplete={mode === "login" ? "current-password" : "new-password"} required /></div>
        {state.error && <p className="form-message error" role="alert">{state.error}</p>}
        {state.message && <p className="form-message success" role="status">{state.message}</p>}
        <button className="button primary" disabled={pending}>{pending ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}</button>
        {mode === "login" && <Link className="auth-link" href="/forgot-password">Forgot your password?</Link>}
      </form>
    </div>
  );
}
