"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const links=[{href:"/",icon:"◫",label:"Dashboard"},{href:"/orders",icon:"▤",label:"Orders"},{href:"/deliveries",icon:"◇",label:"Deliveries"},{href:"/customers",icon:"◎",label:"Customers"}];
export function Sidebar(){const pathname=usePathname();return <aside className="sidebar"><Link href="/" className="brand"><span className="brand-mark">D</span><span>Dispatch</span></Link><nav className="nav-list">{links.map(link=><Link className={`nav-link ${pathname===link.href||(link.href!=="/"&&pathname.startsWith(link.href))?"active":""}`} href={link.href} key={link.href}><span className="nav-icon">{link.icon}</span><span>{link.label}</span></Link>)}</nav><div className="sidebar-foot">Order operations<br/><strong>Demo workspace</strong></div></aside>}
