import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO.jsx";


export default function Portfolio(){
  const [items,setItems]=useState([]);
  useEffect(()=>{ (async()=>{
    const r = await fetch(`${import.meta.env.VITE_API_BASE}/public/projects`);
    setItems(await r.json());
  })(); },[]);

  return (
    <div className="screen" style={{ padding:24 }}>
      <div className="card" style={{ maxWidth:1100, width:"100%" }}>
        <SEO
          title="Portfolio - CeylonTech Labs"
          description="Explore our portfolio of websites, web applications, and digital products crafted by CeylonTech Labs."
        />
        <h2 className="card__title">Portfolio</h2>


        <div style={{ display:"grid", gap:20, gridTemplateColumns:"repeat(auto-fill, minmax(280px,1fr))", marginTop:12 }}>
         {items.map(p=>(
          <Link key={p.slug} to={`/portfolio/${p.slug}`} className="card card-link" style={{ background:"rgba(255,255,255,.04)", padding:0, overflow:"hidden" }}>
             {p.cover_url && <img src={p.cover_url} alt="" style={{ width:"100%", aspectRatio:"16/10", objectFit:"cover" }}/>}
              <div style={{ padding:14 }}>
               <div style={{ fontWeight:700, fontSize:16 }}>{p.title}</div>
                {p.excerpt && <div style={{ color:"var(--muted-2)", fontSize:13, marginTop:6, lineHeight:1.45 }}>{p.excerpt}</div>}
             </div>
          </Link>
             ))}
        </div>

      </div>
    </div>
  );
}
