import { ProfileForm, EmailForm, PasswordForm } from "@/components/account-forms";
import { requireUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const { user } = await requireUser();
  const name = String(user.user_metadata?.full_name || user.email?.split("@")[0] || "Owner");
  return <div className="page-wrap"><header className="page-header"><p className="eyebrow">Settings</p><h1>Your account</h1><p className="subtitle">Manage the identity and credentials for this private workspace.</p></header><div className="account-grid"><section className="panel"><div className="section-heading"><div><p className="eyebrow">Profile</p><h2>Display name</h2></div></div><ProfileForm name={name}/></section><section className="panel"><div className="section-heading"><div><p className="eyebrow">Sign-in</p><h2>Email address</h2></div></div><EmailForm email={user.email || ""}/></section><section className="panel"><div className="section-heading"><div><p className="eyebrow">Security</p><h2>Password</h2></div></div><PasswordForm /></section></div></div>;
}
