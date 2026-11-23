
import TemperatureCard from "../components/TemperatureCard";
import HumidityCard from "../components/HumidityCard";
import BatteryCard from "../components/BatteryCard";
import DeviceStatus from "../components/DeviceStatus";
import { useLatestReading } from "../hooks/useLatestReading";

export default function Dashboard() {
  const { reading, loading, error } = useLatestReading();

  return (
    <div className="dashboard-content">
      <section className="welcome-section">
        <div>
          <h2>Environmental overview</h2>
          <p>Monitor your sensor's latest measurements.</p>
        </div>

        <span className="refresh-label">
          <span className="refresh-dot" />
          Updates every 10 seconds
        </span>
      </section>

      {loading && !reading && (
        <p className="loading-message">Loading sensor measurements...</p>
      )}

      <section className="metrics-grid">
        <TemperatureCard value={reading?.temperature_c ?? null} />
        <HumidityCard value={reading?.humidity_pct ?? null} />
        <BatteryCard value={reading?.battery_pct ?? null} />
      </section>

      <section className="section-heading">
        <div>
          <h2>Device information</h2>
          <p>Connection and measurement details</p>
        </div>
      </section>

      <DeviceStatus reading={reading} error={error} />

      {!loading && !reading && !error && (
        <p className="empty-message">
          No sensor readings have been received yet.
        </p>
      )}
    </div>
  );
}
