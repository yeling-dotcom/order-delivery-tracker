"use client";
export default function ErrorPage({reset}:{error:Error&{digest?:string};reset:()=>void}){return <div className="page-wrap"><div className="empty-state section-block"><span>!</span><h3>Couldn’t load this page</h3><p>Check your connection and try again.</p><button className="button primary" onClick={reset}>Try again</button></div></div>}
