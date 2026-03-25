export const APP_NAME = "FluxoX";
export const LOCALE = "pt-BR";
export const CURRENCY = "BRL";

export const STORAGE_KEYS = {
  TRANSACTIONS: "fluxox:transactions",
  SETTINGS: "fluxox:settings",
  ACTIVE_PAGE: "fluxox:active-page"
};

export const TRANSACTION_TYPES = {
  EXPENSE: "expense",
  INCOME: "income"
};

export const PAYMENT_METHODS = [
  "dinheiro",
  "debito",
  "credito",
  "pix",
  "transferencia"
];

export const CATEGORIES = [
  "alimentacao",
  "transporte",
  "moradia",
  "saude",
  "educacao",
  "lazer",
  "salario",
  "freelance",
  "investimentos",
  "outros"
];

export const PAGE_IDS = {
  DASHBOARD: "dashboard",
  EXPENSES: "expenses",
  INCOMES: "incomes",
  ANNUAL: "annual",
  SAVINGS: "savings",
  CONFERENCE: "conference",
  SETTINGS: "settings"
};

export const PAGE_CONFIG = [
  { id: PAGE_IDS.DASHBOARD, label: "Dashboard", icon: "\u{1F3E0}" },
  { id: PAGE_IDS.EXPENSES, label: "Despesas", icon: "\u{1F4B8}" },
  { id: PAGE_IDS.INCOMES, label: "Receitas", icon: "\u{1F4B0}" },
  { id: PAGE_IDS.ANNUAL, label: "Anual", icon: "\u{1F4C5}" },
  { id: PAGE_IDS.SAVINGS, label: "Poupanca", icon: "\u{1F4B5}" },
  { id: PAGE_IDS.CONFERENCE, label: "Conferencia", icon: "\u{1F4C8}" },
  { id: PAGE_IDS.SETTINGS, label: "Configuracoes", icon: "\u2699" }
];

export const DATE_FORMATS = {
  SHORT: { dateStyle: "short" },
  MEDIUM: { dateStyle: "medium" },
  MONTH_YEAR: { month: "long", year: "numeric" }
};

export const DEFAULT_TRANSACTION = {
  id: "",
  type: TRANSACTION_TYPES.EXPENSE,
  description: "",
  category: "outros",
  method: "pix",
  value: 0,
  date: ""
};
