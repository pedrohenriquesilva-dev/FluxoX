import { useState, useEffect } from "react";

/**
 * Hook para simular estado de loading na primeira renderização
 * Útil para mostrar skeletons enquanto os dados são calculados
 */
export default function useLoading(delay = 1500) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return isLoading;
}