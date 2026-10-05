import { Link } from "react-router-dom";
import SEO from "../components/SEO.jsx";

const values = [
  ["Clarity", "Plain-language decisions, visible scope, and fewer surprises during delivery."],
  ["Maintainability", "Code and content structures that can keep evolving after launch."],
  ["Responsiveness", "Interfaces that work across mobile, tablet, and desktop from day one."],
  ["Trust", "Secure authentication, sensible access control, and no unnecessary exposure of admin areas."],
];

export default function About() {
  return (
    <>
      <SEO
        title="About"
        description="Learn how CeylonTech Labs works on websites, web applications, dashboards, and support."
      />
      <section className="page-hero">
        <div className="container page-hero__inner">
          <div className="kicker">About</div>
          <h1 className="page-title">A focused web engineering partner based in Sri Lanka.</h1>
          <p className="lede">
            CeylonTech Labs builds websites and web systems for clients who need careful
            product thinking, clean interfaces, and dependable implementation.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container split">
          <div className="card">
            <h2 className="card__title">How we work</h2>
            <p className="card__sub">
              The repository shows a React frontend, Express backend, MySQL connection,
              contact lead workflow, blog and portfolio content, and a protected admin area.
              The public website is designed around that practical full-stack capability.
            </p>
            <p className="card__sub">
              We avoid claiming client counts, awards, or outcomes that are not documented.
              Instead, the site focuses on the work CeylonTech Labs can clearly support:
              websites, dashboards, web applications, integrations, and maintenance.
            </p>
          </div>
          <div className="grid-2">
            {values.map(([title, text]) => (
              <article className="card" key={title}>
                <h3 className="card__title">{title}</h3>
                <p className="card__sub">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section--tight">
        <div className="container card split">
          <div>
            <div className="kicker">Next step</div>
            <h2 className="page-title">Bring the business problem. We will help shape the build.</h2>
          </div>
          <div>
            <p className="card__sub">
              A good first brief includes the goal, audience, pages or features needed,
              timeline, budget range, and examples of sites you like.
            </p>
            <Link to="/contact" className="btn">Contact CeylonTech Labs</Link>
          </div>
        </div>
      </section>
    </>
  );
}
