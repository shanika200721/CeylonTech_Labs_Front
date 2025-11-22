import { useState } from "react";
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";

export default function RequestReset(){
  const [email,setEmail]=useState("");
  const [done,setDone]=useState(false);
  const [err,setErr]=useState("");

  const submit=async(e)=>{
    e.preventDefault(); setErr("");
    try{
      const r=await fetch(`${import.meta.env.VITE_API_BASE}/api/auth/request-reset`,{
        method:"POST", headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() })
      });
      if(!r.ok) throw new Error(await r.text());
      setDone(true);
    }catch(e){ setErr(e.message||"Failed"); }
  };

  return (
    <div className="screen">
      <div className="card" style={{maxWidth:480,width:"100%"}}>
        <h2 className="card__title">Reset password</h2>
        {done? <p className="brand__tag">If that email exists, we sent a reset link.</p> :
        <form className="form" onSubmit={submit}>
          <Input label="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
          {err && <div className="alert">{err}</div>}
          <Button type="submit">Send link</Button>
        </form>}
      </div>
    </div>
  );
}
