import { useMemo } from "react";
import { TRANSACTION_TYPES } from "../utils/constants.js";
import { getCurrentMonthIndex, isCash, sumValues } from "../utils/formatters.js";

function normalizeList(list, forcedType) {
  return list.map((item) => ({
    ...item,
    type: item?.type ?? forcedType,
    value: Number(item?.value ?? 0)
  }));
}

function filterByMonth(list, monthIndex) {
  return list.filter((item) => {
    const date = new Date(item?.date);
    if (Number.isNaN(date.getTime())) return false;
    return date.getMonth() === monthIndex;
  });
}

function splitByMethod(list) {
  return list.reduce(
    (acc, item) => {
      if (isCash(item?.method)) acc.cash.push(item);
      else acc.electronic.push(item);
      return acc;
    },
    { electronic: [], cash: [] }
  );
}

export default function useFinance({
  expenses = [],
  incomes = [],
  monthlyGoal = 0
} = {}) {
  return useMemo(() => {
    const normalizedExpenses = normalizeList(expenses, TRANSACTION_TYPES.EXPENSE);
    const normalizedIncomes = normalizeList(incomes, TRANSACTION_TYPES.INCOME);
    const monthIndex = getCurrentMonthIndex();

    const expenseSplit = splitByMethod(normalizedExpenses);
    const incomeSplit = splitByMethod(normalizedIncomes);

    const totalExpenses = sumValues(normalizedExpenses);
    const totalIncomes = sumValues(normalizedIncomes);
    const realSavings = totalIncomes - totalExpenses;

    const monthExpenses = filterByMonth(normalizedExpenses, monthIndex);
    const monthIncomes = filterByMonth(normalizedIncomes, monthIndex);
    const monthExpensesTotal = sumValues(monthExpenses);
    const monthIncomesTotal = sumValues(monthIncomes);
    const monthSavings = monthIncomesTotal - monthExpensesTotal;

    const monthlyAccumulation = Array.from({ length: 12 }, (_, index) => {
      const income = sumValues(filterByMonth(normalizedIncomes, index));
      const expense = sumValues(filterByMonth(normalizedExpenses, index));
      return {
        month: index,
        income,
        expense,
        balance: income - expense
      };
    });

    const goal = Number(monthlyGoal || 0);
    const goalProgress = goal > 0 ? monthSavings / goal : 0;
    const goalDelta = monthSavings - goal;

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
        accumulation: monthlyAccumulation
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
