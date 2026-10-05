import { Link } from "react-router-dom";
import SEO from "../components/SEO.jsx";

const services = [
  ["Business websites", "Fast, responsive company sites with clear messaging, lead capture, and content that is easy to maintain."],
  ["Web applications", "Custom React and Node.js tools for workflows that need more than a static website."],
  ["Dashboards and portals", "Secure interfaces for managing leads, content, users, projects, and internal operations."],
];

const process = [
  ["Discover", "Clarify goals, users, scope, constraints, and the content needed for launch."],
  ["Design", "Create the page structure, interface direction, and key flows before build work begins."],
  ["Build", "Develop the frontend, backend, integrations, and admin tooling in working increments."],
  ["Launch", "Deploy, test, hand over the workflow, and plan practical support after release."],
];

const faqs = [
  ["Can you redesign an existing website?", "Yes. The first step is reviewing the current site, content, analytics if available, and the business goals behind the redesign."],
  ["Do you build admin panels?", "Yes. This project already uses React, Express, MySQL, authentication, and admin routes, which is the kind of stack CeylonTech Labs can maintain."],
  ["Can we start without every detail finalized?", "Yes. A short discovery phase can turn rough ideas into a launch plan, content list, and phased scope."],
  ["How do I request a quote?", "Use the contact form with your project type, budget range, timeline, and a few details. WhatsApp is available for quick first messages."],
];

export default function Home() {
  return (
    <>
      <SEO
        title="Website Services Company"
        description="CeylonTech Labs designs and builds modern websites, web applications, dashboards, and support workflows for Sri Lankan and international clients."
      />
      <section className="hero">
        <div className="container hero__grid">
          <div>
            <div className="eyebrow">CeylonTech Labs</div>
            <h1 className="title-xl">Websites and systems built for serious business work.</h1>
            <p className="lede">
              We design and develop polished business websites, custom web applications, and
              secure dashboards for organizations that need a dependable digital partner.
            </p>
            <div className="actions">
              <Link to="/contact" className="btn">Request a quote</Link>
              <Link to="/services" className="btn btn--outline">Explore services</Link>
            </div>
            <div className="pill-row" style={{ marginTop: 24 }}>
              <span className="pill">React</span>
              <span className="pill">Node.js</span>
              <span className="pill">MySQL</span>
              <span className="pill">Responsive UI</span>
            </div>
          </div>

          <div className="hero__media" aria-label="Website project preview">
            <div className="hero__media-top"><span className="dot" /><span className="dot" /><span className="dot" /></div>
            <div className="hero__panel">
              <div className="mock-row">
                <div className="mock-chip">Brief</div>
                <div><div className="mock-line" /><div className="mock-line" /></div>
              </div>
              <div className="mock-row">
                <div className="mock-chip">Design</div>
                <div><div className="mock-line" /><div className="mock-line" /></div>
              </div>
              <div className="mock-row">
                <div className="mock-chip">Build</div>
                <div><div className="mock-line" /><div className="mock-line" /></div>
              </div>
              <div className="card" style={{ background: "rgba(11,13,16,.7)" }}>
                <strong>Production-ready delivery</strong>
                <p className="card__sub" style={{ marginBottom: 0 }}>
                  Clear pages, working forms, admin protection, SEO basics, and support paths.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div className="kicker">Services</div>
            <h2>Practical digital products, not decorative pages.</h2>
            <p>
              CeylonTech Labs focuses on websites and web systems that explain your offer,
              capture enquiries, and give your team a reliable way to manage the work behind them.
            </p>
          </div>
          <div className="grid-3">
            {services.map(([title, text]) => (
              <article className="card" key={title}>
                <h3 className="card__title">{title}</h3>
                <p className="card__sub">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container split">
          <div className="section-heading">
            <div className="kicker">Process</div>
            <h2>A calm path from idea to launch.</h2>
            <p>
              Every project needs a scope that matches the business, not a one-size package.
              The workflow keeps decisions visible and avoids vague handovers.
            </p>
            <Link to="/contact" className="btn">Discuss a project</Link>
          </div>
          <div className="grid-2">
            {process.map(([title, text]) => (
              <article className="card" key={title}>
                <div className="eyebrow">{title}</div>
                <p className="card__sub">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container split">
          <div>
            <div className="kicker">Why CeylonTech Labs</div>
            <h2 className="page-title">Focused engineering with a polished client experience.</h2>
          </div>
          <div className="grid-2">
            <div className="card"><strong>Clear communication</strong><p className="card__sub">Milestones, priorities, and launch requirements stay visible from the start.</p></div>
            <div className="card"><strong>Full-stack delivery</strong><p className="card__sub">Frontend, backend, forms, content workflows, and deployment support can be handled together.</p></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div className="kicker">Questions</div>
            <h2>Before we start.</h2>
          </div>
          <div className="grid-2">
            {faqs.map(([question, answer]) => (
              <article className="card" key={question}>
                <h3 className="card__title">{question}</h3>
                <p className="card__sub">{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section--tight">
        <div className="container card split">
          <div>
            <div className="kicker">Ready when you are</div>
            <h2 className="page-title">Tell us what you need to build.</h2>
          </div>
          <div>
            <p className="card__sub">
              Share your goals, timeline, and budget range. We will reply with the next
              practical step instead of a generic sales pitch.
            </p>
            <Link to="/contact" className="btn">Start the quote request</Link>
          </div>
        </div>
      </section>
    </>
  );
}
