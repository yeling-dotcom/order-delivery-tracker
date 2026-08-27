"use client";

import { useActionState } from "react";
import { updateEmail, updatePassword, updateProfile, type AccountState } from "@/app/account/actions";

const initialState: AccountState = {};

function Message({state}:{state:AccountState}) {
  if (state.error) return <p className="form-message error" role="alert">{state.error}</p>;
  if (state.message) return <p className="form-message success" role="status">{state.message}</p>;
  return null;
}

export function ProfileForm({name}:{name:string}) {
  const [state, action, pending] = useActionState(updateProfile, initialState);
  return <form action={action} className="panel-body stack"><div className="field"><label htmlFor="full_name">Display name</label><input id="full_name" name="full_name" defaultValue={name} required /></div><Message state={state}/><button className="button primary" disabled={pending}>{pending ? "Saving…" : "Save name"}</button></form>;
}

export function EmailForm({email}:{email:string}) {
  const [state, action, pending] = useActionState(updateEmail, initialState);
  return <form action={action} className="panel-body stack"><div className="field"><label htmlFor="account_email">Email address</label><input id="account_email" name="email" type="email" defaultValue={email} required /></div><Message state={state}/><button className="button primary" disabled={pending}>{pending ? "Sending…" : "Change email"}</button></form>;
}

export function PasswordForm() {
  const [state, action, pending] = useActionState(updatePassword, initialState);
  return <form action={action} className="panel-body stack"><div className="field"><label htmlFor="new_password">New password</label><input id="new_password" name="password" type="password" minLength={8} autoComplete="new-password" required /></div><div className="field"><label htmlFor="password_confirmation">Confirm new password</label><input id="password_confirmation" name="password_confirmation" type="password" minLength={8} autoComplete="new-password" required /></div><Message state={state}/><button className="button primary" disabled={pending}>{pending ? "Saving…" : "Change password"}</button></form>;
}
