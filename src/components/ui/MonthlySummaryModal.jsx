import { useState } from 'react';
import PropTypes from 'prop-types';
import { generateMonthlySummary, copyToClipboard } from '../../utils/exportText.js';
import './MonthlySummaryModal.css';

export default function MonthlySummaryModal({ monthlyData, goal = 0, onClose }) {
  const [isCopying, setIsCopying] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const summaryText = generateMonthlySummary(monthlyData, goal);

  const handleCopy = async () => {
    setIsCopying(true);
    const success = await copyToClipboard(summaryText);
    setCopySuccess(success);
    setIsCopying(false);

    if (success) {
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Resumo Financeiro - FluxoX',
          text: summaryText,
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Erro ao compartilhar:', error);
        }
      }
    } else {
      // Fallback para copiar
      await handleCopy();
    }
  };

  return (
    <div className="monthly-summary-modal">
      <div className="monthly-summary-modal__overlay" onClick={onClose} />
      <div className="monthly-summary-modal__content">
        <header className="monthly-summary-modal__header">
          <h3 className="monthly-summary-modal__title">Compartilhar Resumo</h3>
          <button
            className="monthly-summary-modal__close"
            onClick={onClose}
            type="button"
            aria-label="Fechar modal"
          >
            ✕
          </button>
        </header>

        <div className="monthly-summary-modal__body">
          <div className="monthly-summary-modal__preview">
            <h4 className="monthly-summary-modal__preview-title">Prévia do texto:</h4>
            <pre className="monthly-summary-modal__text">{summaryText}</pre>
          </div>

          <div className="monthly-summary-modal__actions">
            <button
              className="monthly-summary-modal__button monthly-summary-modal__button--copy"
              onClick={handleCopy}
              disabled={isCopying}
              type="button"
            >
              {isCopying ? 'Copiando...' : copySuccess ? '✅ Copiado!' : '📋 Copiar Texto'}
            </button>

            {navigator.share && (
              <button
                className="monthly-summary-modal__button monthly-summary-modal__button--share"
                onClick={handleShare}
                type="button"
              >
                📤 Compartilhar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

MonthlySummaryModal.propTypes = {
  monthlyData: PropTypes.shape({
    incomes: PropTypes.number,
    expenses: PropTypes.number,
    savings: PropTypes.number,
    index: PropTypes.number,
  }).isRequired,
  goal: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};