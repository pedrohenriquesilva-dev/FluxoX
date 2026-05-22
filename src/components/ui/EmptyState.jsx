import PropTypes from "prop-types";
import "./EmptyState.css";

export default function EmptyState({
  title = "Nada por aqui",
  description = "Adicione sua primeira transação ou ajuste os filtros para ver resultados.",
  actionText,
  actionHref,
  onAction,
}) {
  return (
    <section className="empty-state" aria-labelledby="empty-state-title">
      <div className="empty-state__card">
        <span className="empty-state__icon" aria-hidden="true">🧭</span>
        <div className="empty-state__content">
          <h2 id="empty-state-title" className="empty-state__title">
            {title}
          </h2>
          <p className="empty-state__description">{description}</p>
          {actionText && (actionHref || onAction) ? (
            actionHref ? (
              <a className="empty-state__action" href={actionHref}>
                {actionText}
              </a>
            ) : (
              <button className="empty-state__action" type="button" onClick={onAction}>
                {actionText}
              </button>
            )
          ) : null}
        </div>
      </div>
    </section>
  );
}

EmptyState.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  actionText: PropTypes.string,
  actionHref: PropTypes.string,
  onAction: PropTypes.func,
};
