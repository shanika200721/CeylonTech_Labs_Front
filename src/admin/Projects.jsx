import { useEffect, useState } from "react";
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import { uploadFile } from "../api/client.js";
import MarkdownEditor from "../components/MarkdownEditor.jsx";


const API = import.meta.env.VITE_API_BASE;

export default function Projects(){
  const [items,setItems]=useState([]);
  const [loading,setLoading]=useState(true);

  const [form,setForm]=useState({ title:"", slug:"", excerpt:"", cover_url:"", content:"" });
  const [editing,setEditing]=useState(null); // id being edited, or null
  const [busy,setBusy]=useState(false);
  const [err,setErr]=useState("");

  const [page,setPage] = useState(1);
  const [q,setQ] = useState("");

  const load = async (p=page, query=q)=>{
    setLoading(true);
    const url = new URL(`${API}/api/projects-paged`);
    url.searchParams.set("page", String(p));
    url.searchParams.set("pageSize", "10");
    if (query) url.searchParams.set("query", query);
    const r = await fetch(url.toString(), { credentials:"include" });
    const data = await r.json();
    setItems(data.items);
    setPage(data.page);
    setLoading(false);
  };
  useEffect(()=>{ load(1, ""); },[]);


  const handleFile = async (e)=>{
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const { url, public_id } = await uploadFile(file);
      setForm(f => ({ ...f, cover_url: url , cover_public_id: public_id }));
    } catch (e) {
      alert(e.message || "Upload failed");
    } finally { setBusy(false); }
  };

  const create = async (e)=>{
    e.preventDefault(); setErr(""); setBusy(true);
    try {
      const r = await fetch(`${API}/api/projects`, {
        method:"POST", credentials:"include",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify(form)
      });
      if (!r.ok) throw new Error(await r.text());
      setForm({ title:"", slug:"", excerpt:"", cover_url:"", content:"" });
      load();
    } catch (e) { setErr(e.message); } finally { setBusy(false); }
  };

  const startEdit = (p)=>{ setEditing(p.id); setForm({ title:p.title, slug:p.slug, excerpt:p.excerpt||"", cover_url:p.cover_url||"" }); };
  const cancelEdit = ()=>{ setEditing(null); setForm({ title:"", slug:"", excerpt:"", cover_url:"" }); };

  const update = async (e)=>{
    e.preventDefault(); setErr(""); setBusy(true);
    try {
      const r = await fetch(`${API}/api/projects/${editing}`, {
        method:"PUT", credentials:"include",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify(form)
      });
      if (!r.ok) throw new Error(await r.text());
      cancelEdit(); load();
    } catch (e) { setErr(e.message); } finally { setBusy(false); }
  };

  const remove = async (id)=>{
    if (!confirm("Delete this project?")) return;
    await fetch(`${API}/api/projects/${id}`, { method:"DELETE", credentials:"include" });
    load();
  };

  

  return (
    <div className="card">
      <h2 className="card__title">Projects</h2>

      {/* Form */}

      <MarkdownEditor label="Content (Markdown)" value={form.content} onChange={(v)=>setForm(f=>({...f,content:v}))} />

      <form onSubmit={editing?update:create} className="form" style={{maxWidth:520, margin:"12px 0"}}>
        <Input label="Title" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} required />
        <Input label="Slug" value={form.slug} onChange={e=>setForm(f=>({...f,slug:e.target.value}))} required />
        <label className="field">
          <span className="field__label">Excerpt (optional)</span>
          <textarea className="field__input" rows="3" value={form.excerpt} onChange={e=>setForm(f=>({...f,excerpt:e.target.value}))}/>
        </label>

        <label className="field">
          <span className="field__label">Cover Image</span>
          <input type="file" accept="image/*" onChange={handleFile}/>
          {form.cover_url && (
            <div style={{ marginTop:8 }}>
              <img src={form.cover_url} alt="" style={{ maxWidth:240, borderRadius:8, border:"1px solid rgba(255,255,255,.1)" }}/>
            </div>
          )}
        </label>

        {err && <div className="alert">{err}</div>}
        <div style={{ display:"flex", gap:8 }}>
          <Button type="submit" loading={busy}>{editing? "Save changes":"Create project"}</Button>
          {editing && <Button type="button" variant="outline" onClick={cancelEdit}>Cancel</Button>}
        </div>
      </form>

      <div style={{ display:"flex", gap:8, alignItems:"center", margin:"8px 0" }}>
        <input
          className="field__input"
          placeholder="Search projects…"
          value={q}
          onChange={(e)=>setQ(e.target.value)}
          style={{ maxWidth: 280 }}
        />
        <Button variant="outline" onClick={()=>load(1, q)}>Search</Button>
        <Button variant="outline" onClick={()=>{ setQ(""); load(1, ""); }}>Clear</Button>
      </div>


      {/* List */}
      {loading? <div>Loading…</div> :

        <div style={{ display:"grid", gap:12 }}>
          {items.map(p=>(
            <div key={p.id} className="card" style={{ background:"rgba(255,255,255,.03)" }}>
              <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                {p.cover_url && <img src={p.cover_url} alt="" style={{ width:90, height:60, objectFit:"cover", borderRadius:8 }}/>}
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:600 }}>{p.title}</div>
                  <div style={{ color:"var(--muted)", fontSize:12 }}>/portfolio/{p.slug}</div>
                  {p.excerpt && <div style={{ color:"var(--muted-2)", fontSize:13, marginTop:4 }}>{p.excerpt}</div>}
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  <Button variant="outline" onClick={()=>startEdit(p)}>Edit</Button>
                  <Button variant="outline" onClick={()=>remove(p.id)}>Delete</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  );
}
