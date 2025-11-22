import { useState } from "react";

export default function PasswordInput({ label, id, ...props }) {
  const [show, setShow] = useState(false);
  return (
    <label className="field">
      {label && <span className="field__label" htmlFor={id}>{label}</span>}
      <div className="field__password">
        <input
          id={id}
          className="field__input"
          type={show ? "text" : "password"}
          {...props}
        />
        <button
          type="button"
          className="field__toggle"
          onClick={() => setShow(s => !s)}
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>
    </label>
  );
}
