import { useState } from 'react';
import './PeriodFilter.css';

const PERIOD_OPTIONS = [
  { value: 'all', label: 'Todos os períodos' },
  { value: 'today', label: 'Hoje' },
  { value: 'week', label: 'Esta semana' },
  { value: 'month', label: 'Este mês' },
  { value: 'quarter', label: 'Este trimestre' },
  { value: 'year', label: 'Este ano' },
  { value: 'custom', label: 'Período personalizado' }
];

export default function PeriodFilter({ onPeriodChange, currentPeriod = 'month' }) {
  const [customDates, setCustomDates] = useState({ startDate: '', endDate: '' });

  const handlePeriodChange = (newPeriod) => {
    onPeriodChange(newPeriod, customDates);
  };

  const handleCustomDateChange = (field, value) => {
    const updated = { ...customDates, [field]: value };
    setCustomDates(updated);
    if (updated.startDate && updated.endDate) {
      onPeriodChange('custom', updated);
    }
  };

  return (
    <div className="period-filter">
      <div className="period-filter__buttons">
        {PERIOD_OPTIONS.map((option) => (
          <button
            key={option.value}
            className={`period-filter__button ${
              currentPeriod === option.value ? 'period-filter__button--active' : ''
            }`}
            onClick={() => handlePeriodChange(option.value)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>

      {currentPeriod === 'custom' && (
        <div className="period-filter__custom">
          <div className="period-filter__input-group">
            <label htmlFor="start-date">De:</label>
            <input
              id="start-date"
              type="date"
              value={customDates.startDate}
              onChange={(e) => handleCustomDateChange('startDate', e.target.value)}
              className="period-filter__input"
            />
          </div>
          <div className="period-filter__input-group">
            <label htmlFor="end-date">Até:</label>
            <input
              id="end-date"
              type="date"
              value={customDates.endDate}
              onChange={(e) => handleCustomDateChange('endDate', e.target.value)}
              className="period-filter__input"
            />
          </div>
        </div>
      )}
    </div>
  );
}