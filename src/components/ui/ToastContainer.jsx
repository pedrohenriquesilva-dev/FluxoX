import PropTypes from "prop-types";
import Icon from "./Icon.jsx";
import "./ToastContainer.css";

export default function ToastContainer({ toasts = [], onRemoveToast }) {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`toast toast--${toast.type}`}
          onClick={() => onRemoveToast?.(toast.id)}
          role="alert"
          aria-live="assertive"
        >
          <div className="toast__content">
            <Icon name={toast.type} className="toast__icon" />
            <span className="toast__message">{toast.message}</span>
          </div>
          <button
            className="toast__close"
            onClick={(e) => {
              e.stopPropagation();
              onRemoveToast?.(toast.id);
            }}
            type="button"
            aria-label="Fechar notificação"
          >
            <Icon name="close" />
          </button>
        </div>
      ))}
    </div>
  );
}

ToastContainer.propTypes = {
  toasts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["success", "error", "warning", "info"]).isRequired
  })),
  onRemoveToast: PropTypes.func
};