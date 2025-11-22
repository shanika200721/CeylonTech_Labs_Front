import { useEffect, useRef, useState } from "react";

export default function Dashboard(){
  const [rows,setRows]=useState([]);
  const canvasRef = useRef(null);

  useEffect(()=>{(async()=>{
    const r = await fetch(`${import.meta.env.VITE_API_BASE}/api/analytics/summary`,{credentials:"include"});
    setRows(await r.json());
  })();},[]);

  useEffect(()=>{
    if (!rows.length || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    const W = canvasRef.current.width = 640;
    const H = canvasRef.current.height = 220;
    ctx.clearRect(0,0,W,H);
    // axes
    ctx.strokeStyle = "rgba(255,255,255,.2)";
    ctx.beginPath(); ctx.moveTo(40,10); ctx.lineTo(40,H-30); ctx.lineTo(W-10,H-30); ctx.stroke();

    const xs = rows.map((r, i)=> 40 + (i * (W-60)) / Math.max(1, rows.length-1));
    const ys = (()=> {
      const max = Math.max(...rows.map(r=>r.views), 1);
      return rows.map(r => 10 + (H-40) * (1 - (r.views/max)));
    })();

    // line
    ctx.strokeStyle = "#E11D70";
    ctx.lineWidth = 2;
    ctx.beginPath();
    rows.forEach((_,i)=> i? ctx.lineTo(xs[i], ys[i]) : ctx.moveTo(xs[i], ys[i]));
    ctx.stroke();

    // dots
    ctx.fillStyle = "#F59E0B";
    xs.forEach((x,i)=>{ ctx.beginPath(); ctx.arc(x, ys[i], 3, 0, Math.PI*2); ctx.fill(); });

    // labels
    ctx.fillStyle = "rgba(255,255,255,.6)";
    ctx.font = "12px system-ui";
    rows.forEach((r,i)=> ctx.fillText(r.d.slice(5), xs[i]-12, H-12));
  }, [rows]);

  return (
    <div className="card">
      <h2 className="card__title">Overview</h2>
      <p className="card__sub">Last 30 days page views</p>
      <canvas ref={canvasRef} style={{ maxWidth: "100%" }} />
    </div>
  );
}



{/* Dashboard.jsx
    
    export default function Dashboard(){
  return <div className="card"><h2 className="card__title">Overview</h2>
  <p className="card__sub">Quick stats will appear here.</p></div>;
}
*/}
