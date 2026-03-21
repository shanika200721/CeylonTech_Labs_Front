import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import LogoGlyph from "../components/LogoGlyph.jsx";
import FloatingBits from "../components/FloatingBits.jsx";
import "../styles/login.css";

export default function RequestReset() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const r = await fetch(`${import.meta.env.VITE_API_BASE}/api/auth/request-reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      if (!r.ok) throw new Error(await r.text());
      setDone(true);
    } catch (e) {
      setErr(e.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="screen">
      <FloatingBits />
      <div className="grid">
        <aside className="brand">
          <div className="brand__logo">
            <LogoGlyph />
          </div>
          <h1 className="brand__title">
            <span>Ceylon Tech</span> <span className="brand__accent">Labs</span>
          </h1>
          <p className="brand__tag">
            Enter your account email and we'll send you a secure link to reset your password.
          </p>
        </aside>

        <section className="card">
          <h2 className="card__title">Forgot password?</h2>
          <p className="card__sub">We'll email you a reset link valid for 1 hour.</p>

          {done ? (
            <div style={{ display: "grid", gap: "16px" }}>
              <div
                style={{
                  background: "rgba(34,197,94,0.1)",
                  border: "1px solid rgba(34,197,94,0.3)",
                  color: "#22c55e",
                  padding: "14px",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
              >
                If an account with that email exists, a reset link has been sent. Check your inbox (and spam folder).
              </div>
              <Link
                to="/login"
                style={{
                  textAlign: "center",
                  fontSize: "13px",
                  color: "#3b82f6",
                  textDecoration: "none",
                }}
              >
                ← Back to login
              </Link>
            </div>
          ) : (
            <form className="form" onSubmit={submit}>
              <Input
                id="email"
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErr(""); }}
                required
                disabled={loading}
              />
              {err && <div className="alert alert-error">{err}</div>}
              <Button type="submit" loading={loading} disabled={loading} className="w-full">
                {loading ? "Sending…" : "Send reset link"}
              </Button>
              <Link
                to="/login"
                style={{
                  textAlign: "center",
                  fontSize: "13px",
                  color: "#64748b",
                  textDecoration: "none",
                }}
              >
                ← Back to login
              </Link>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
