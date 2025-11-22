import { useEffect, useRef } from "react";
import { Auth } from "../api/client.js";

export default function GoogleButton() {
  const divRef = useRef(null);

  useEffect(() => {
    /* global google */
    if (!window.google || !divRef.current) return;

    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: async ({ credential }) => {
        // send ID token to backend
        await fetch(`${import.meta.env.VITE_API_BASE}/api/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ credential }),
        }).then(async (r) => {
          if (!r.ok) throw new Error(await r.text());
          window.location.href = "/admin";
        }).catch((e) => alert(e.message || "Google sign-in failed"));
      },
      ux_mode: "popup",
    });

    google.accounts.id.renderButton(divRef.current, {
      theme: "outline",
      size: "large",
      shape: "pill",
      text: "continue_with",
      width: 360,
    });
  }, []);

  return <div ref={divRef} style={{ display: "grid", placeItems: "center" }} />;
}
