// src/pages/PostView.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MarkdownView from "../components/MarkdownView.jsx";
import SEO from "../components/SEO.jsx";

const API = import.meta.env.VITE_API_BASE;

export default function PostView() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [missing, setMissing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMissing(false);
    setLoading(true);
    (async () => {
      try {
        const res = await fetch(`${API}/public/posts/${slug}`);
        if (res.status === 404) {
          setMissing(true);
          return;
        }
        if (!res.ok) throw new Error("Failed to load post");
        const data = await res.json();
        setPost(data);
      } catch (e) {
        console.error(e);
        setMissing(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  if (missing) {
    return (
      <div className="screen">
        <div className="card" style={{ maxWidth: 480, width: "100%" }}>
          <h2 className="card__title">Post not found</h2>
          <p className="card__sub">
            This blog article may have been unpublished or moved.
          </p>
          <Link to="/blog" className="btn" style={{ marginTop: 12 }}>
            ← Back to blog
          </Link>
        </div>
      </div>
    );
  }

  if (loading || !post) {
    return (
      <div className="screen" style={{ padding: 24 }}>
        <div className="card" style={{ maxWidth: 900, width: "100%" }}>
          <div
            style={{
              width: "100%",
              height: 220,
              borderRadius: 12,
              background:
                "linear-gradient(90deg, #020617, #111827, #020617)",
              backgroundSize: "200% 100%",
              animation: "pulse-strip 1.4s ease-in-out infinite",
              marginBottom: 16,
            }}
          />
          <div
            style={{
              width: "70%",
              height: 28,
              borderRadius: 999,
              background: "rgba(148,163,184,0.2)",
              marginBottom: 8,
            }}
          />
          <div
            style={{
              width: "35%",
              height: 14,
              borderRadius: 999,
              background: "rgba(148,163,184,0.15)",
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="screen" style={{ padding: 24 }}>
      <SEO
        title={post.title}
        description={post.excerpt || "Article by CeylonTech Labs."}
      />
      <div className="card" style={{ maxWidth: 900, width: "100%" }}>
        {/* breadcrumb */}
        <div
          style={{
            fontSize: 12,
            color: "var(--muted)",
            marginBottom: 8,
          }}
        >
          <Link
            to="/blog"
            style={{
              color: "var(--muted)",
              textDecoration: "none",
            }}
          >
            Blog
          </Link>
          <span> / </span>
          <span>{post.title}</span>
        </div>

        {post.cover_url && (
          <img
            src={post.cover_url}
            alt={post.title}
            style={{
              width: "100%",
              maxHeight: 360,
              objectFit: "cover",
              borderRadius: 12,
              marginBottom: 16,
            }}
          />
        )}

        <h1
          className="brand__title"
          style={{ fontSize: 32, marginBottom: 6, lineHeight: 1.2 }}
        >
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="brand__tag" style={{ marginBottom: 10 }}>
            {post.excerpt}
          </p>
        )}

        <div
          style={{
            display: "flex",
            gap: 12,
            fontSize: 13,
            color: "var(--muted)",
            marginBottom: 18,
            flexWrap: "wrap",
          }}
        >
          {post.created_at && (
            <span>
              Published:{" "}
              {new Date(post.created_at).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          )}
        </div>

        <MarkdownView content={post.content} />

        <div style={{ marginTop: 24 }}>
          <Link to="/blog" className="btn btn--outline">
            ← Back to blog
          </Link>
        </div>
      </div>
    </div>
  );
}
