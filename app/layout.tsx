import type { Metadata } from "next";
import { Sidebar } from "@/components/sidebar";
import { createClient } from "@/lib/supabase/server";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dispatch | Order & Delivery Tracker",
  description: "Track orders, deliveries, and the work that needs attention.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return (
    <html lang="en">
      <body>
        {user ? <div className="app-shell"><Sidebar email={user.email || "Signed in"} /><main className="main-content">{children}</main></div> : children}
      </body>
    </html>
  );
}
