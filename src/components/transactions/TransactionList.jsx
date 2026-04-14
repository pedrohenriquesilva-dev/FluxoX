import Icon from "../ui/Icon.jsx";
import PropTypes from "prop-types";
import { transactionShape } from "../../utils/propTypes.js";
import { fmt, formatDate } from "../../utils/formatters.js";
import "./TransactionList.css";

export default function TransactionList({ items = [], onEdit, onDelete }) {
  return (
    <section className="transaction-list">
      <header className="transaction-list__header">
        <h2 className="transaction-list__title">Transacoes</h2>
        <span className="transaction-list__count">{items.length} itens</span>
      </header>

      {items.length === 0 ? (
        <p className="transaction-list__empty text-muted">Nenhuma transacao cadastrada.</p>
      ) : (
        <ul className="transaction-list__items">
          {items.map((item) => (
            <li className="transaction-list__item" key={item.id}>
              <div className="transaction-list__main">
                <p className="transaction-list__description">{item.description}</p>
                <p className="transaction-list__meta text-muted">
                  {item.category} • {item.method} • {formatDate(item.date)}
                </p>
              </div>

              <div className="transaction-list__right">
                <strong
                  className={
                    item.type === "income"
                      ? "transaction-list__value text-success"
                      : "transaction-list__value text-danger"
                  }
                >
                  {fmt(item.value)}
                </strong>
                <div className="transaction-list__actions">
                  <button
                    className="transaction-list__btn"
                    type="button"
                    onClick={() => onEdit?.(item)}
                  >
                    <Icon name="settings" /> Editar
                  </button>
                  <button
                    className="transaction-list__btn transaction-list__btn--danger"
                    type="button"
                    onClick={() => onDelete?.(item.id)}
                  >
                    <Icon name="close" /> Excluir
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

TransactionList.propTypes = {
  items: PropTypes.arrayOf(transactionShape),
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};
