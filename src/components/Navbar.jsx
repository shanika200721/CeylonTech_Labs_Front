import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        backdropFilter: "blur(12px)",
        background: "rgba(11,13,16,0.9)",
        borderBottom: "1px solid rgba(148,163,184,0.15)",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        {/* Brand */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 999,
              background:
                "radial-gradient(circle at 30% 0, #F97316, #E11D70 50%, #0B1120)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
            }}
          >
            <span style={{ fontWeight: 800 }}>C</span>
          </div>
          <div style={{ lineHeight: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 16 }}>CeylonTech Labs</div>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>
              Web & System Engineering
            </div>
          </div>
        </Link>

        {/* Nav links */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 14,
          }}
        >
          <NavItem to="/portfolio" label="Portfolio" />
          <NavItem to="/services" label="Services" />
          <NavItem to="/pricing" label="Pricing" />
          <NavItem to="/blog" label="Blog" />
          <NavItem to="/contact" label="Contact" />

          <Link
            to="/login"
            style={{
              marginLeft: 8,
              padding: "6px 10px",
              borderRadius: 999,
              border: "1px solid rgba(148,163,184,0.4)",
              fontSize: 12,
              textDecoration: "none",
              color: "var(--muted)",
            }}
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}

function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      end
      style={({ isActive }) => ({
        textDecoration: "none",
        color: isActive ? "white" : "var(--muted)",
        fontWeight: isActive ? 600 : 400,
        padding: "4px 6px",
        borderRadius: 999,
        background: isActive ? "rgba(248,250,252,0.08)" : "transparent",
      })}
    >
      {label}
    </NavLink>
  );
}
