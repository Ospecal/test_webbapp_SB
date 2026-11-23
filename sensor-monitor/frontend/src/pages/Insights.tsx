

import { useState } from "react";
import { useReadings } from "../hooks/useReadings";
import TemperatureChart from "../components/charts/TemperatureChart";
import HumidityChart from "../components/charts/HumidityChart";
import BatteryChart from "../components/charts/BatteryChart";
import MeasurementStats from "../components/MeasurementStats";

type TimeRange = "1h" | "24h" | "7d" | "30d" | "all";

const timeRanges: { label: string; value: TimeRange }[] = [
  { label: "1 hour", value: "1h" },
  { label: "24 hours", value: "24h" },
  { label: "7 days", value: "7d" },
  { label: "30 days", value: "30d" },
  { label: "All data", value: "all" },
];

function Insights() {
  const { readings, loading, error } = useReadings();
  const [selectedRange, setSelectedRange] = useState<TimeRange>("24h");

  const rangeInMilliseconds: Record<Exclude<TimeRange, "all">, number> = {
    "1h": 60 * 60 * 1000,
    "24h": 24 * 60 * 60 * 1000,
    "7d": 7 * 24 * 60 * 60 * 1000,
    "30d": 30 * 24 * 60 * 60 * 1000,
  };

  const filteredReadings =
    selectedRange === "all"
      ? readings
      : readings.filter((reading) => {
          const measuredAt = new Date(reading.measured_at).getTime();
          const cutoff =
            Date.now() - rangeInMilliseconds[selectedRange];

          return Number.isFinite(measuredAt) && measuredAt >= cutoff;
        });

  const temperatureValues = filteredReadings.map(
    (reading) => reading.temperature_c
  );

  const humidityValues = filteredReadings.map(
    (reading) => reading.humidity_pct
  );

  const batteryValues = filteredReadings.map(
    (reading) => reading.battery_pct
  );

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
            <strong>{filteredReadings.length}</strong>
            <span>Readings</span>
          </div>
        )}
      </div>

      <div className="time-range-section">
        <span className="time-range-label">Time range</span>

        <div className="time-range-buttons">
          {timeRanges.map((range) => (
            <button
              key={range.value}
              type="button"
              className={`time-range-button ${
                selectedRange === range.value ? "active" : ""
              }`}
              onClick={() => setSelectedRange(range.value)}
              aria-pressed={selectedRange === range.value}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <p className="insights-message">Loading historical readings...</p>
      )}

      {error && (
        <p className="insights-error">
          Could not load historical readings: {error}
        </p>
      )}

      {!loading && !error && filteredReadings.length === 0 && (
        <p className="insights-message">
          No readings found for this time range. Try selecting a longer period.
        </p>
      )}

      {!loading && !error && filteredReadings.length > 0 && (
        <>
          <div className="stats-grid">
            <MeasurementStats
              title="Temperature"
              unit="°C"
              values={temperatureValues}
            />

            <MeasurementStats
              title="Humidity"
              unit="%"
              values={humidityValues}
            />

            <MeasurementStats
              title="Battery"
              unit="%"
              values={batteryValues}
            />
          </div>

          <div className="charts-grid">
            <TemperatureChart readings={filteredReadings} />
            <HumidityChart readings={filteredReadings} />
            <BatteryChart readings={filteredReadings} />
          </div>
        </>
      )}

      <p className="insights-footer">
        Historical data refreshes every 30 seconds.
      </p>
    </main>
  );
}

export default Insights;
