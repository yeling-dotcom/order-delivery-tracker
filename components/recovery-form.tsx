"use client";

import Link from "next/link";
import { useActionState } from "react";
import { requestPasswordReset, resetPassword } from "@/app/auth/recovery-actions";
import type { AccountState } from "@/app/account/actions";

const initialState: AccountState = {};

export function ForgotPasswordForm() {
  const [state, action, pending] = useActionState(requestPasswordReset, initialState);
  return <form action={action} className="auth-card stack"><div className="field"><label htmlFor="recovery_email">Email</label><input id="recovery_email" name="email" type="email" autoComplete="email" required /></div>{state.error&&<p className="form-message error">{state.error}</p>}{state.message&&<p className="form-message success">{state.message}</p>}<button className="button primary" disabled={pending}>{pending?"Sending…":"Send reset link"}</button><Link href="/login" className="auth-link">← Back to sign in</Link></form>;
}

export function ResetPasswordForm() {
  const [state, action, pending] = useActionState(resetPassword, initialState);
  return <form action={action} className="auth-card stack"><div className="field"><label htmlFor="reset_password">New password</label><input id="reset_password" name="password" type="password" minLength={8} autoComplete="new-password" required /></div><div className="field"><label htmlFor="reset_confirmation">Confirm password</label><input id="reset_confirmation" name="password_confirmation" type="password" minLength={8} autoComplete="new-password" required /></div>{state.error&&<p className="form-message error">{state.error}</p>}{state.message&&<p className="form-message success">{state.message}</p>}<button className="button primary" disabled={pending}>{pending?"Saving…":"Set new password"}</button>{state.message&&<Link href="/" className="auth-link">Continue to dashboard →</Link>}</form>;
}
