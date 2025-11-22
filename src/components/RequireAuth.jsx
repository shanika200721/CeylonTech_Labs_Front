import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Auth } from "../api/client.js";

export default function RequireAuth({ children }) {
  const [state, setState] = useState({ loading: true, authed: false });

  useEffect(() => {
    let alive = true;
    Auth.me()
      .then(() => alive && setState({ loading: false, authed: true }))
      .catch(() => alive && setState({ loading: false, authed: false }));
    return () => { alive = false; };
  }, []);

  if (state.loading) {
    return (
      <div className="screen" style={{ gap: 12 }}>
        <span className="spinner" />
        <div style={{ color: "var(--muted)" }}>Checking session…</div>
      </div>
    );
  }
  if (!state.authed) return <Navigate to="/login" replace />;
  return children;
}
