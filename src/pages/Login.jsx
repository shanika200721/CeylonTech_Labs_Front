import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import PasswordInput from "../components/PasswordInput.jsx";
import LogoGlyph from "../components/LogoGlyph.jsx";
import FloatingBits from "../components/FloatingBits.jsx";
import { Auth } from "../api/client.js";
import GoogleButton from "../components/GoogleButton.jsx";
import "../styles/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFormError("");
    
    // Basic validation
    if (!email || !email.includes("@")) {
      setFormError("Please enter a valid email address");
      return;
    }
    
    if (!password || password.length < 8) {
      setFormError("Password must be at least 8 characters");
      return;
    }
    
    setLoading(true);
    
    try {
      await Auth.login(email.trim().toLowerCase(), password);
      
      // Verify session is set
      const meResponse = await Auth.me();
      
      if (meResponse && meResponse.user) {
        // Redirect based on user role or default to admin
        window.location.href = "/admin";
      } else {
        throw new Error("Login failed - no user session");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Invalid email or password");
      
      // Specific error messages for common issues
      if (err.message.includes("Please use Google Sign-In")) {
        setError("This account uses Google Sign-In. Please click 'Sign in with Google' instead.");
      } else if (err.message.includes("Invalid credentials")) {
        setError("Invalid email or password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = (errorMessage) => {
    setError(errorMessage);
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
            <span>React</span>
            <span>Node & Express</span>
            <span>MySQL</span>
            <span>Cloud</span>
          </div>
          
          <div style={{ marginTop: "24px", fontSize: "12px", color: "#94a3b8" }}>
            <p>Admin access for:</p>
            <ul style={{ marginTop: "4px", paddingLeft: "16px" }}>
              <li>Content Management</li>
              <li>Lead Tracking</li>
              <li>Analytics</li>
              <li>User Management</li>
            </ul>
          </div>
        </aside>

        <section className="card">
          <h2 className="card__title">Admin Login</h2>
          <p className="card__sub">
            Use email & password or continue with Google.
          </p>

          <form className="form" onSubmit={handleSubmit}>
            <Input
              id="email"
              label="Email"
              type="email"
              placeholder="admin@ceylontechlabs.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setFormError("");
                setError("");
              }}
              required
              disabled={loading}
            />

            <PasswordInput
              id="password"
              label="Password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setFormError("");
                setError("");
              }}
              required
              disabled={loading}
              minLength="8"
            />

            {/* Form validation errors */}
            {formError && (
              <div className="alert alert-error">
                {formError}
              </div>
            )}

            {/* Login errors */}
            {error && (
              <div className="alert alert-error">
                {error}
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "12px" }}>
              <Link 
                to="/forgot" 
                style={{ 
                  fontSize: "12px", 
                  color: "#3b82f6",
                  textDecoration: "none"
                }}
              >
                Forgot password?
              </Link>
            </div>

            <Button 
              type="submit" 
              loading={loading} 
              className="w-full"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in with Email"}
            </Button>

            <div className="sep">
              <span>or</span>
            </div>

            <GoogleButton />

            <div style={{ 
              marginTop: "20px", 
              paddingTop: "16px", 
              borderTop: "1px solid rgba(148, 163, 184, 0.2)" 
            }}>
              <p className="legal">
                By continuing, you agree to our{" "}
                <a href="/terms" style={{ color: "#3b82f6" }}>Terms</a>{" "}
                and{" "}
                <a href="/privacy" style={{ color: "#3b82f6" }}>Privacy Policy</a>.
              </p>
              
              <div style={{ 
                marginTop: "12px", 
                fontSize: "11px", 
                color: "#64748b",
                textAlign: "center" 
              }}>
                <p>Need access? Contact your administrator.</p>
                <p style={{ marginTop: "4px" }}>
                  <a href="mailto:admin@ceylontechlabs.com" style={{ color: "#3b82f6" }}>
                    admin@ceylontechlabs.com
                  </a>
                </p>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}