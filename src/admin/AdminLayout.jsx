import { NavLink, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(236,72,153,0.08), #020617)",
        color: "#e5e7eb",
      }}
    >
      {/* SIDEBAR */}
      <aside
        style={{
          width: 240,
          borderRight: "1px solid rgba(148,163,184,0.25)",
          padding: "18px 16px",
          position: "sticky",
          top: 0,
          height: "100vh", // static sidebar, doesn't scroll with content
          display: "flex",
          flexDirection: "column",
          gap: 16,
          background:
            "radial-gradient(circle at top, rgba(236,72,153,0.22), #020617 55%)",
        }}
      >
        {/* Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 999,
              background:
                "radial-gradient(circle at 30% 10%, #f97316, #ec4899)",
              display: "grid",
              placeItems: "center",
              fontWeight: 800,
              fontSize: 14,
            }}
          >
            CT
          </div>
          <div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              CeylonTech Admin
            </div>
            <div
              style={{
                fontSize: 11,
                color: "rgba(148,163,184,0.9)",
              }}
            >
              Web &amp; System Engineering
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            marginTop: 8,
          }}
        >
          <AdminNavLink to="/admin" end label="Dashboard" />
          <AdminNavLink to="/admin/leads" label="Leads" />
          <AdminNavLink to="/admin/projects" label="Projects" />
          <AdminNavLink to="/admin/posts" label="Blog Posts" />
          <AdminNavLink to="/admin/users" label="Users" />
        </nav>

        {/* Footer */}
        <div style={{ marginTop: "auto", fontSize: 11, color: "#9ca3af" }}>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            ← View public site
          </a>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main
        style={{
          flex: 1,
          padding: 24,
          overflowY: "auto",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}

function AdminNavLink({ to, label, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      style={({ isActive }) => ({
        fontSize: 13,
        padding: "6px 10px",
        borderRadius: 999,
        textDecoration: "none",
        color: isActive ? "#020617" : "rgba(209,213,219,0.9)",
        background: isActive
          ? "linear-gradient(135deg, #ec4899, #f97316)"
          : "transparent",
        fontWeight: isActive ? 600 : 400,
        transition: "background 0.15s ease, color 0.15s ease, transform 0.1s",
        cursor: "pointer",
      })}
    >
      {label}
    </NavLink>
  );
}


{/* 
  import { NavLink, Outlet } from "react-router-dom";
import Button from "../components/Button.jsx";

export default function AdminLayout() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", minHeight: "100vh" }}>
      <aside style={{ background:"#0F1115", borderRight:"1px solid rgba(255,255,255,.08)", padding:16 }}>
        <div style={{ fontWeight:700, marginBottom:16 }}>CeylonTech Admin</div>
        <nav className="admin-nav">
          <NavItem to="/admin">Dashboard</NavItem>
          <NavItem to="/admin/leads">Leads</NavItem>
          <NavItem to="/admin/projects">Projects</NavItem>
          <NavItem to="/admin/posts">Posts</NavItem>
          <NavItem to="/admin/users">Users</NavItem>
          
        </nav>
      </aside>
      <main style={{ padding: 24 }}>
        <Outlet />
      </main>
    </div>
  );
}

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-3 py-2 rounded-md ${isActive ? "bg-white/10" : "hover:bg-white/5"}`
      }
      end
    >
      {children}
    </NavLink>
  );
}

  */}

