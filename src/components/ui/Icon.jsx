import PropTypes from "prop-types";

const PATHS = {
  dashboard: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  expenses: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M8.5 13.5 12 17l3.5-3.5" />
    </>
  ),
  incomes: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 17V7M8.5 10.5 12 7l3.5 3.5" />
    </>
  ),
  annual: (
    <>
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M16 2v4M8 2v4M3 9h18" />
    </>
  ),
  savings: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.5" />
    </>
  ),
  conference: <path d="M4 20V10M12 20V4M20 20v-7" />,
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  close: <path d="M18 6 6 18M6 6l12 12" />,
  trendUp: <path d="M4 17 10 11l4 4 6-8M15 8h5v5" />,
  trendDown: <path d="M4 7l6 6 4-4 6 8M20 12v5h-5" />,
  success: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.5 2.6 2.6L16 9" />
    </>
  ),
  error: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m9 9 6 6M15 9l-6 6" />
    </>
  ),
  warning: (
    <>
      <path d="M12 3 2 20h20L12 3Z" />
      <path d="M12 10v4M12 17h.01" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8h.01M11 11h1v6" />
    </>
  ),
  empty: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12h8" />
    </>
  )
};

export default function Icon({ name, className = "", label, size }) {
  const content = PATHS[name];
  if (!content) return null;

  return (
    <svg
      className={className}
      style={size ? { width: size, height: size } : { width: "1em", height: "1em" }}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={label ? undefined : "true"}
      aria-label={label}
      role={label ? "img" : undefined}
    >
      {content}
    </svg>
  );
}

Icon.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
