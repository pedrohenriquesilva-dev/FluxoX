/**
 * Utility functions for exporting financial data to CSV format
 */

/**
 * Converts an array of objects to CSV string
 * @param {Array<Object>} data - Array of objects to convert
 * @param {Array<string>} headers - Column headers
 * @returns {string} CSV formatted string
 */
function arrayToCSV(data, headers) {
  if (!data || !data.length) return '';

  const csvRows = [];

  // Add headers
  csvRows.push(headers.join(','));

  // Add data rows
  data.forEach(row => {
    const values = headers.map(header => {
      const value = row[header] || '';
      // Escape quotes and wrap in quotes if contains comma, quote, or newline
      const stringValue = String(value);
      if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    });
    csvRows.push(values.join(','));
  });

  return csvRows.join('\n');
}

/**
 * Downloads a CSV file
 * @param {string} csvContent - CSV content as string
 * @param {string} filename - Name of the file to download
 */
function downloadCSV(csvContent, filename) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

/**
 * Formats a date for CSV export
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
function formatDateForCSV(date) {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';

  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
}

/**
 * Formats a number for CSV export
 * @param {number|string} value - Number to format
 * @returns {string} Formatted number string
 */
function formatNumberForCSV(value) {
  const num = Number(value);
  if (isNaN(num)) return '0';

  // Format as Brazilian currency without currency symbol
  return num.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

/**
 * Exports expenses data to CSV
 * @param {Array<Object>} expenses - Array of expense objects
 * @param {string} filename - Optional filename
 */
export function exportExpensesToCSV(expenses, filename = 'despesas.csv') {
  const headers = ['Data', 'Descrição', 'Categoria', 'Valor', 'Método'];

  const formattedData = expenses.map(expense => ({
    Data: formatDateForCSV(expense.date),
    Descrição: expense.description || '',
    Categoria: expense.category || '',
    Valor: formatNumberForCSV(expense.value),
    Método: expense.method || ''
  }));

  const csvContent = arrayToCSV(formattedData, headers);
  downloadCSV(csvContent, filename);
}

/**
 * Exports incomes data to CSV
 * @param {Array<Object>} incomes - Array of income objects
 * @param {string} filename - Optional filename
 */
export function exportIncomesToCSV(incomes, filename = 'receitas.csv') {
  const headers = ['Data', 'Descrição', 'Categoria', 'Valor', 'Método'];

  const formattedData = incomes.map(income => ({
    Data: formatDateForCSV(income.date),
    Descrição: income.description || '',
    Categoria: income.category || '',
    Valor: formatNumberForCSV(income.value),
    Método: income.method || ''
  }));

  const csvContent = arrayToCSV(formattedData, headers);
  downloadCSV(csvContent, filename);
}

/**
 * Exports annual summary data to CSV
 * @param {Array<Object>} annualData - Array of annual summary objects
 * @param {string} filename - Optional filename
 */
export function exportAnnualToCSV(annualData, filename = 'resumo-anual.csv') {
  const headers = ['Mês', 'Receitas', 'Despesas', 'Saldo', 'Acumulado'];

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const formattedData = annualData.map((item, index) => ({
    Mês: monthNames[index] || `Mês ${index + 1}`,
    Receitas: formatNumberForCSV(item.income),
    Despesas: formatNumberForCSV(item.expense),
    Saldo: formatNumberForCSV(item.balance),
    Acumulado: formatNumberForCSV(item.accumulated || 0)
  }));

  const csvContent = arrayToCSV(formattedData, headers);
  downloadCSV(csvContent, filename);
}