/**
 * Filter transactions by a custom date period
 * @param {Array} transactions - Array of transactions to filter
 * @param {string} periodType - 'all', 'today', 'week', 'month', 'quarter', 'year', 'custom'
 * @param {Object} customDates - { startDate: Date, endDate: Date } for 'custom' period
 * @returns {Array} Filtered transactions
 */
export function filterByPeriod(transactions, periodType = 'month', customDates = null) {
  if (!Array.isArray(transactions)) return [];

  const now = new Date();
  let startDate = new Date();
  let endDate = new Date();

  switch (periodType) {
    case 'today':
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
      break;

    case 'week':
      const firstDayOfWeek = now.getDate() - now.getDay();
      startDate.setDate(firstDayOfWeek);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
      break;

    case 'month':
      startDate.setDate(1);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
      break;

    case 'quarter':
      const quarter = Math.floor(now.getMonth() / 3);
      startDate.setMonth(quarter * 3);
      startDate.setDate(1);
      startDate.setHours(0, 0, 0, 0);
      endDate.setMonth(quarter * 3 + 2);
      endDate.setDate(new Date(now.getFullYear(), quarter * 3 + 3, 0).getDate());
      endDate.setHours(23, 59, 59, 999);
      break;

    case 'year':
      startDate.setMonth(0);
      startDate.setDate(1);
      startDate.setHours(0, 0, 0, 0);
      endDate.setMonth(11);
      endDate.setDate(31);
      endDate.setHours(23, 59, 59, 999);
      break;

    case 'custom':
      if (customDates && customDates.startDate && customDates.endDate) {
        startDate = new Date(customDates.startDate);
        endDate = new Date(customDates.endDate);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
      }
      break;

    case 'all':
    default:
      return transactions;
  }

  return transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return transactionDate >= startDate && transactionDate <= endDate;
  });
}