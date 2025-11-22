import { useMemo, useRef } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { uploadFile } from "../api/client.js";

export default function MarkdownEditor({ label="Content", value, onChange }) {
  const fileRef = useRef();

  const insertImage = async (file)=>{
    const { url } = await uploadFile(file);
    const md = `${value || ""}\n\n![image](${url})\n`;
    onChange(md);
  };

  const html = useMemo(()=>{
    const raw = marked.parse(value || "");
    return DOMPurify.sanitize(raw);
  }, [value]);

  return (
    <div className="field">
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span className="field__label">{label}</span>
        <div>
          <button type="button" className="btn btn--outline" onClick={()=>fileRef.current.click()}>Insert image</button>
          <input ref={fileRef} type="file" accept="image/*" style={{ display:"none" }}
                 onChange={e=> e.target.files?.[0] && insertImage(e.target.files[0])}/>
        </div>
      </div>
      <textarea className="field__input" rows="10" value={value} onChange={(e)=>onChange(e.target.value)} />
      <div className="field__label" style={{ marginTop: 8 }}>Preview</div>
      <div className="card" style={{ background:"rgba(255,255,255,.04)", padding:"12px", maxHeight:300, overflow:"auto" }}
           dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
