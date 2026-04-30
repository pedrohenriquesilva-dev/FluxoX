import { useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../utils/storage.js';

/**
 * Hook customizado para gerenciar tema claro/escuro
 * Persiste a preferência do usuário em localStorage
 * @returns {Object} { isDark, toggleTheme }
 */
export default function useTheme() {
  const [isDark, setIsDark] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carrega preferência salva ao montar o componente
  useEffect(() => {
    const savedTheme = localStorage.getItem('THEME_PREFERENCE');
    if (savedTheme !== null) {
      setIsDark(savedTheme === 'dark');
    } else {
      // Se não há preferência salva, usa preferência do sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
    }
    setIsLoaded(true);
  }, []);

  // Aplica o tema ao documento
  useEffect(() => {
    if (!isLoaded) return;

    const root = document.documentElement;
    if (isDark) {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('THEME_PREFERENCE', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('THEME_PREFERENCE', 'light');
    }
  }, [isDark, isLoaded]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return { isDark, toggleTheme, isLoaded };
}