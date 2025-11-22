// src/pages/NotFound.jsx
export default function NotFound() {
  return (
    <div className="screen" style={{ padding: 24 }}>
      <div
        className="card"
        style={{ maxWidth: 480, width: "100%", textAlign: "center" }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 800,
            marginBottom: 8,
            background:
              "linear-gradient(135deg, #F97316, #EC4899)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          404
        </div>
        <h1 className="card__title" style={{ marginBottom: 4 }}>
          Page not found
        </h1>
        <p className="card__sub">
          The page you’re looking for doesn’t exist or has moved.
        </p>
        <a href="/" className="btn" style={{ marginTop: 16 }}>
          ← Back to home
        </a>
      </div>
    </div>
  );
}
