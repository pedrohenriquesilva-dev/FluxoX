import { useState } from 'react';
import './ExportButton.css';

export default function ExportButton({ onExport, label = 'Exportar CSV', disabled = false }) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (disabled || isExporting) return;

    setIsExporting(true);
    try {
      await onExport();
    } catch (error) {
      console.error('Erro ao exportar:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      className={`export-button ${isExporting ? 'export-button--loading' : ''}`}
      onClick={handleExport}
      disabled={disabled || isExporting}
      type="button"
    >
      {isExporting ? (
        <>
          <span className="export-button__spinner" />
          Exportando...
        </>
      ) : (
        <>
          <svg
            className="export-button__icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7,10 12,15 17,10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          {label}
        </>
      )}
    </button>
  );
}