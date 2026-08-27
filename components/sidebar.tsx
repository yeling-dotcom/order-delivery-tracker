"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/auth/actions";
const links=[{href:"/",icon:"◫",label:"Dashboard"},{href:"/orders",icon:"▤",label:"Orders"},{href:"/deliveries",icon:"◇",label:"Deliveries"},{href:"/customers",icon:"◎",label:"Customers"}];
export function Sidebar({email}:{email:string}){const pathname=usePathname();return <aside className="sidebar"><Link href="/" className="brand"><span className="brand-mark">D</span><span>Dispatch</span></Link><nav className="nav-list">{links.map(link=><Link className={`nav-link ${pathname===link.href||(link.href!=="/"&&pathname.startsWith(link.href))?"active":""}`} href={link.href} key={link.href}><span className="nav-icon">{link.icon}</span><span>{link.label}</span></Link>)}</nav><div className="sidebar-foot"><span className="sidebar-email">{email}</span><form action={logout}><button type="submit" className="logout-button">Sign out</button></form></div></aside>}
