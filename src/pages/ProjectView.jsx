// src/pages/ProjectView.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MarkdownView from "../components/MarkdownView.jsx";
import SEO from "../components/SEO.jsx";

const API = import.meta.env.VITE_API_BASE;

export default function ProjectView() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [missing, setMissing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMissing(false);
    setLoading(true);
    (async () => {
      try {
        const res = await fetch(`${API}/public/projects/${slug}`);
        if (res.status === 404) {
          setMissing(true);
          return;
        }
        if (!res.ok) throw new Error("Failed to load project");
        const data = await res.json();
        setProject(data);
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
          <h2 className="card__title">Project not found</h2>
          <p className="card__sub">
            We couldn’t find this project. It may have been unpublished.
          </p>
          <Link to="/portfolio" className="btn" style={{ marginTop: 12 }}>
            ← Back to portfolio
          </Link>
        </div>
      </div>
    );
  }

  if (loading || !project) {
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
              width: "60%",
              height: 28,
              borderRadius: 999,
              background: "rgba(148,163,184,0.2)",
              marginBottom: 8,
            }}
          />
          <div
            style={{
              width: "80%",
              height: 16,
              borderRadius: 999,
              background: "rgba(148,163,184,0.15)",
              marginBottom: 6,
            }}
          />
          <div
            style={{
              width: "40%",
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
        title={project.title}
        description={project.excerpt || "Project case study by CeylonTech Labs."}
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
            to="/portfolio"
            style={{
              color: "var(--muted)",
              textDecoration: "none",
            }}
          >
            Portfolio
          </Link>
          <span> / </span>
          <span>{project.title}</span>
        </div>

        {project.cover_url && (
          <img
            src={project.cover_url}
            alt={project.title}
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
          {project.title}
        </h1>

        {project.excerpt && (
          <p className="brand__tag" style={{ marginBottom: 10 }}>
            {project.excerpt}
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
          {project.created_at && (
            <span>
              Launched:{" "}
              {new Date(project.created_at).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          )}
        </div>

        <MarkdownView content={project.content} />

        <div style={{ marginTop: 24 }}>
          <Link to="/portfolio" className="btn btn--outline">
            ← Back to portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
