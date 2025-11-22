// src/components/SEO.jsx
import { useEffect } from "react";

export default function SEO({ title, description }) {
  useEffect(() => {
    const siteName = "CeylonTech Labs";

    // Set page title
    if (title) {
      document.title = `${title} | ${siteName}`;
    } else {
      document.title = siteName;
    }

    // Set or create meta description
    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }
      meta.content = description;
    }
  }, [title, description]);

  // Nothing to render in the UI
  return null;
}
