// Replace with your real logo when you send it (use <img src="/logo.svg" alt="..."/>)
export default function LogoGlyph({ className = "" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="CeylonTech Labs">
      <circle cx="32" cy="32" r="30" fill="var(--accent)" />
      <path d="M20 24l8 8-8 8M44 24l-8 8 8 8"
            stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}


