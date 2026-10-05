import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO.jsx";

const API = import.meta.env.VITE_API_BASE ?? "http://localhost:4000";

export default function Portfolio() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/public/projects`);
        if (!res.ok) throw new Error("Portfolio projects could not be loaded.");
        setItems(await res.json());
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
        title="Portfolio"
        description="Explore website and web application projects from CeylonTech Labs."
      />
      <section className="page-hero">
        <div className="container page-hero__inner">
          <div className="kicker">Portfolio</div>
          <h1 className="page-title">Selected work and project notes.</h1>
          <p className="lede">
            Published projects appear here from the site content system. Add real images,
            descriptions, and case notes as projects are ready to share.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container">
          {loading && <div className="empty-state">Loading portfolio projects...</div>}
          {error && <div className="empty-state">{error}</div>}
          {!loading && !error && items.length === 0 && (
            <div className="empty-state">
              Portfolio content is being prepared. This area is ready for real project entries with
              images, summaries, and case study details.
            </div>
          )}
          <div className="grid-3">
            {items.map((project) => (
              <Link key={project.slug} to={`/portfolio/${project.slug}`} className="card card-link" style={{ padding: 0, overflow: "hidden" }}>
                {project.cover_url ? (
                  <img src={project.cover_url} alt={project.title} style={{ width: "100%", aspectRatio: "16/10", objectFit: "cover" }} />
                ) : (
                  <div style={{ aspectRatio: "16/10", background: "linear-gradient(135deg, rgba(225,29,112,.28), rgba(245,158,11,.18))" }} />
                )}
                <div style={{ padding: 20 }}>
                  <h2 className="card__title">{project.title}</h2>
                  {project.excerpt && <p className="card__sub">{project.excerpt}</p>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
