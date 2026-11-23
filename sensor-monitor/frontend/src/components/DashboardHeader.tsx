

import type { Theme } from "../hooks/useTheme";

interface DashboardHeaderProps {
  title: string;
  theme: Theme;
  onToggleTheme: () => void;
}

export default function DashboardHeader({
  title,
  theme,
  onToggleTheme,
}: DashboardHeaderProps) {
  return (
    <header className="dashboard-header">
      <div>
        <p className="eyebrow">SENSOR MONITORING</p>
        <h1>{title}</h1>
      </div>

      <div className="header-actions">
        <span className="header-label">
          {theme === "light" ? "Light mode" : "Dark mode"}
        </span>

        <button
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          title="Switch theme"
        >
          {theme === "light" ? "☾" : "☀"}
        </button>
      </div>
    </header>
  );
}

