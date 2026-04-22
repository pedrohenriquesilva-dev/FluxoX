import { useMemo } from "react";
import { TRANSACTION_TYPES } from "../utils/constants.js";
import { getCurrentMonthIndex, isCash, sumValues } from "../utils/formatters.js";

/**
 * @typedef {Object} FinanceTransaction
 * @property {string} [id]
 * @property {string} [type]
 * @property {string} [description]
 * @property {string} [category]
 * @property {string} [method]
 * @property {number|string} [value]
 * @property {string|Date} [date]
 */

/**
 * @typedef {Object} UseFinanceInput
 * @property {FinanceTransaction[]} [expenses]
 * @property {FinanceTransaction[]} [incomes]
 * @property {number} [monthlyGoal]
 */

/**
 * @typedef {Object} MonthlyAccumulationRow
 * @property {number} month
 * @property {number} income
 * @property {number} expense
 * @property {number} balance
 */

function normalizeTransactions(list, forcedType) {
  return list.map((item) => ({
    ...item,
    type: item?.type ?? forcedType,
    value: Number(item?.value ?? 0)
  }));
}

function getMonthIndexFromDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? -1 : date.getMonth();
}

function filterTransactionsByMonth(list, monthIndex) {
  return list.filter((item) => getMonthIndexFromDate(item?.date) === monthIndex);
}

function splitTransactionsByMethod(list) {
  return list.reduce(
    (acc, item) => {
      if (isCash(item?.method)) acc.cash.push(item);
      else acc.electronic.push(item);
      return acc;
    },
    { electronic: [], cash: [] }
  );
}

/**
 * Central financial calculations used by dashboard and yearly pages.
 *
 * @param {UseFinanceInput} params
 */
export default function useFinance({ expenses = [], incomes = [], monthlyGoal = 0 } = {}) {
  return useMemo(() => {
    const normalizedExpenses = normalizeTransactions(expenses, TRANSACTION_TYPES.EXPENSE);
    const normalizedIncomes = normalizeTransactions(incomes, TRANSACTION_TYPES.INCOME);
    const monthIndex = getCurrentMonthIndex();

    const expenseSplit = splitTransactionsByMethod(normalizedExpenses);
    const incomeSplit = splitTransactionsByMethod(normalizedIncomes);

    const totalExpenses = sumValues(normalizedExpenses);
    const totalIncomes = sumValues(normalizedIncomes);
    const realSavings = totalIncomes - totalExpenses;

    const monthExpenses = filterTransactionsByMonth(normalizedExpenses, monthIndex);
    const monthIncomes = filterTransactionsByMonth(normalizedIncomes, monthIndex);
    const monthExpensesTotal = sumValues(monthExpenses);
    const monthIncomesTotal = sumValues(monthIncomes);
    const monthSavings = monthIncomesTotal - monthExpensesTotal;

    /** @type {MonthlyAccumulationRow[]} */
    const monthlyAccumulation = Array.from({ length: 12 }, (_, index) => {
      const income = sumValues(filterTransactionsByMonth(normalizedIncomes, index));
      const expense = sumValues(filterTransactionsByMonth(normalizedExpenses, index));
      return {
        month: index,
        income,
        expense,
        balance: income - expense
      };
    });

    const goal = Number(monthlyGoal ?? 0);
    const goalProgress = goal > 0 ? monthSavings / goal : 0;
    const goalDelta = monthSavings - goal;

    // Calculate accumulated balance for line chart
    let cumulativeBalance = 0;
    const lineChartData = Array.from({ length: 12 }, (_, index) => {
      const monthBalance = monthlyAccumulation[index].balance;
      cumulativeBalance += monthBalance;
      return {
        month: index,
        accumulated: cumulativeBalance
      };
    });

    return {
      totals: {
        incomes: totalIncomes,
        expenses: totalExpenses,
        realSavings
      },
      byMethod: {
        expenses: {
          electronic: sumValues(expenseSplit.electronic),
          cash: sumValues(expenseSplit.cash)
        },
        incomes: {
          electronic: sumValues(incomeSplit.electronic),
          cash: sumValues(incomeSplit.cash)
        }
      },
      monthly: {
        index: monthIndex,
        incomes: monthIncomesTotal,
        expenses: monthExpensesTotal,
        savings: monthSavings,
        accumulation: monthlyAccumulation,
        lineChartData
      },
      goal: {
        value: goal,
        progress: goalProgress,
        delta: goalDelta,
        reached: goal > 0 ? monthSavings >= goal : false
      }
    };
  }, [expenses, incomes, monthlyGoal]);
}
