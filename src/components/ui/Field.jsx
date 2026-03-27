import Icon from "./Icon.jsx";
import "./Field.css";

export default function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  icon,
  hint = "",
  error = "",
  ...rest
}) {
  return (
    <label className="field" htmlFor={id}>
      {label ? <span className="field__label">{label}</span> : null}

      <div className={`field__control ${error ? "field__control--error" : ""}`}>
        {icon ? <Icon name={icon} className="field__icon" /> : null}
        <input
          id={id}
          className="field__input"
          value={value}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          {...rest}
        />
      </div>

      {error ? <span className="field__feedback field__feedback--error">{error}</span> : null}
      {!error && hint ? <span className="field__feedback">{hint}</span> : null}
    </label>
  );
}
