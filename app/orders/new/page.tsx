import { OrderForm } from "@/components/order-form";
import { getAdminStaff } from "@/lib/data/admin-staff";
export const dynamic="force-dynamic";
export default async function NewOrderPage(){const admins=await getAdminStaff();return <div className="page-wrap"><header className="page-header"><p className="eyebrow">Orders</p><h1>Create a new order</h1><p className="subtitle">Record the customer, assign the work, and schedule delivery in one go.</p></header><OrderForm admins={admins}/></div>}
