import { CURRENCY, DATE_FORMATS, LOCALE } from "./constants.js";

export function fmt(value) {
  const amount = Number(value ?? 0);
  return new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency: CURRENCY
  }).format(Number.isFinite(amount) ? amount : 0);
}

export function isCash(method = "") {
  const normalized = String(method)
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  return normalized.includes("dinheiro") || normalized.includes("especie");
}

export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function getCurrentMonthIndex() {
  return new Date().getMonth();
}

export function sumValues(list = []) {
  return list.reduce((acc, item) => acc + Number(item?.value ?? 0), 0);
}

export function filterByMonth(transactions = [], monthIndex = getCurrentMonthIndex()) {
  return transactions.filter((item) => {
    const date = new Date(item?.date);
    if (Number.isNaN(date.getTime())) return false;
    return date.getMonth() === monthIndex;
  });
}

export function filterByCategory(transactions = [], category = "") {
  if (!category) return transactions;
  const target = String(category).toLowerCase();
  return transactions.filter(
    (item) => String(item?.category ?? "").toLowerCase() === target
  );
}

export function filterByMethod(transactions = [], method = "") {
  if (!method) return transactions;
  const target = String(method).toLowerCase();
  return transactions.filter(
    (item) => String(item?.method ?? "").toLowerCase() === target
  );
}

export function filterBySearch(transactions = [], query = "") {
  const term = String(query).trim().toLowerCase();
  if (!term) return transactions;
  return transactions.filter((item) =>
    String(item?.description ?? "").toLowerCase().includes(term)
  );
}

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

export function sortByValue(transactions = [], order = "desc") {
  const signal = order === "asc" ? 1 : -1;
  return [...transactions].sort(
    (a, b) => (Number(a?.value ?? 0) - Number(b?.value ?? 0)) * signal
  );
}

export function formatCurrency(value, currency = CURRENCY, locale = LOCALE) {
  const amount = Number(value ?? 0);
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency
  }).format(Number.isFinite(amount) ? amount : 0);
}

export function formatNumber(value, locale = LOCALE) {
  const amount = Number(value ?? 0);
  return new Intl.NumberFormat(locale).format(Number.isFinite(amount) ? amount : 0);
}

export function formatPercent(value, locale = LOCALE) {
  const ratio = Number(value ?? 0);
  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(Number.isFinite(ratio) ? ratio : 0);
}

export function formatDate(dateInput, options = DATE_FORMATS.MEDIUM, locale = LOCALE) {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(locale, options).format(date);
}

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

export function toTitleCase(value = "") {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
