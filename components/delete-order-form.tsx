"use client";
import { deleteOrder } from "@/app/actions";
export function DeleteOrderForm({id,orderNumber}:{id:string;orderNumber:string}){return <form action={deleteOrder} onSubmit={(event)=>{if(!window.confirm(`Delete ${orderNumber}? Its scheduled delivery will also be removed.`))event.preventDefault();}}><input type="hidden" name="id" value={id}/><button className="button danger" type="submit">Delete order</button></form>}
