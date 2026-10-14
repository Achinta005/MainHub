"use client";

import { useEffect } from "react";

/**
 * Completely headless & hidden system theme synchronizer.
 * Automatically detects the user's OS color scheme (Dark / Light)
 * and dynamically adapts the DOM without showing any options or toggles.
 */
export default function SystemThemeSynchronizer() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (isDark: boolean) => {
      const root = document.documentElement;
      if (isDark) {
        root.classList.add("dark");
        root.classList.remove("light");
        root.style.colorScheme = "dark";
      } else {
        root.classList.remove("dark");
        root.classList.add("light");
        root.style.colorScheme = "light";
      }
    };

    // Apply immediate system theme on load
    applyTheme(mediaQuery.matches);

    // Automatically listen to OS theme switch events (e.g. sunrise/sunset or OS toggle)
    const handleChange = (e: MediaQueryListEvent) => {
      applyTheme(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return null;
}
