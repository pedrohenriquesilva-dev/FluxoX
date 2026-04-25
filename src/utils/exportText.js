/**
 * Utility functions for exporting financial data to text format
 */

/**
 * Formats a number for text export
 * @param {number|string} value - Number to format
 * @returns {string} Formatted number string
 */
function formatNumberForText(value) {
  const num = Number(value);
  if (isNaN(num)) return '0';

  // Format as Brazilian currency without currency symbol
  return num.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

/**
 * Gets the current month name in Portuguese
 * @param {number} monthIndex - Month index (0-11)
 * @returns {string} Month name
 */
function getMonthName(monthIndex) {
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  return months[monthIndex] || 'Mês inválido';
}

/**
 * Generates a monthly summary text for sharing
 * @param {Object} monthlyData - Monthly financial data
 * @param {number} goal - Monthly savings goal
 * @returns {string} Formatted summary text
 */
export function generateMonthlySummary(monthlyData, goal = 0) {
  const {
    incomes = 0,
    expenses = 0,
    savings = 0,
    index = new Date().getMonth()
  } = monthlyData;

  const monthName = getMonthName(index);
  const formattedIncomes = formatNumberForText(incomes);
  const formattedExpenses = formatNumberForText(expenses);
  const formattedSavings = formatNumberForText(savings);
  const formattedGoal = formatNumberForText(goal);

  const goalStatus = goal > 0
    ? (savings >= goal ? '🎉 Meta atingida!' : `📈 Faltam R$ ${formatNumberForText(goal - savings)}`)
    : 'Nenhuma meta definida';

  return `📊 Resumo Financeiro - ${monthName}

💰 Receitas: R$ ${formattedIncomes}
💸 Despesas: R$ ${formattedExpenses}
💾 Economia: R$ ${formattedSavings}

🎯 Meta mensal: R$ ${formattedGoal}
${goalStatus}

📱 Gerado pelo FluxoX - Controle suas finanças!`;
}

/**
 * Copies text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const success = document.execCommand('copy');
      textArea.remove();
      return success;
    }
  } catch (error) {
    console.error('Erro ao copiar para clipboard:', error);
    return false;
  }
}