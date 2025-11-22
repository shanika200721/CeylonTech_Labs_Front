import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function PublicLayout() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0B0D10",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <main style={{ flex: 1, paddingTop: 8 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
