export default function Input({ label, id, ...props }) {
  return (
    <label className="field">
      {label && <span className="field__label" htmlFor={id}>{label}</span>}
      <input id={id} className="field__input" {...props} />
    </label>
  );
}
