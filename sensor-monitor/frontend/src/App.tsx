
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Insights from "./pages/Insights";
import DashboardHeader from "./components/DashboardHeader";
import { useTheme } from "./hooks/useTheme";

type Page = "dashboard" | "insights";

function App() {
  const { theme, toggleTheme } = useTheme();
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");

  return (
    <div className="app-shell" data-theme={theme}>
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon">S</span>
          <span>Sensor Monitor</span>
        </div>

        <nav className="sidebar-nav">
          <p className="nav-heading">WORKSPACE</p>

          <a
            className={`nav-link ${currentPage === "dashboard" ? "active" : ""}`}
            href="#dashboard"
            onClick={() => setCurrentPage("dashboard")}
          >
            <span>▦</span>
            Dashboard
          </a>

          <a
            className={`nav-link ${currentPage === "insights" ? "active" : ""}`}
            href="#insights"
            onClick={() => setCurrentPage("insights")}
          >
            <span>▥</span>
            Insights
          </a>

          <a className="nav-link" href="#devices">
            <span>◉</span>
            Devices
          </a>

          <a className="nav-link" href="#events">
            <span>◷</span>
            Events
          </a>
        </nav>

        <div className="sidebar-footer">
          <span className="sidebar-footer-icon">●</span>
          Sensor monitoring system
          <span className="version-label">Version 1.0</span>
        </div>
      </aside>

      <main className="main-area">
        <DashboardHeader
          title={currentPage === "dashboard" ? "Dashboard" : "Insights"}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {currentPage === "dashboard" && <Dashboard />}
        {currentPage === "insights" && <Insights />}
      </main>
    </div>
  );
}

export default App;
