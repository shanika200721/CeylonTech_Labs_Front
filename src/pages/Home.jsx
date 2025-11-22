// src/pages/Home.jsx
import { Link } from "react-router-dom";
import SEO from "../components/SEO.jsx";

export default function Home() {
  return (
    <div className="screen" style={{ padding: 24 }}>
      <SEO
        title="Home"
        description="CeylonTech Labs builds modern websites, dashboards, and custom systems in Sri Lanka for clients worldwide."
      />

      <div
        className="card"
        style={{
          maxWidth: 1100,
          width: "100%",
          padding: 32,
          display: "grid",
          gap: 32,
          gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
          alignItems: "center",
        }}
      >
        {/* Hero left */}
        <div>
          <div
            style={{
              fontSize: 13,
              color: "var(--muted)",
              marginBottom: 8,
            }}
          >
            Web & System Engineering · Sri Lanka
          </div>
          <h1
            className="brand__title"
            style={{
              fontSize: 40,
              lineHeight: 1.1,
              marginBottom: 8,
            }}
          >
            Digital products that feel{" "}
            <span style={{ color: "#EC4899" }}>fast</span>,{" "}
            <span style={{ color: "#F97316" }}>polished</span>, and{" "}
            <span style={{ color: "#22c55e" }}>reliable</span>.
          </h1>
          <p
            className="brand__tag"
            style={{ maxWidth: 520, marginBottom: 16 }}
          >
            CeylonTech Labs designs and builds modern websites, admin
            dashboards, and custom systems using React, Node & MySQL —
            from Sri Lanka to the world.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginBottom: 18,
            }}
          >
            <Link to="/contact" className="btn">
              Start a project →
            </Link>
            <Link
              to="/portfolio"
              className="btn btn--outline"
              style={{ fontSize: 13 }}
            >
              View recent work
            </Link>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              fontSize: 12,
              color: "var(--muted)",
            }}
          >
            <TechPill>React</TechPill>
            <TechPill>Node & Express</TechPill>
            <TechPill>MySQL</TechPill>
            <TechPill>REST APIs</TechPill>
          </div>
        </div>

        {/* Hero right - quick stats / highlights */}
        <div
          className="card"
          style={{
            background:
              "radial-gradient(circle at top left, rgba(236,72,153,0.25), transparent 60%), #020617",
            border: "1px solid rgba(148,163,184,0.35)",
            padding: 20,
          }}
        >
          <h2
            style={{
              fontSize: 16,
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            Why teams work with us
          </h2>
          <ul
            style={{
              fontSize: 13,
              color: "var(--muted-2)",
              paddingLeft: 18,
              marginBottom: 12,
            }}
          >
            <li>Small, focused team — you work directly with the builders.</li>
            <li>Clean admin dashboards, not just pretty landing pages.</li>
            <li>Clear communication, milestones, and deployment support.</li>
          </ul>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
              gap: 10,
              marginTop: 8,
            }}
          >
            <Stat label="Projects shipped" value="20+" />
            <Stat label="Tech stack" value="React · Node" />
            <Stat label="Timezone" value="GMT+5:30" />
          </div>
        </div>
      </div>

      {/* Services preview */}
      <section
        className="card"
        style={{
          maxWidth: 1100,
          width: "100%",
          marginTop: 24,
          padding: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: 16,
          }}
        >
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700 }}>What we build</h2>
            <p
              style={{
                fontSize: 13,
                color: "var(--muted-2)",
              }}
            >
              From marketing sites to internal dashboards, we turn your ideas
              into maintainable, production-ready software.
            </p>
          </div>
          <Link
            to="/services"
            className="btn btn--outline"
            style={{ alignSelf: "flex-end", fontSize: 13 }}
          >
            View all services →
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}
        >
          <HomeService
            title="Websites that convert"
            text="Modern, responsive, and fast-loading sites that make your brand look trustworthy and professional."
          />
          <HomeService
            title="Admin dashboards"
            text="See leads, content, and operations clearly through custom dashboards built for your team."
          />
          <HomeService
            title="Custom systems & APIs"
            text="Connect tools, automate manual work, and expose clean APIs for your partners and apps."
          />
        </div>
      </section>

      {/* CTA strip */}
      <section
        className="card"
        style={{
          maxWidth: 1100,
          width: "100%",
          marginTop: 24,
          padding: 24,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 12,
          alignItems: "center",
        }}
      >
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>
            Ready to start something?
          </h2>
          <p
            style={{
              fontSize: 13,
              color: "var(--muted-2)",
            }}
          >
            Share a bit about your idea and we’ll send back a simple plan and
            quote — no hard sell.
          </p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link to="/contact" className="btn">
            Contact us today →
          </Link>
          <Link to="/portfolio" className="btn btn--outline">
            See our work
          </Link>
        </div>
      </section>
    </div>
  );
}

function TechPill({ children }) {
  return (
    <span
      style={{
        padding: "4px 10px",
        borderRadius: 999,
        border: "1px solid rgba(148,163,184,0.4)",
      }}
    >
      {children}
    </span>
  );
}

function Stat({ label, value }) {
  return (
    <div
      className="card"
      style={{
        padding: 12,
        background: "rgba(15,23,42,0.9)",
        border: "1px solid rgba(148,163,184,0.35)",
      }}
    >
      <div
        style={{
          fontSize: 12,
          color: "var(--muted-2)",
          marginBottom: 2,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 16, fontWeight: 700 }}>{value}</div>
    </div>
  );
}

function HomeService({ title, text }) {
  return (
    <div
      className="card card-link"
      style={{
        background: "rgba(15,23,42,0.9)",
        border: "1px solid rgba(148,163,184,0.25)",
        padding: 16,
      }}
    >
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>
        {title}
      </div>
      <div style={{ fontSize: 13, color: "var(--muted-2)" }}>{text}</div>
    </div>
  );
}
