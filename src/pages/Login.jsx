import { useState } from "react";
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import PasswordInput from "../components/PasswordInput.jsx";
import GoogleIcon from "../components/GoogleIcon.jsx";
import LogoGlyph from "../components/LogoGlyph.jsx";
import FloatingBits from "../components/FloatingBits.jsx";
import { Auth } from "../api/client.js";
import GoogleButton from "../components/GoogleButton.jsx";
import "../styles/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);
  try {
    await Auth.login(email.trim().toLowerCase(), pw.trim());
    window.location.href = "/admin";
  } catch (err) {
    setError(err.message || "Invalid email or password");
  } finally {
    setLoading(false);
  }
};

  const onGoogle = () => {
    alert("Google Sign-In placeholder — hook up GIS or Passport Google.");
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
            Digital Innovation, Engineered in Sri Lanka. Powerful, scalable web services & custom systems.
          </p>
          <div className="brand__badges">
            <span>React</span><span>Node & Express</span><span>MySQL</span>
          </div>
        </aside>

        <section className="card">
          <h2 className="card__title">Admin Login</h2>
          <p className="card__sub">Use email & password or continue with Google.</p>

          <form className="form" onSubmit={onSubmit}>
            <Input
              id="email"
              label="Email"
              type="email"
              placeholder="admin@ceylontechlabs.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <PasswordInput
              id="password"
              label="Password"
              placeholder="••••••••••••"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              required
            />

            {error && <div className="alert">{error}</div>}

            <Button type="submit" loading={loading} className="w-full">Login</Button>

            <div className="sep"><span>or</span></div>

            <GoogleButton />

            <p className="legal">By continuing you agree to our Terms & Privacy Policy.</p>
          </form>
        </section>
      </div>
    </div>
  );
}
