const ICONS = {
  dashboard: "\u{1F3E0}",
  expenses: "\u{1F4B8}",
  incomes: "\u{1F4B0}",
  annual: "\u{1F4C5}",
  savings: "\u{1F4B5}",
  conference: "\u{1F4C8}",
  settings: "\u2699",
  search: "\u{1F50D}",
  plus: "+",
  close: "\u2715",
  trendUp: "\u2197",
  trendDown: "\u2198"
};

export default function Icon({ name, fallback = "\u25A1", className = "", label }) {
  const symbol = ICONS[name] ?? fallback;
  return (
    <span className={className} aria-hidden={label ? undefined : "true"} aria-label={label}>
      {symbol}
    </span>
  );
}
