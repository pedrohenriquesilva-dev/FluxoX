import { useMemo } from "react";

/**
 * Hook para busca global em despesas e receitas
 * @param {Array} expenses - Lista de despesas
 * @param {Array} incomes - Lista de receitas
 * @param {string} query - Termo de busca
 * @returns {Array} Resultados da busca
 */
export default function useGlobalSearch(expenses = [], incomes = [], query = "") {
  return useMemo(() => {
    if (!query.trim()) return [];

    const searchTerm = query.toLowerCase();
    const results = [];

    // Buscar em despesas
    expenses.forEach(expense => {
      if (
        expense.description?.toLowerCase().includes(searchTerm) ||
        expense.category?.toLowerCase().includes(searchTerm) ||
        expense.method?.toLowerCase().includes(searchTerm) ||
        String(expense.value).includes(searchTerm)
      ) {
        results.push({
          ...expense,
          type: "expense",
          displayType: "Despesa"
        });
      }
    });

    // Buscar em receitas
    incomes.forEach(income => {
      if (
        income.description?.toLowerCase().includes(searchTerm) ||
        income.category?.toLowerCase().includes(searchTerm) ||
        income.method?.toLowerCase().includes(searchTerm) ||
        String(income.value).includes(searchTerm)
      ) {
        results.push({
          ...income,
          type: "income",
          displayType: "Receita"
        });
      }
    });

    // Ordenar por data decrescente
    return results.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [expenses, incomes, query]);
}