import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const links = [
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-nav">
      <div className="site-nav__inner container">
        <Link to="/" className="site-nav__brand" onClick={() => setOpen(false)}>
          <img src="/ceylontech.jpg" alt="CeylonTech Labs logo" className="site-nav__logo" />
          <span>
            <strong>CeylonTech Labs</strong>
            <small>Web & System Engineering</small>
          </span>
        </Link>

        <button
          className="site-nav__toggle"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`site-nav__links ${open ? "is-open" : ""}`} aria-label="Primary navigation">
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) => `site-nav__link ${isActive ? "is-active" : ""}`}
            >
              {item.label}
            </NavLink>
          ))}
          <Link to="/contact" className="btn site-nav__cta" onClick={() => setOpen(false)}>
            Request a quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
