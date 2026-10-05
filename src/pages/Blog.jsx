import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO.jsx";

const API = import.meta.env.VITE_API_BASE ?? "http://localhost:4000";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/public/posts`);
        if (!res.ok) throw new Error("Articles could not be loaded.");
        setPosts(await res.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <SEO
        title="Blog"
        description="Thoughts on web development, design, and building digital products by CeylonTech Labs."
      />
      <section className="page-hero">
        <div className="container page-hero__inner">
          <div className="kicker">Blog</div>
          <h1 className="page-title">Notes on websites, systems, and delivery.</h1>
          <p className="lede">Published articles appear here when they are ready for public readers.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container">
          {loading && <div className="empty-state">Loading posts...</div>}
          {error && <div className="empty-state">{error}</div>}
          {!loading && !error && posts.length === 0 && (
            <div className="empty-state">
              No articles are published yet. This section is ready for real writing when the content is available.
            </div>
          )}
          <div className="grid-3">
            {posts.map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`} className="card card-link" style={{ padding: 0, overflow: "hidden" }}>
                {post.cover_url ? (
                  <img src={post.cover_url} alt={post.title} style={{ width: "100%", aspectRatio: "16/10", objectFit: "cover" }} />
                ) : (
                  <div style={{ aspectRatio: "16/10", background: "linear-gradient(135deg, rgba(34,197,94,.18), rgba(225,29,112,.22))" }} />
                )}
                <div style={{ padding: 20 }}>
                  <h2 className="card__title">{post.title}</h2>
                  {post.excerpt && <p className="card__sub">{post.excerpt}</p>}
                  {post.created_at && (
                    <p className="card__sub" style={{ fontSize: 13 }}>
                      {new Date(post.created_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
