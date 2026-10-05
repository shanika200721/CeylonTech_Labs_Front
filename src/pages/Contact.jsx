import { useMemo, useState } from "react";
import SEO from "../components/SEO.jsx";

const API = import.meta.env.VITE_API_BASE ?? "http://localhost:4000";
const WHATSAPP_NUMBER = "94705584634";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  projectType: "",
  budget: "",
  timeline: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const update = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
    setSent(false);
  };

  const whatsappText = useMemo(() => encodeURIComponent(
    `Hi CeylonTech Labs,\n\nMy name is ${form.name || "(your name)"}.\nProject type: ${form.projectType || "-"}\nBudget: ${form.budget || "-"}\nTimeline: ${form.timeline || "-"}\n\n${form.message || "I would like to discuss a website or web system."}`
  ), [form]);

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "Please enter a valid email address.";
    if (!form.projectType) next.projectType = "Please choose a project type.";
    if (form.message.trim().length < 20) next.message = "Please add at least 20 characters about the project.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");
    setSent(false);
    if (!validate()) return;

    setSending(true);
    try {
      const res = await fetch(`${API}/api/public/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          budget: form.budget,
          timeline: form.timeline,
          message: `Project type: ${form.projectType}\n\n${form.message}`,
          source: "quote_request",
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      setSent(true);
      setForm(initialForm);
    } catch (error) {
      setSubmitError(error.message || "The form could not be submitted. Please email or WhatsApp us instead.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact"
        description="Request a website or web application quote from CeylonTech Labs."
      />
      <section className="page-hero">
        <div className="container page-hero__inner">
          <div className="kicker">Quote request</div>
          <h1 className="page-title">Tell us what you want to build.</h1>
          <p className="lede">
            Share the basics and we will reply with the most useful next step: a quick
            clarification, a scope recommendation, or a quote path.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container split">
          <form className="card" onSubmit={onSubmit} noValidate>
            <div className="grid-2">
              <Field label="Name" error={errors.name}>
                <input className="field__input" value={form.name} onChange={(e) => update("name", e.target.value)} autoComplete="name" />
              </Field>
              <Field label="Email" error={errors.email}>
                <input className="field__input" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} autoComplete="email" />
              </Field>
            </div>

            <div className="grid-2" style={{ marginTop: 14 }}>
              <Field label="Phone / WhatsApp">
                <input className="field__input" value={form.phone} onChange={(e) => update("phone", e.target.value)} autoComplete="tel" />
              </Field>
              <Field label="Project type" error={errors.projectType}>
                <select className="field__input" value={form.projectType} onChange={(e) => update("projectType", e.target.value)}>
                  <option value="">Select one</option>
                  <option>Business website</option>
                  <option>Portfolio website</option>
                  <option>E-commerce or catalogue</option>
                  <option>Web application</option>
                  <option>Dashboard or portal</option>
                  <option>Website redesign</option>
                  <option>Maintenance and support</option>
                </select>
              </Field>
            </div>

            <div className="grid-2" style={{ marginTop: 14 }}>
              <Field label="Budget range">
                <select className="field__input" value={form.budget} onChange={(e) => update("budget", e.target.value)}>
                  <option value="">Not sure yet</option>
                  <option>Under LKR 150,000</option>
                  <option>LKR 150,000 - 300,000</option>
                  <option>LKR 300,000 - 600,000</option>
                  <option>LKR 600,000+</option>
                </select>
              </Field>
              <Field label="Timeline">
                <select className="field__input" value={form.timeline} onChange={(e) => update("timeline", e.target.value)}>
                  <option value="">Flexible</option>
                  <option>As soon as possible</option>
                  <option>2 - 4 weeks</option>
                  <option>1 - 3 months</option>
                  <option>Planning for later</option>
                </select>
              </Field>
            </div>

            <div style={{ marginTop: 14 }}>
              <Field label="Project details" error={errors.message}>
                <textarea
                  className="field__input"
                  rows="7"
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="Tell us about your goals, required pages or features, audience, and any reference websites."
                />
              </Field>
            </div>

            {submitError && <div className="alert">{submitError}</div>}
            {sent && <div className="alert alert--success">Thanks. Your request was submitted successfully.</div>}
            <button type="submit" className="btn" disabled={sending}>
              {sending ? "Sending..." : "Send quote request"}
            </button>
          </form>

          <aside className="card">
            <h2 className="card__title">Prefer a quick message?</h2>
            <p className="card__sub">
              Email or WhatsApp works well for a first conversation. Include your project
              type, desired launch window, and any reference links.
            </p>
            <div className="pill-row" style={{ marginBottom: 20 }}>
              <span className="pill">Sri Lanka</span>
              <span className="pill">GMT+5:30</span>
              <span className="pill">Remote friendly</span>
            </div>
            <a className="btn" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`} target="_blank" rel="noreferrer">Message on WhatsApp</a>
            <a className="btn btn--outline" href="mailto:ceylontechlabs@gmail.com" style={{ marginTop: 10 }}>Email CeylonTech Labs</a>
            <p className="card__sub" style={{ marginTop: 20, fontSize: 13 }}>
              Your details are used only to respond to your project request.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      {children}
      {error && <span style={{ color: "#fca5a5", fontSize: 12, display: "block", marginTop: 6 }}>{error}</span>}
    </label>
  );
}
