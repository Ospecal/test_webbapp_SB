
import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("sensor-dashboard-theme");

    return savedTheme === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    localStorage.setItem("sensor-dashboard-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  }

  return { theme, toggleTheme };
}
