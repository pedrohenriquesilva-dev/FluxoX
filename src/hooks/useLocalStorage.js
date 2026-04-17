import { useEffect, useState } from "react";

function resolveInitialValue(initialValue) {
  return typeof initialValue === "function" ? initialValue() : initialValue;
}

function readStorageValue(key, fallback) {
  if (typeof window === "undefined") return fallback;

  try {
    const stored = window.localStorage.getItem(key);
    if (stored === null) return fallback;
    return JSON.parse(stored);
  } catch {
    return fallback;
  }
}

/**
 * Persist a React state value in localStorage.
 *
 * @template T
 * @param {string} key localStorage key
 * @param {T | (() => T)} initialValue initial value or lazy initializer
 * @returns {[T, import("react").Dispatch<import("react").SetStateAction<T>>]}
 */
export default function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    const fallback = resolveInitialValue(initialValue);
    return readStorageValue(key, fallback);
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // Keep UI state usable even when storage is unavailable.
    }
  }, [key, state]);

  return [state, setState];
}
