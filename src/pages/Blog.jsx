// src/pages/Blog.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO.jsx";


const API = import.meta.env.VITE_API_BASE;

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/public/posts`);
        if (!res.ok) throw new Error("Failed to load posts");
        const data = await res.json();
        setPosts(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="screen" style={{ padding: 24 }}>
      <div className="card" style={{ maxWidth: 1100, width: "100%" }}>
        <SEO
          title="Blog - CeylonTech Labs"
          description="Thoughts on web development, design, and building digital products by CeylonTech Labs."
        />
        <h2 className="card__title">Blog</h2>
        <p className="card__sub">
          Thoughts on websites, dashboards, and shipping fast with React & Node.
        </p>

        {loading ? (
          <div style={{ marginTop: 16 }}>Loading posts…</div>
        ) : posts.length === 0 ? (
          <div style={{ marginTop: 16, color: "var(--muted)" }}>
            No posts published yet. Add some from the admin panel.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gap: 20,
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              marginTop: 16,
            }}
          >
            {posts.map((p) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className="card"
                style={{
                  background: "rgba(255,255,255,.04)",
                  padding: 0,
                  overflow: "hidden",
                  textDecoration: "none",
                }}
              >
                {p.cover_url && (
                  <img
                    src={p.cover_url}
                    alt={p.title}
                    style={{
                      width: "100%",
                      aspectRatio: "16/10",
                      objectFit: "cover",
                    }}
                  />
                )}
                <div style={{ padding: 14 }}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 16,
                      marginBottom: 4,
                      color: "white",
                    }}
                  >
                    {p.title}
                  </div>
                  {p.excerpt && (
                    <div
                      style={{
                        color: "var(--muted-2)",
                        fontSize: 13,
                        lineHeight: 1.5,
                      }}
                    >
                      {p.excerpt}
                    </div>
                  )}
                  {p.created_at && (
                    <div
                      style={{
                        marginTop: 8,
                        fontSize: 12,
                        color: "var(--muted)",
                      }}
                    >
                      {new Date(p.created_at).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
