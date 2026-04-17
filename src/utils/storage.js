/**
 * Centralized localStorage keys used across the app.
 * Keep this map as the single source of truth for persistence.
 */
export const STORAGE_KEYS = Object.freeze({
  ACTIVE_PAGE: "fluxox:active-page",
  EXPENSE_TRANSACTIONS: "fluxox:transactions:expenses",
  INCOME_TRANSACTIONS: "fluxox:transactions:incomes",
  SAVINGS_BY_MONTH: "fluxox:savings:by-month",
  SETTINGS: "fluxox:settings",
  MONTHLY_GOAL: "fluxox:goal:monthly"
});
