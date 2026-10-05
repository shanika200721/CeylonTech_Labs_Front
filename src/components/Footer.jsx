import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div>
          <Link to="/" className="site-footer__brand">
            <img src="/ceylontech.jpg" alt="CeylonTech Labs logo" />
            <span>CeylonTech Labs</span>
          </Link>
          <p>
            Websites, web applications, dashboards, and support for Sri Lankan organizations and
            remote-first clients.
          </p>
          <p className="site-footer__muted">Based in Sri Lanka, working on GMT+5:30.</p>
        </div>

        <div>
          <h2>Explore</h2>
          <FooterLink to="/services">Services</FooterLink>
          <FooterLink to="/portfolio">Portfolio</FooterLink>
          <FooterLink to="/about">About</FooterLink>
          <FooterLink to="/blog">Blog</FooterLink>
        </div>

        <div>
          <h2>Contact</h2>
          <a href="mailto:ceylontechlabs@gmail.com">ceylontechlabs@gmail.com</a>
          <a href="https://wa.me/94705584634" target="_blank" rel="noreferrer">
            WhatsApp: +94 70 558 4634
          </a>
          <Link to="/contact" className="site-footer__quote">
            Start a project
          </Link>
        </div>
      </div>
      <div className="container site-footer__bottom">
        <span>Copyright {new Date().getFullYear()} CeylonTech Labs. All rights reserved.</span>
        <span>Built with React and Node.js.</span>
      </div>
    </footer>
  );
}

function FooterLink({ to, children }) {
  return <Link to={to}>{children}</Link>;
}
