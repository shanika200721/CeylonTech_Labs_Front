// src/pages/About.jsx
import SEO from "../components/SEO.jsx";

export default function About() {
  return (
    <div className="screen" style={{ padding: 24 }}>
      <div className="card" style={{ maxWidth: 900, width: "100%" }}>
        <SEO
          title="About Us - CeylonTech Labs"
          description="Learn about CeylonTech Labs, our story, values, and how we work to deliver quality digital products for our clients."
        />
        <h1 className="card__title">About CeylonTech Labs</h1>
        <p className="card__sub">
          CeylonTech Labs is a small, focused team based in Sri Lanka, building modern
          websites and systems for clients who care about quality.
        </p>

        {/* Story */}
        <section style={{ marginTop: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>
            Our Story
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "var(--muted-2)",
              lineHeight: 1.7,
            }}
          >
            We started CeylonTech Labs with a simple idea: many businesses don’t need
            a huge agency, they just need a reliable engineering partner. Someone who
            can understand the problem, design a practical solution, and ship it to
            production — without drama.
          </p>
          <p
            style={{
              fontSize: 14,
              color: "var(--muted-2)",
              marginTop: 10,
              lineHeight: 1.7,
            }}
          >
            With experience in React, Node, and modern cloud platforms, we help
            companies turn fuzzy requirements into clear roadmaps and working software.
            We care about performance, maintainability, and giving you control through
            a clean admin experience.
          </p>
        </section>

        {/* Values */}
        <section style={{ marginTop: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>
            What We Value
          </h2>
          <div
            style={{
              display: "grid",
              gap: 12,
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            }}
          >
            <ValueCard
              title="Clarity"
              text="We explain options in plain language and help you choose the right scope, not the biggest one."
            />
            <ValueCard
              title="Quality"
              text="We use solid engineering practices, from code review to testing, so your product behaves reliably."
            />
            <ValueCard
              title="Speed"
              text="We move quickly but carefully, delivering in small, testable pieces instead of big risky launches."
            />
            <ValueCard
              title="Partnership"
              text="We don’t just deliver and disappear — we support you as your product grows and changes."
            />
          </div>
        </section>

        {/* Process */}
        <section style={{ marginTop: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>
            How We Work
          </h2>
          <ol
            style={{
              paddingLeft: 20,
              fontSize: 14,
              color: "var(--muted-2)",
              lineHeight: 1.6,
            }}
          >
            <li style={{ marginBottom: 6 }}>
              <strong>Discover</strong> – We start with a short call to understand your
              goals, audience, and constraints.
            </li>
            <li style={{ marginBottom: 6 }}>
              <strong>Plan</strong> – We propose a clear scope, timeline, and price, and
              agree on milestones.
            </li>
            <li style={{ marginBottom: 6 }}>
              <strong>Design</strong> – We create key screens and flows, then refine them
              with your feedback.
            </li>
            <li style={{ marginBottom: 6 }}>
              <strong>Build</strong> – We implement the frontend, backend, and admin
              tools, integrating any required services.
            </li>
            <li style={{ marginBottom: 6 }}>
              <strong>Launch & Support</strong> – We deploy, monitor, and stay available
              for fixes and future improvements.
            </li>
          </ol>
        </section>

        {/* CTA */}
        <section style={{ marginTop: 28 }}>
          <p className="brand__tag">
            If you’re looking for a team that treats your project like a product — not
            just a template — we’d love to talk.
          </p>
          <a href="/contact" className="btn" style={{ marginTop: 12 }}>
            Schedule a quick intro call →
          </a>
        </section>
      </div>
    </div>
  );
}

function ValueCard({ title, text }) {
  return (
    <div
      className="card"
      style={{
        background: "rgba(15,23,42,0.9)",
        border: "1px solid rgba(148,163,184,0.25)",
        padding: 14,
      }}
    >
      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>
        {title}
      </div>
      <div style={{ fontSize: 13, color: "var(--muted-2)" }}>{text}</div>
    </div>
  );
}
