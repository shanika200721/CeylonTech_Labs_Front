import Button from "../components/Button.jsx";
import { Auth } from "../api/client.js";

export default function AdminDashboard() {
  const doLogout = async () => {
    await Auth.logout();
    window.location.href = "/login";
  };

  return (
    <div className="screen" style={{ padding: 24 }}>
      <div className="card" style={{ maxWidth: 880, width: "100%" }}>
        <h2 className="card__title">Admin Dashboard</h2>
        <p className="card__sub">You are authenticated. (We’ll build CRUD and analytics next.)</p>
        <div style={{ marginTop: 16 }}>
          <Button onClick={doLogout}>Logout</Button>
        </div>
      </div>
    </div>
  );
}
