import { useEffect, useRef, useState } from "react";
import { Auth } from "../api/client.js";

export default function GoogleButton() {
  const divRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadGoogleScript = () => {
      // Check if Google script is already loaded
      if (window.google) {
        initializeGoogle();
        return;
      }

      // Load Google Identity Services script
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogle;
      document.head.appendChild(script);
    };

    const initializeGoogle = () => {
      if (!window.google || !divRef.current) return;

      try {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
          ux_mode: "popup",
          // Add scopes if needed
          // scope: "email profile"
        });

        window.google.accounts.id.renderButton(divRef.current, {
          theme: "outline",
          size: "large",
          text: "signin_with",
          shape: "rectangular",
          logo_alignment: "left",
          width: 360, // Fixed width
          type: "standard"
        });

        // Optional: Display the One Tap dialog
        // window.google.accounts.id.prompt((notification) => {
        //   if (notification.isNotDisplayed() || notification.isSkipped()) {
        //     console.log("One Tap not displayed");
        //   }
        // });
      } catch (err) {
        console.error("Failed to initialize Google Sign-In:", err);
        setError("Google Sign-In initialization failed");
      }
    };

    const handleCredentialResponse = async (response) => {
      setLoading(true);
      setError("");

      try {
        // Send the credential to backend
        const apiResponse = await fetch(
          `${import.meta.env.VITE_API_BASE}/api/auth/google`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ credential: response.credential }),
          }
        );

        if (!apiResponse.ok) {
          const errorText = await apiResponse.text();
          throw new Error(errorText || "Google sign-in failed");
        }

        // Verify session is set by checking /me endpoint
        const meResponse = await Auth.me();
        
        if (meResponse && meResponse.user) {
          // Redirect to admin dashboard
          window.location.href = "/admin";
        } else {
          throw new Error("Session not established");
        }
      } catch (err) {
        console.error("Google sign-in error:", err);
        setError(err.message || "Failed to sign in with Google");
        
        // Refresh the page to clear any stuck state
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } finally {
        setLoading(false);
      }
    };

    loadGoogleScript();

    // Cleanup function
    return () => {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.cancel();
      }
    };
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <div ref={divRef} style={{ 
        display: "grid", 
        placeItems: "center",
        minHeight: "44px" // Minimum height for Google button
      }} />
      
      {loading && (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "4px"
        }}>
          <div style={{ color: "white", fontSize: "14px" }}>Signing in...</div>
        </div>
      )}
      
      {error && (
        <div style={{
          marginTop: "8px",
          padding: "8px 12px",
          background: "rgba(239, 68, 68, 0.1)",
          border: "1px solid rgba(239, 68, 68, 0.3)",
          borderRadius: "4px",
          color: "#ef4444",
          fontSize: "12px"
        }}>
          {error}
        </div>
      )}
      
      <div style={{ 
        marginTop: "8px", 
        fontSize: "11px", 
        color: "#94a3b8",
        textAlign: "center" 
      }}>
        Use your Google account
      </div>
    </div>
  );
}