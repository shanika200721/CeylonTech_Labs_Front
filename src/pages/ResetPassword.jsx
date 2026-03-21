import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Button from "../components/Button.jsx";
import PasswordInput from "../components/PasswordInput.jsx";
import LogoGlyph from "../components/LogoGlyph.jsx";
import FloatingBits from "../components/FloatingBits.jsx";
import "../styles/login.css";

export default function ResetPassword() {
  const [sp] = useSearchParams();
  const token = sp.get("token") || "";
  const [pw, setPw] = useState("");
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    if (pw.length < 8) {
      setErr("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/auth/reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password: pw }),
      });
      if (!res.ok) throw new Error(await res.text());
      setOk(true);
    } catch (e) {
      setErr(e.message || "Something went wrong.");
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
            Choose a strong new password to secure your account.
          </p>
        </aside>

        <section className="card">
          <h2 className="card__title">Set new password</h2>

          {!token ? (
            <div style={{ display: "grid", gap: "16px" }}>
              <div className="alert alert-error">
                Invalid or missing reset link. Please request a new one.
              </div>
              <Link to="/forgot" style={{ fontSize: "13px", color: "#3b82f6", textDecoration: "none" }}>
                ← Request new link
              </Link>
            </div>
          ) : ok ? (
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
                Password updated successfully!
              </div>
              <Link
                to="/login"
                style={{ textAlign: "center", fontSize: "13px", color: "#3b82f6", textDecoration: "none" }}
              >
                ← Sign in with your new password
              </Link>
            </div>
          ) : (
            <form className="form" onSubmit={submit}>
              <p className="card__sub">Must be at least 8 characters.</p>
              <PasswordInput
                label="New password"
                id="new-password"
                value={pw}
                onChange={(e) => { setPw(e.target.value); setErr(""); }}
                required
                disabled={loading}
              />
              {err && <div className="alert alert-error">{err}</div>}
              <Button type="submit" loading={loading} disabled={loading} className="w-full">
                {loading ? "Updating…" : "Update password"}
              </Button>
              <Link
                to="/login"
                style={{ textAlign: "center", fontSize: "13px", color: "#64748b", textDecoration: "none" }}
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
