import { Link } from "react-router-dom";
import SEO from "../components/SEO.jsx";

const services = [
  {
    title: "Business Website Design & Development",
    for: "Small businesses, service providers, organizations, and new brands that need a credible online presence.",
    deliverables: ["Responsive website", "Contact or quote form", "SEO-ready page structure", "Deployment support"],
  },
  {
    title: "Portfolio & Personal Brand Websites",
    for: "Founders, creators, consultants, and professionals who need to present work clearly.",
    deliverables: ["Project showcase", "About and profile content", "Inquiry workflow", "Fast mobile experience"],
  },
  {
    title: "E-Commerce & Product Catalogues",
    for: "Businesses that need to present products, collect enquiries, or prepare for online sales.",
    deliverables: ["Product structure", "Searchable catalogue", "Inquiry or checkout planning", "Admin-friendly content model"],
  },
  {
    title: "Web Applications, Dashboards & Portals",
    for: "Teams that need custom workflows, secure data management, or internal tools.",
    deliverables: ["React interface", "Node.js API", "Authentication and roles", "Database-backed admin workflows"],
  },
  {
    title: "Website Redesign",
    for: "Organizations with an existing website that needs better structure, performance, trust, or conversion.",
    deliverables: ["Current-site review", "Information architecture", "Visual refresh", "Migration and launch checklist"],
  },
  {
    title: "Maintenance & Support",
    for: "Teams that want reliable updates after launch without hiring a full-time developer.",
    deliverables: ["Bug fixes", "Content updates", "Security updates", "Small enhancements"],
  },
];

export default function Services() {
  return (
    <>
      <SEO
        title="Services"
        description="Website design, web application development, dashboards, redesigns, and maintenance from CeylonTech Labs."
      />
      <section className="page-hero">
        <div className="container page-hero__inner">
          <div className="kicker">Services</div>
          <h1 className="page-title">Website services for businesses that need clarity and momentum.</h1>
          <p className="lede">
            Choose a focused website, a custom web application, or an ongoing support path.
            Every engagement starts with the same question: what should this help your business do?
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container grid-2">
          {services.map((service) => (
            <article className="card" key={service.title}>
              <h2 className="card__title">{service.title}</h2>
              <p className="card__sub"><strong>Best for:</strong> {service.for}</p>
              <ul className="list-clean">
                {service.deliverables.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <Link to="/contact" className="btn btn--outline">Ask about this service</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <div className="container split">
          <div>
            <div className="kicker">Not sure where to start?</div>
            <h2 className="page-title">A short brief is enough for the first conversation.</h2>
          </div>
          <div>
            <p className="card__sub">
              Send your project type, rough budget, timeline, and a few reference links.
              CeylonTech Labs can help shape that into a practical scope.
            </p>
            <Link to="/contact" className="btn">Request a quote</Link>
          </div>
        </div>
      </section>
    </>
  );
}
