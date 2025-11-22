// src/pages/Contact.jsx
import { useState } from "react";
import SEO from "../components/SEO.jsx";

const API = import.meta.env.VITE_API_BASE;
const WHATSAPP_NUMBER = "+94705584634"; // CeylonTech Labs WhatsApp number

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState(false);
  const [error, setError] = useState("");

  const update = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setOk(false);
    setSending(true);
    try {
      const res = await fetch(`${API}/api/public/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          source: "contact_page",
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      setOk(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        budget: "",
        timeline: "",
        message: "",
      });
    } catch (e) {
      setError(e.message || "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const waText = encodeURIComponent(
    `Hi CeylonTech Labs,\n\nMy name is ${form.name || "(your name)"}.\n` +
      `I'm interested in a website / system.\n\n` +
      `Budget: ${form.budget || "-"}\nTimeline: ${form.timeline || "-"}\n\n` +
      `${form.message || "Tell us briefly what you need..."}`
  );

  // ✅ clean number for wa.me: keep only digits
  const waNumberDigits = WHATSAPP_NUMBER.replace(/[^0-9]/g, "");

  return (
    <div className="screen" style={{ padding: 24 }}>
      <SEO
        title="Contact"
        description="Tell CeylonTech Labs about your project and get a tailored proposal."
      />
      <div
        className="card"
        style={{
          maxWidth: 900,
          width: "100%",
          display: "grid",
          gap: 24,
          gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1.2fr)",
        }}
      >
        {/* Left: form */}
        <div>
          <h1 className="card__title">Tell us about your project</h1>
          <p className="card__sub">
            Share a bit of context and we’ll get back to you within one business day.
          </p>

          <form className="form" onSubmit={onSubmit} style={{ marginTop: 12 }}>
            <div className="field">
              <span className="field__label">Name *</span>
              <input
                className="field__input"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                required
              />
            </div>

            <div className="field">
              <span className="field__label">Email *</span>
              <input
                type="email"
                className="field__input"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                required
              />
            </div>

            <div className="field">
              <span className="field__label">Phone / WhatsApp</span>
              <input
                className="field__input"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </div>

            <div
              style={{
                display: "grid",
                gap: 10,
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              }}
            >
              <div className="field">
                <span className="field__label">Budget (optional)</span>
                <input
                  className="field__input"
                  value={form.budget}
                  onChange={(e) => update("budget", e.target.value)}
                  placeholder="e.g. LKR 200k–300k"
                />
              </div>
              <div className="field">
                <span className="field__label">Timeline</span>
                <input
                  className="field__input"
                  value={form.timeline}
                  onChange={(e) => update("timeline", e.target.value)}
                  placeholder="e.g. 4–6 weeks"
                />
              </div>
            </div>

            <div className="field">
              <span className="field__label">Project details *</span>
              <textarea
                className="field__input"
                rows="5"
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                required
                placeholder="Tell us what you’re trying to achieve, and any example sites you like."
              />
            </div>

            {error && <div className="alert">{error}</div>}
            {ok && (
              <div className="alert" style={{ background: "rgba(22,163,74,0.15)" }}>
                Thanks! We’ve received your message and will reply soon.
              </div>
            )}

            <button
              type="submit"
              className="btn"
              disabled={sending}
              style={{ marginTop: 8 }}
            >
              {sending ? "Sending…" : "Send message"}
            </button>
          </form>
        </div>

        {/* Right: summary & WhatsApp */}
        <div
          className="card"
          style={{
            background: "rgba(15,23,42,0.9)",
            border: "1px solid rgba(148,163,184,0.3)",
            padding: 18,
          }}
        >
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
            Prefer WhatsApp?
          </h2>
          <p
            style={{
              fontSize: 13,
              color: "var(--muted-2)",
              marginBottom: 10,
            }}
          >
            Send us a quick message and we’ll reply there. You can always follow up with
            more details later.
          </p>
          <a
            href={`https://wa.me/${waNumberDigits}?text=${waText}`}
            target="_blank"
            rel="noreferrer"
            className="btn"
            style={{
              background: "#22c55e",
              borderColor: "#16a34a",
              color: "#04110a",
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            Chat on WhatsApp →
          </a>

          <div
            style={{
              marginTop: 18,
              fontSize: 13,
              color: "var(--muted)",
              lineHeight: 1.6,
            }}
          >
            <div>ceylontechlabs@gmail.com</div>
            <div style={{ marginTop: 4 }}>Based in Sri Lanka · GMT+5:30</div>
            <div style={{ marginTop: 10, fontSize: 12 }}>
              We’ll never share your details with third parties. We use your information
              only to follow up on your request.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
