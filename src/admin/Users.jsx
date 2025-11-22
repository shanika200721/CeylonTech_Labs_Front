import { useEffect, useState } from "react";
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";

const API = import.meta.env.VITE_API_BASE;

export default function Users(){
  const [items,setItems]=useState([]);
  const [email,setEmail]=useState(""); const [role,setRole]=useState("USER");
  const load = async ()=> {
    const r = await fetch(`${API}/api/users`, { credentials:"include" });
    setItems(await r.json());
  };
  useEffect(()=>{ load(); },[]);

  const invite = async (e)=>{
    e.preventDefault();
    await fetch(`${API}/api/users`, { method:"POST", credentials:"include",
      headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ email, role }) });
    setEmail(""); setRole("USER"); load();
  };
  const setUserRole = async (id,role)=>{
    await fetch(`${API}/api/users/${id}/role`, { method:"PATCH", credentials:"include",
      headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ role }) });
    load();
  };
  const remove = async (id)=>{
    if(!confirm("Delete this user?")) return;
    await fetch(`${API}/api/users/${id}`, { method:"DELETE", credentials:"include" });
    load();
  };

  return (
    <div className="card">
      <h2 className="card__title">Users & Roles</h2>
      <form onSubmit={invite} className="form" style={{maxWidth:460, margin:"10px 0"}}>
        <Input label="Invite email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <label className="field"><span className="field__label">Role</span>
          <select className="field__input" value={role} onChange={e=>setRole(e.target.value)}>
            <option>USER</option><option>ADMIN</option>
          </select>
        </label>
        <Button type="submit">Send invite</Button>
      </form>

      <table style={{width:"100%", borderCollapse:"collapse"}}>
        <thead><tr><th align="left">Email</th><th>Role</th><th>Created</th><th></th></tr></thead>
        <tbody>
          {items.map(u=>(
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>
                <select className="field__input" value={u.role} onChange={e=>setUserRole(u.id, e.target.value)}>
                  <option>USER</option><option>ADMIN</option>
                </select>
              </td>
              <td>{new Date(u.created_at).toLocaleString()}</td>
              <td><Button variant="outline" onClick={()=>remove(u.id)}>Delete</Button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
