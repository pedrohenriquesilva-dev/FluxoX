import { useEffect } from "react";
import Icon from "./Icon.jsx";
import "./Modal.css";

export default function Modal({ open, title, children, onClose, actions }) {
  useEffect(() => {
    if (!open) return undefined;

    function onEsc(event) {
      if (event.key === "Escape") onClose?.();
    }

    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={title}>
      <button className="modal__backdrop" type="button" onClick={onClose} />
      <section className="modal__panel">
        <header className="modal__header">
          <h2 className="modal__title">{title}</h2>
          <button className="modal__close" type="button" onClick={onClose}>
            <Icon name="close" />
          </button>
        </header>
        <div className="modal__content">{children}</div>
        {actions ? <footer className="modal__footer">{actions}</footer> : null}
      </section>
    </div>
  );
}
