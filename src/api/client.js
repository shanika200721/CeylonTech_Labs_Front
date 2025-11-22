const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:4000";

export async function api(path, { method = "GET", body } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",        // <-- send/receive httpOnly cookie
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(msg || `Request failed: ${res.status}`);
  }
  return res.status === 204 ? null : res.json();
}

export const Auth = {
  me: () => api("/api/auth/me"),
  login: (email, password) => api("/api/auth/login", { method: "POST", body: { email, password } }),
  logout: () => api("/api/auth/logout", { method: "POST" }),
};

export async function uploadFile(file) {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch(`${API_BASE}/api/upload`, {
    method: "POST",
    credentials: "include",
    body: fd,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json(); // { url , public_id }
}

