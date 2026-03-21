export default function LogoGlyph({ className = "" }) {
  return (
    <img
      src="/ceylontech.jpg"
      alt="CeylonTech Labs"
      className={className}
      style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
    />
  );
}


