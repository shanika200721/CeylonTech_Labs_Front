import { Link } from "react-router-dom";
import SEO from "../components/SEO.jsx";

export default function NotFound() {
  return (
    <div className="screen" style={{ padding: 24 }}>
      <SEO title="Page not found" description="The requested page could not be found." />
      <div className="card" style={{ maxWidth: 520, width: "100%", textAlign: "center" }}>
        <div className="eyebrow">404</div>
        <h1 className="page-title" style={{ marginTop: 8 }}>Page not found</h1>
        <p className="card__sub">The page you are looking for does not exist or has moved.</p>
        <Link to="/" className="btn" style={{ marginTop: 16 }}>Back to home</Link>
      </div>
    </div>
  );
}
