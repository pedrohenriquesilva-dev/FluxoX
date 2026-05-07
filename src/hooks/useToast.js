import { useCallback } from "react";
import { useToast as useToastContext } from "../contexts/ToastContext.jsx";

/**
 * Hook para mostrar notificações toast
 * @returns {Object} Funções para mostrar diferentes tipos de toast
 */
export default function useToast() {
  const { addToast } = useToastContext();

  const success = useCallback((message, duration) => {
    return addToast(message, "success", duration);
  }, [addToast]);

  const error = useCallback((message, duration) => {
    return addToast(message, "error", duration);
  }, [addToast]);

  const warning = useCallback((message, duration) => {
    return addToast(message, "warning", duration);
  }, [addToast]);

  const info = useCallback((message, duration) => {
    return addToast(message, "info", duration);
  }, [addToast]);

  return {
    success,
    error,
    warning,
    info
  };
}