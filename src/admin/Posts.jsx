// src/admin/Posts.jsx
import { useEffect, useState } from "react";
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import { uploadFile } from "../api/client.js";
import MarkdownEditor from "../components/MarkdownEditor.jsx";

const API = import.meta.env.VITE_API_BASE;

export default function Posts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const emptyForm = {
    title: "",
    slug: "",
    excerpt: "",
    cover_url: "",
    published: false,
    content: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState(false);

  // ---------- LOAD LIST ----------
  const load = async () => {
    try {
      setLoading(true);
      setErr("");
      const r = await fetch(`${API}/api/posts`, { credentials: "include" });
      if (!r.ok) throw new Error(await r.text());
      const data = await r.json();
      setItems(data);
    } catch (e) {
      console.error("Load posts failed:", e);
      setErr(e.message || "Failed to load posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // ---------- FILE UPLOAD ----------
  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setErr("");
    try {
      const { url } = await uploadFile(file); // calls /api/upload
      setForm((f) => ({ ...f, cover_url: url }));
    } catch (e) {
      console.error("Upload failed:", e);
      setErr(e.message || "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  const cancelEdit = () => {
    setEditing(null);
    setForm(emptyForm);
    setErr("");
    setOk(false);
  };

  // ---------- CREATE ----------
  const create = async (e) => {
    e.preventDefault();
    setErr("");
    setOk(false);
    setBusy(true);

    try {
      const r = await fetch(`${API}/api/posts`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!r.ok) throw new Error(await r.text());
      setOk(true);
      setForm(emptyForm);
      load();
    } catch (e) {
      console.error("Create post failed:", e);
      setErr(e.message || "Failed to create post.");
    } finally {
      setBusy(false);
    }
  };

  // ---------- EDIT ----------
  const startEdit = (p) => {
    setEditing(p.id);
    setForm({
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt || "",
      cover_url: p.cover_url || "",
      published: !!p.published,
      content: p.content || "",
    });
    setErr("");
    setOk(false);
  };

  const update = async (e) => {
    e.preventDefault();
    setErr("");
    setOk(false);
    setBusy(true);

    try {
      const r = await fetch(`${API}/api/posts/${editing}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!r.ok) throw new Error(await r.text());
      setOk(true);
      cancelEdit();
      load();
    } catch (e) {
      console.error("Update post failed:", e);
      setErr(e.message || "Failed to update post.");
    } finally {
      setBusy(false);
    }
  };

  // ---------- DELETE ----------
  const remove = async (id) => {
    if (!confirm("Delete this post?")) return;
    try {
      const r = await fetch(`${API}/api/posts/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!r.ok) throw new Error(await r.text());
      load();
    } catch (e) {
      console.error("Delete post failed:", e);
      setErr(e.message || "Failed to delete post.");
    }
  };

  // ---------- RENDER ----------
  return (
    <div className="card">
      <h2 className="card__title">Posts</h2>
      <p className="card__sub">
        Manage blog posts for the public site. Use Markdown for the main content.
      </p>

      <form
        onSubmit={editing ? update : create}
        className="form"
        style={{ maxWidth: 720, margin: "16px 0" }}
      >
        <Input
          label="Title"
          value={form.title}
          onChange={(e) =>
            setForm((f) => ({ ...f, title: e.target.value }))
          }
          required
        />
        <Input
          label="Slug"
          value={form.slug}
          onChange={(e) =>
            setForm((f) => ({ ...f, slug: e.target.value }))
          }
          required
        />
        <label className="field">
          <span className="field__label">Excerpt (optional)</span>
          <textarea
            className="field__input"
            rows="3"
            value={form.excerpt}
            onChange={(e) =>
              setForm((f) => ({ ...f, excerpt: e.target.value }))
            }
          />
        </label>

        <label className="field">
          <span className="field__label">Cover Image (optional)</span>
          <input type="file" accept="image/*" onChange={handleFile} />
          {form.cover_url && (
            <img
              src={form.cover_url}
              alt=""
              style={{ maxWidth: 240, borderRadius: 8, marginTop: 8 }}
            />
          )}
        </label>

        <label className="field">
          <span className="field__label">Content (Markdown)</span>
          <MarkdownEditor
            value={form.content}
            onChange={(value) =>
              setForm((f) => ({ ...f, content: value }))
            }
          />
        </label>

        <label
          className="field"
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) =>
              setForm((f) => ({ ...f, published: e.target.checked }))
            }
          />
          <span className="field__label">Published</span>
        </label>

        {err && <div className="alert">{err}</div>}
        {ok && (
          <div
            className="alert"
            style={{ background: "rgba(22,163,74,0.18)" }}
          >
            {editing ? "Changes saved." : "Post created."}
          </div>
        )}

        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          <Button type="submit" loading={busy}>
            {editing ? "Save changes" : "Create post"}
          </Button>
          {editing && (
            <Button type="button" variant="outline" onClick={cancelEdit}>
              Cancel
            </Button>
          )}
        </div>
      </form>

      {loading ? (
        <div>Loading…</div>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {items.map((p) => (
            <div
              key={p.id}
              className="card"
              style={{ background: "rgba(255,255,255,.03)" }}
            >
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                {p.cover_url && (
                  <img
                    src={p.cover_url}
                    alt=""
                    style={{
                      width: 90,
                      height: 60,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>
                    {p.title} {p.published ? "· Published" : "· Draft"}
                  </div>
                  <div
                    style={{
                      color: "var(--muted)",
                      fontSize: 12,
                    }}
                  >
                    /blog/{p.slug}
                  </div>
                  {p.excerpt && (
                    <div
                      style={{
                        color: "var(--muted-2)",
                        fontSize: 13,
                        marginTop: 4,
                      }}
                    >
                      {p.excerpt}
                    </div>
                  )}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <Button variant="outline" onClick={() => startEdit(p)}>
                    Edit
                  </Button>
                  <Button variant="outline" onClick={() => remove(p.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
