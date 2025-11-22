import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(148,163,184,0.15)",
        marginTop: 32,
        padding: "24px 16px 32px",
        background: "#05060a",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0,2fr) minmax(0,1fr) minmax(0,1fr)",
          gap: 18,
        }}
      >
        {/* Column 1 */}
        <div>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>
            CeylonTech Labs
          </div>
          <p
            style={{
              fontSize: 13,
              color: "var(--muted-2)",
              maxWidth: 360,
            }}
          >
            Modern websites, dashboards, and systems built in Sri Lanka for
            teams anywhere in the world.
          </p>
          <p
            style={{
              fontSize: 12,
              color: "var(--muted)",
              marginTop: 8,
            }}
          >
            Based in Colombo · GMT+5:30
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 6 }}>
            Navigate
          </div>
          <FooterLink to="/portfolio">Portfolio</FooterLink>
          <FooterLink to="/services">Services</FooterLink>
          <FooterLink to="/pricing">Pricing</FooterLink>
          <FooterLink to="/blog">Blog</FooterLink>
        </div>

        {/* Column 3 */}
        <div>
          <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 6 }}>
            Contact
          </div>
          <div style={{ fontSize: 13, color: "var(--muted-2)" }}>
            <div>ceylontechlabs@gmail.com</div>
            <div style={{ marginTop: 4 }}>WhatsApp: +94 XX XXX XXXX</div>
            <Link
              to="/contact"
              style={{
                display: "inline-block",
                marginTop: 8,
                fontSize: 13,
                textDecoration: "none",
                color: "#F97316",
              }}
            >
              Start a project →
            </Link>
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1100,
          margin: "16px auto 0",
          fontSize: 11,
          color: "var(--muted)",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <span>© {new Date().getFullYear()} CeylonTech Labs. All rights reserved.</span>
        <span style={{ display: "flex", gap: 10 }}>
          <Link to="/privacy" style={{ color: "var(--muted)", textDecoration: "none" }}>
            Privacy
          </Link>
          <Link to="/terms" style={{ color: "var(--muted)", textDecoration: "none" }}>
            Terms
          </Link>
        </span>
      </div>
    </footer>
  );
}

function FooterLink({ to, children }) {
  return (
    <div style={{ marginBottom: 4 }}>
      <Link
        to={to}
        style={{
          fontSize: 13,
          color: "var(--muted-2)",
          textDecoration: "none",
        }}
      >
        {children}
      </Link>
    </div>
  );
}
