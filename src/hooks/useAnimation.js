import { useState, useEffect } from 'react';

/**
 * Hook personalizado para controlar animações de entrada
 * @param {number} staggerDelay - Delay entre elementos em ms (para stagger)
 * @param {boolean} trigger - Se deve iniciar a animação
 * @returns {Object} { isVisible, staggerStyle }
 */
export function useAnimation(staggerDelay = 100, trigger = true) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!trigger) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Pequeno delay inicial

    return () => clearTimeout(timer);
  }, [trigger]);

  const staggerStyle = (index) => ({
    '--stagger-index': index,
    animationDelay: `${index * staggerDelay}ms`
  });

  return { isVisible, staggerStyle };
}

/**
 * Hook para animação baseada em scroll (Intersection Observer)
 * @param {Object} options - Opções do IntersectionObserver
 * @returns {Object} { ref, isVisible }
 */
export function useScrollAnimation(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Para de observar após primeira interseção
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    );

    observer.observe(ref);

    return () => observer.disconnect();
  }, [ref, options]);

  return { ref: setRef, isVisible };
}