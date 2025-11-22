// src/pages/Services.jsx
import SEO from "../components/SEO.jsx";


export default function Services() {
  return (
    <div className="screen" style={{ padding: 24 }}>
      <div className="card" style={{ maxWidth: 1100, width: "100%" }}>
        <SEO
          title="Services - CeylonTech Labs"
          description="From high-converting websites to custom dashboards and APIs, CeylonTech Labs helps you ship reliable digital products — fast."
        />  
        <h1 className="card__title">Our Services</h1>
        <p className="card__sub">
          From high-converting websites to custom dashboards and APIs, CeylonTech Labs
          helps you ship reliable digital products — fast.
        </p>

        <div
          style={{
            marginTop: 24,
            display: "grid",
            gap: 18,
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          }}
        >
          {/* Service 1 */}
          <ServiceCard
            title="Website Design & Development"
            tagline="Launch a fast, modern site that works on every device."
            items={[
              "Custom design in your brand style",
              "Responsive layout for desktop, tablet, and mobile",
              "SEO basics and analytics integration",
              "Contact forms, lead capture, and WhatsApp integration",
            ]}
          />

          {/* Service 2 */}
          <ServiceCard
            title="Admin Dashboards & Portals"
            tagline="See your data clearly and manage your business from one place."
            items={[
              "Secure login and role-based access",
              "CRUD interfaces for content, products, and users",
              "Charts and KPIs tailored to your metrics",
              "Export to CSV/Excel and scheduled reports",
            ]}
          />

          {/* Service 3 */}
          <ServiceCard
            title="APIs & System Integrations"
            tagline="Connect your tools so your team spends less time copying data."
            items={[
              "RESTful APIs built with Node & Express",
              "Integration with CRMs, payment gateways, and messaging",
              "Webhooks and automation flows",
              "Documentation for your developers and partners",
            ]}
          />

          {/* Service 4 */}
          <ServiceCard
            title="Care & Ongoing Support"
            tagline="We keep your product secure, updated, and evolving."
            items={[
              "Security updates and uptime monitoring",
              "Content and minor feature updates each month",
              "Backup and restore plan configuration",
              "Performance tuning and A/B test support",
            ]}
          />
        </div>

        <div style={{ marginTop: 32 }}>
          <p className="brand__tag">
            Not sure which package you need? Start by telling us about your project —
            we’ll recommend the right approach.
          </p>
          <a href="/contact" className="btn" style={{ marginTop: 12 }}>
            Talk to us about your project →
          </a>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ title, tagline, items }) {
  return (
    <div
      className="card"
      style={{
        background: "rgba(15,23,42,0.9)",
        border: "1px solid rgba(148,163,184,0.25)",
        padding: 18,
      }}
    >
      <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{title}</h3>
      <p
        style={{
          fontSize: 13,
          color: "var(--muted-2)",
          marginBottom: 10,
        }}
      >
        {tagline}
      </p>
      <ul style={{ paddingLeft: 18, fontSize: 13, color: "var(--muted-2)" }}>
        {items.map((it) => (
          <li key={it} style={{ marginBottom: 4 }}>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
