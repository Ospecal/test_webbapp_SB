

import { useReadings } from "../hooks/useReadings";
import TemperatureChart from "../components/charts/TemperatureChart";
import HumidityChart from "../components/charts/HumidityChart";
import BatteryChart from "../components/charts/BatteryChart";

export default function Insights() {
  const { readings, loading, error } = useReadings();

  return (
    <main className="insights-page">
      <div className="insights-intro">
        <div>
          <p className="eyebrow">HISTORICAL DATA</p>
          <h1>Insights</h1>
          <p className="insights-description">
            Explore temperature, humidity and battery levels over time.
          </p>
        </div>

        {!loading && !error && (
          <div className="readings-count">
            <strong>{readings.length}</strong>
            <span>Readings</span>
          </div>
        )}
      </div>

      {loading && (
        <p className="insights-message">Loading historical readings...</p>
      )}

      {error && (
        <p className="insights-error">
          Could not load historical readings: {error}
        </p>
      )}

      {!loading && !error && readings.length === 0 && (
        <p className="insights-message">
          No historical readings are available yet.
        </p>
      )}

      {!loading && !error && readings.length > 0 && (
        <div className="charts-grid">
          <TemperatureChart readings={readings} />
          <HumidityChart readings={readings} />
          <BatteryChart readings={readings} />
        </div>
      )}

      <p className="insights-footer">
        Historical data refreshes every 30 seconds.
      </p>
    </main>
  );
}

