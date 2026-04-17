import { CURRENCY, DATE_FORMATS, LOCALE } from "./constants.js";

/**
 * Format value as local currency.
 *
 * @param {number|string} value
 * @returns {string}
 */
export function fmt(value) {
  const amount = Number(value ?? 0);
  return new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency: CURRENCY
  }).format(Number.isFinite(amount) ? amount : 0);
}

/**
 * Detect whether a payment method is physical cash.
 *
 * @param {string} [method]
 * @returns {boolean}
 */
export function isCash(method = "") {
  const normalized = String(method)
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  return normalized.includes("dinheiro") || normalized.includes("especie");
}

/**
 * Generate a unique transaction identifier.
 *
 * @returns {string}
 */
export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Get current month index (0-11).
 *
 * @returns {number}
 */
export function getCurrentMonthIndex() {
  return new Date().getMonth();
}

/**
 * Sum `value` fields from a list of items.
 *
 * @param {Array<{value?: number|string}>} [list]
 * @returns {number}
 */
export function sumValues(list = []) {
  return list.reduce((acc, item) => acc + Number(item?.value ?? 0), 0);
}

/**
 * Filter transactions by month index from their `date` field.
 *
 * @param {Array<{date?: string|Date}>} [transactions]
 * @param {number} [monthIndex]
 * @returns {Array}
 */
export function filterByMonth(transactions = [], monthIndex = getCurrentMonthIndex()) {
  return transactions.filter((item) => {
    const date = new Date(item?.date);
    if (Number.isNaN(date.getTime())) return false;
    return date.getMonth() === monthIndex;
  });
}

/**
 * Filter transactions by exact category match (case-insensitive).
 *
 * @param {Array<{category?: string}>} [transactions]
 * @param {string} [category]
 * @returns {Array}
 */
export function filterByCategory(transactions = [], category = "") {
  if (!category) return transactions;
  const target = String(category).toLowerCase();
  return transactions.filter(
    (item) => String(item?.category ?? "").toLowerCase() === target
  );
}

/**
 * Filter transactions by exact payment method match (case-insensitive).
 *
 * @param {Array<{method?: string}>} [transactions]
 * @param {string} [method]
 * @returns {Array}
 */
export function filterByMethod(transactions = [], method = "") {
  if (!method) return transactions;
  const target = String(method).toLowerCase();
  return transactions.filter(
    (item) => String(item?.method ?? "").toLowerCase() === target
  );
}

/**
 * Filter transactions by description substring (case-insensitive).
 *
 * @param {Array<{description?: string}>} [transactions]
 * @param {string} [query]
 * @returns {Array}
 */
export function filterBySearch(transactions = [], query = "") {
  const term = String(query).trim().toLowerCase();
  if (!term) return transactions;
  return transactions.filter((item) =>
    String(item?.description ?? "").toLowerCase().includes(term)
  );
}

/**
 * Split transactions into electronic and cash buckets.
 *
 * @param {Array<{method?: string}>} [transactions]
 * @returns {{electronic: Array, cash: Array}}
 */
export function splitElectronicCash(transactions = []) {
  return transactions.reduce(
    (acc, item) => {
      if (isCash(item?.method)) acc.cash.push(item);
      else acc.electronic.push(item);
      return acc;
    },
    { electronic: [], cash: [] }
  );
}

/**
 * Sort transactions by numeric value.
 *
 * @param {Array<{value?: number|string}>} [transactions]
 * @param {"asc"|"desc"} [order]
 * @returns {Array}
 */
export function sortByValue(transactions = [], order = "desc") {
  const signal = order === "asc" ? 1 : -1;
  return [...transactions].sort(
    (a, b) => (Number(a?.value ?? 0) - Number(b?.value ?? 0)) * signal
  );
}

/**
 * Format value as currency with custom locale/currency.
 *
 * @param {number|string} value
 * @param {string} [currency]
 * @param {string} [locale]
 * @returns {string}
 */
export function formatCurrency(value, currency = CURRENCY, locale = LOCALE) {
  const amount = Number(value ?? 0);
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency
  }).format(Number.isFinite(amount) ? amount : 0);
}

/**
 * Format generic number using locale grouping.
 *
 * @param {number|string} value
 * @param {string} [locale]
 * @returns {string}
 */
export function formatNumber(value, locale = LOCALE) {
  const amount = Number(value ?? 0);
  return new Intl.NumberFormat(locale).format(Number.isFinite(amount) ? amount : 0);
}

/**
 * Format ratio as percentage.
 *
 * @param {number|string} value
 * @param {string} [locale]
 * @returns {string}
 */
export function formatPercent(value, locale = LOCALE) {
  const ratio = Number(value ?? 0);
  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(Number.isFinite(ratio) ? ratio : 0);
}

/**
 * Format date input according to locale/date options.
 *
 * @param {string|Date} dateInput
 * @param {Intl.DateTimeFormatOptions} [options]
 * @param {string} [locale]
 * @returns {string}
 */
export function formatDate(dateInput, options = DATE_FORMATS.MEDIUM, locale = LOCALE) {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(locale, options).format(date);
}

/**
 * Parse money input strings to a numeric value.
 *
 * @param {number|string} input
 * @returns {number}
 */
export function normalizeMoneyInput(input) {
  if (typeof input === "number") return Number.isFinite(input) ? input : 0;
  if (typeof input !== "string") return 0;

  const normalized = input
    .replace(/\s/g, "")
    .replace(/\./g, "")
    .replace(",", ".")
    .replace(/[^\d.-]/g, "");

  const amount = Number(normalized);
  return Number.isFinite(amount) ? amount : 0;
}

/**
 * Convert text to title case.
 *
 * @param {string} [value]
 * @returns {string}
 */
export function toTitleCase(value = "") {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
