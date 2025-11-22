export default function Button({
  children,
  variant = "solid",
  loading = false,
  className = "",
  ...props
}) {
  const base = "btn";
  const style = variant === "solid" ? "btn--solid" : "btn--outline";
  const disabled = loading || props.disabled;

  return (
    <button {...props} disabled={disabled} className={`${base} ${style} ${className}`}>
      {loading && <span className="spinner" aria-hidden/>}
      {children}
    </button>
  );
}
