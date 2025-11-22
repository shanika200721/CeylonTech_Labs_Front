import { useEffect, useState } from "react";
import Button from "../components/Button.jsx";

const STATUSES = ["NEW","CONTACTED","QUALIFIED","WON","LOST"];

export default function Leads(){
  const [items,setItems]=useState([]);
  const [loading,setLoading]=useState(true);
  const [filter,setFilter]=useState("");

  const load = async ()=>{
    setLoading(true);
    const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/leads`,{credentials:"include"});
    const all = await res.json();
    setItems(all);
    setLoading(false);
  };

  useEffect(()=>{ load(); },[]);

  const changeStatus = async (id, status)=>{
    await fetch(`${import.meta.env.VITE_API_BASE}/api/leads/${id}/status`,{
      method:"PATCH", credentials:"include", headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ status })
    });
    setItems(items => items.map(l => l.id===id? { ...l, status } : l));
  };

  const shown = filter ? items.filter(i=>i.status===filter) : items;

  return (
    <div className="card">
      <h2 className="card__title">Leads</h2>
      <div style={{ display:"flex", gap:8, margin:"8px 0" }}>
        <label className="field" style={{ maxWidth:220 }}>
          <span className="field__label">Filter by status</span>
          <select className="field__input" value={filter} onChange={(e)=>setFilter(e.target.value)}>
            <option value="">All</option>
            {STATUSES.map(s=><option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        <Button onClick={load}>Refresh</Button>
      </div>

      {loading? <div>Loading…</div> :
        <table style={{width:"100%", borderCollapse:"collapse"}}>
          <thead><tr>
            <th align="left">When</th><th align="left">Name</th><th align="left">Email</th>
            <th align="left">Budget</th><th align="left">Status</th>
          </tr></thead>
          <tbody>
            {shown.map(l=>(
              <tr key={l.id}>
                <td>{new Date(l.created_at).toLocaleString()}</td>
                <td>{l.name}</td>
                <td>{l.email}</td>
                <td>{l.budget || "-"}</td>
                <td>
                  <select className="field__input" value={l.status} onChange={(e)=>changeStatus(l.id, e.target.value)}>
                    {STATUSES.map(s=><option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  );
}
