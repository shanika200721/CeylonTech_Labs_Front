// src/pages/ResetPassword.jsx
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../components/Button.jsx";
import PasswordInput from "../components/PasswordInput.jsx";

export default function ResetPassword() {
  const [sp] = useSearchParams();
  const token = sp.get("token") || "";
  const [pw, setPw] = useState("");
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE}/api/auth/reset`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, password: pw }),
        }
      );
      if (!res.ok) {
        throw new Error(await res.text());
      }
      setOk(true);
    } catch (e) {
      setErr(e.message || "Something went wrong");
    }
  };

  if (!token) {
    return (
      <div className="screen">
        <div className="card">
          <h2 className="card__title">Reset password</h2>
          <p className="card__sub">Missing token in the link.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="screen">
      <div className="card" style={{ maxWidth: 480, width: "100%" }}>
        <h2 className="card__title">Set a new password</h2>
        {ok ? (
          <p className="brand__tag">
            Password updated. You can now log in with your new password.
          </p>
        ) : (
          <form className="form" onSubmit={submit}>
            <PasswordInput
              label="New password (8+ characters)"
              id="new-password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              required
            />
            {err && <div className="alert">{err}</div>}
            <Button type="submit">Update password</Button>
          </form>
        )}
      </div>
    </div>
  );
}
