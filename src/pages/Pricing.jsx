// src/pages/Pricing.jsx
import SEO from "../components/SEO.jsx";

export default function Pricing() {
  return (
    <div className="screen" style={{ padding: 24 }}>
      <div className="card" style={{ maxWidth: 1100, width: "100%" }}>
        <SEO
          title="Pricing - CeylonTech Labs"
          description="Clear pricing plans for websites, web apps, and care packages. Get started with CeylonTech Labs today."
        />
        <h1 className="card__title">Pricing</h1>
        <p className="card__sub">
          Clear packages to get you started. All prices are indicative — we’ll confirm
          a fixed quote after a quick discovery call.
        </p>

        {/* Pricing tiers */}
        <div
          style={{
            marginTop: 24,
            display: "grid",
            gap: 18,
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          }}
        >
          <PlanCard
            name="Starter Website"
            price="LKR 120,000+"
            idealFor="Consultants, freelancers, and small businesses getting online."
            features={[
              "Up to 5–7 custom pages",
              "Responsive design & performance optimization",
              "Contact form + WhatsApp or email integration",
              "Basic SEO setup & Google Analytics",
              "Content upload for launch",
            ]}
          />

          <PlanCard
            name="Business Website"
            price="LKR 220,000+"
            highlight
            idealFor="Growing businesses that need a content hub or portfolio."
            features={[
              "Up to 10–15 pages (blog, portfolio, services)",
              "Admin dashboard to edit content & leads",
              "Lead tracking with simple CRM-style board",
              "Blog & case studies section",
              "Training session for your team",
            ]}
          />

          <PlanCard
            name="Custom Web App"
            price="From LKR 400,000"
            idealFor="Platforms, internal tools, and dashboards with workflows."
            features={[
              "User accounts, roles, and permissions",
              "Custom business flows & dashboards",
              "API integrations with your existing tools",
              "Staging environment for testing",
              "Launch & support plan",
            ]}
          />
        </div>

        {/* Care plans */}
        <div style={{ marginTop: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
            Care & Support Plans
          </h2>
          <p
            style={{
              fontSize: 13,
              color: "var(--muted-2)",
              maxWidth: 640,
            }}
          >
            Keep your site or app secure and evolving. Add a care plan once we launch,
            or migrate an existing project to us.
          </p>

          <div
            style={{
              marginTop: 16,
              display: "grid",
              gap: 16,
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            }}
          >
            <CarePlanCard
              name="Essential Care"
              price="LKR 15,000 / month"
              features={[
                "Security updates & uptime checks",
                "Monthly backups & restore test",
                "Up to 2 hours of content or minor tweaks",
                "Email support during business hours",
              ]}
            />
            <CarePlanCard
              name="Growth Care"
              price="LKR 35,000 / month"
              features={[
                "Everything in Essential Care",
                "Up to 6 hours of improvements or small features",
                "Monthly analytics & performance report",
                "Priority support for bugs",
              ]}
            />
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginTop: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>FAQ</h2>
          <div style={{ display: "grid", gap: 10 }}>
            <FaqItem
              q="How long does a project usually take?"
              a="A starter site typically takes about 2 weeks. Business sites are 3–4 weeks. Custom web apps vary from 4–8+ weeks depending on scope."
            />
            <FaqItem
              q="What do you need from us to start?"
              a="Your logo/branding, a rough sitemap, basic copy or bullet points, and 2–3 example sites you like. We’ll help refine everything."
            />
            <FaqItem
              q="Do you help with hosting and domains?"
              a="Yes. We can recommend a host, set things up, or deploy to your existing provider. You always keep ownership of your domain and hosting."
            />
            <FaqItem
              q="How do payments work?"
              a="For most projects we do 50% to start, 30% on design sign-off, and 20% on launch. Larger systems can be broken into milestones."
            />
          </div>
        </div>

        <div style={{ marginTop: 32 }}>
          <p className="brand__tag">
            Want an exact quote for your idea? Share a bit of context and we’ll send you
            a proposal.
          </p>
          <a href="/contact" className="btn" style={{ marginTop: 12 }}>
            Request a custom quote →
          </a>
        </div>
      </div>
    </div>
  );
}

function PlanCard({ name, price, idealFor, features, highlight }) {
  return (
    <div
      className="card"
      style={{
        background: highlight
          ? "linear-gradient(135deg, rgba(236,72,153,0.12), rgba(251,191,36,0.08))"
          : "rgba(15,23,42,0.9)",
        border: highlight
          ? "1px solid rgba(251,191,36,0.6)"
          : "1px solid rgba(148,163,184,0.25)",
        padding: 18,
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: highlight ? "#FBBF24" : "var(--muted)",
          marginBottom: 4,
        }}
      >
        {name}
      </div>
      <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{price}</div>
      <p
        style={{
          fontSize: 12,
          color: "var(--muted-2)",
          marginBottom: 10,
        }}
      >
        {idealFor}
      </p>
      <ul style={{ paddingLeft: 18, fontSize: 13, color: "var(--muted-2)" }}>
        {features.map((f) => (
          <li key={f} style={{ marginBottom: 4 }}>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CarePlanCard({ name, price, features }) {
  return (
    <div
      className="card"
      style={{
        background: "rgba(15,23,42,0.9)",
        border: "1px solid rgba(148,163,184,0.25)",
        padding: 18,
      }}
    >
      <div style={{ fontSize: 14, fontWeight: 600 }}>{name}</div>
      <div style={{ fontSize: 18, fontWeight: 700, margin: "4px 0 6px" }}>{price}</div>
      <ul style={{ paddingLeft: 18, fontSize: 13, color: "var(--muted-2)" }}>
        {features.map((f) => (
          <li key={f} style={{ marginBottom: 4 }}>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FaqItem({ q, a }) {
  return (
    <div
      className="card"
      style={{
        background: "rgba(15,23,42,0.9)",
        border: "1px solid rgba(148,163,184,0.2)",
        padding: 14,
      }}
    >
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{q}</div>
      <div style={{ fontSize: 13, color: "var(--muted-2)" }}>{a}</div>
    </div>
  );
}
