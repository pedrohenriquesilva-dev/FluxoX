import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { fmt } from "../../utils/formatters.js";
import useGlobalSearch from "../../hooks/useGlobalSearch.js";
import "./GlobalSearch.css";

export default function GlobalSearch({
  expenses = [],
  incomes = [],
  onSelectTransaction = null
}) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const results = useGlobalSearch(expenses, incomes, query);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelectResult(transaction) {
    onSelectTransaction?.(transaction);
    setQuery("");
    setIsOpen(false);
  }

  function handleKeyDown(event) {
    if (event.key === "Escape") {
      setIsOpen(false);
      setQuery("");
    }
  }

  return (
    <div className="global-search" ref={containerRef}>
      <div className="global-search__input-wrapper">
        <span className="global-search__icon">🔍</span>
        <input
          ref={inputRef}
          type="text"
          className="global-search__input"
          placeholder="Buscar lançamentos..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          aria-label="Buscar lançamentos"
          aria-expanded={isOpen}
          aria-controls="search-results"
        />
        {query && (
          <button
            className="global-search__clear"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            type="button"
            aria-label="Limpar busca"
          >
            ✕
          </button>
        )}
      </div>

      {isOpen && query.trim() && (
        <div className="global-search__results" id="search-results" role="listbox">
          {results.length > 0 ? (
            <ul className="global-search__list">
              {results.map((transaction, idx) => (
                <li key={`${transaction.id}-${idx}`} role="option">
                  <button
                    className="global-search__result-item"
                    onClick={() => handleSelectResult(transaction)}
                    type="button"
                  >
                    <div className="global-search__result-header">
                      <span className="global-search__result-icon">
                        {transaction.type === "expense" ? "💸" : "💰"}
                      </span>
                      <div className="global-search__result-main">
                        <span className="global-search__result-description">
                          {transaction.description}
                        </span>
                        <span className="global-search__result-meta">
                          {transaction.category} • {transaction.method}
                        </span>
                      </div>
                      <span className={`global-search__result-value ${
                        transaction.type === "expense" ? "text-danger" : "text-success"
                      }`}>
                        {transaction.type === "expense" ? "-" : "+"} {fmt(transaction.value)}
                      </span>
                    </div>
                    <div className="global-search__result-footer">
                      <span className={`global-search__result-badge ${transaction.type}`}>
                        {transaction.displayType}
                      </span>
                      <span className="global-search__result-date">
                        {new Date(transaction.date).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="global-search__empty">
              <span className="global-search__empty-icon">🚫</span>
              <p>Nenhum resultado encontrado para "{query}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

GlobalSearch.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  incomes: PropTypes.arrayOf(PropTypes.object),
  onSelectTransaction: PropTypes.func
};