

import { useState } from "react";
import { useReadings } from "../hooks/useReadings";
import TemperatureChart from "../components/charts/TemperatureChart";
import HumidityChart from "../components/charts/HumidityChart";
import BatteryChart from "../components/charts/BatteryChart";
import MeasurementStats from "../components/MeasurementStats";
import LightChart from "../components/charts/LightChart";
import Co2Chart from "../components/charts/Co2Chart";
import TvocChart from "../components/charts/TvocChart";
import ParticulateChart from "../components/charts/ParticulateChart";

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
  const [selectedSensorId, setSelectedSensorId] = useState("");

  const availableSensorIds = Array.from(
  new Set(readings.map((reading) => reading.sensor_id))
  );


  const activeSensorId =
  selectedSensorId || readings[0]?.sensor_id || "";  

  const rangeInMilliseconds: Record<Exclude<TimeRange, "all">, number> = {
    "1h": 60 * 60 * 1000,
    "24h": 24 * 60 * 60 * 1000,
    "7d": 7 * 24 * 60 * 60 * 1000,
    "30d": 30 * 24 * 60 * 60 * 1000,
  };

  const sensorReadings = readings.filter(
    (reading) => reading.sensor_id === activeSensorId
  );

  const filteredReadings =
    selectedRange === "all"
      ? sensorReadings
      : sensorReadings.filter((reading) => {
          const measuredAt = new Date(reading.measured_at).getTime();
          const cutoff =
            Date.now() - rangeInMilliseconds[selectedRange];

          return Number.isFinite(measuredAt) && measuredAt >= cutoff;
        });

  const temperatureValues = filteredReadings
    .map((reading) => reading.temperature_c)
    .filter((value): value is number => value !== null);

  const humidityValues = filteredReadings
    .map((reading) => reading.humidity_pct)
    .filter((value): value is number => value !== null);

  const batteryValues = filteredReadings
    .map((reading) => reading.battery_pct)
    .filter((value): value is number => value !== null);

  const co2Values = filteredReadings
    .map((reading) => reading.co2_ppm)
    .filter((value): value is number => value !== null);

  const tvocValues = filteredReadings
    .map((reading) => reading.tvoc_ppb)
    .filter((value): value is number => value !== null);

  const pm25Values = filteredReadings
    .map((reading) => reading.pm25_ugm3)
    .filter((value): value is number => value !== null);

  const pm10Values = filteredReadings
    .map((reading) => reading.pm10_ugm3)
    .filter((value): value is number => value !== null); 
    

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
      
      {availableSensorIds.length > 1 && (
        <div className="time-range-section">
          <label className="time-range-label" htmlFor="sensor-select">
            Select sensor
          </label>

          <select
            id="sensor-select"
            className="time-range-button"
            value={activeSensorId}
            onChange={(event) => setSelectedSensorId(event.target.value)}
          >
            {availableSensorIds.map((sensorId) => (
              <option key={sensorId} value={sensorId}>
                {sensorId}
              </option>
            ))}
          </select>
        </div>
      )}      

      
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

            <MeasurementStats
              title="CO₂"
              unit="ppm"
              values={co2Values}
            />

            <MeasurementStats
              title="TVOC"
              unit="ppb"
              values={tvocValues}
            />

            <MeasurementStats
              title="PM2.5"
              unit="µg/m³"
              values={pm25Values}
            />

            <MeasurementStats
              title="PM10"
              unit="µg/m³"
              values={pm10Values}
            />
          </div>

          {/* <div className="charts-grid">
            <TemperatureChart readings={filteredReadings} />
            <HumidityChart readings={filteredReadings} />
            <BatteryChart readings={filteredReadings} />
            <LightChart readings={filteredReadings} />
            <Co2Chart readings={filteredReadings} />
            <TvocChart readings={filteredReadings} />
            <ParticulateChart readings={filteredReadings} />
          </div> */}

          <section className="insights-chart-section">
            <div className="section-heading">
              <div>
                <h2>Environment</h2>
                <p>Temperature, humidity and ambient light</p>
              </div>
            </div>

            <div className="charts-grid">
              <TemperatureChart readings={filteredReadings} />
              <HumidityChart readings={filteredReadings} />
              <LightChart readings={filteredReadings} />
            </div>
          </section>

          <section className="insights-chart-section">
            <div className="section-heading">
              <div>
                <h2>Air quality</h2>
                <p>Carbon dioxide, volatile compounds and particulate matter</p>
              </div>
            </div>

            <div className="charts-grid">
              <Co2Chart readings={filteredReadings} />
              <TvocChart readings={filteredReadings} />
              <ParticulateChart readings={filteredReadings} />
            </div>
          </section>

          <section className="insights-chart-section">
            <div className="section-heading">
              <div>
                <h2>Device</h2>
                <p>Battery performance over time</p>
              </div>
            </div>

            <div className="charts-grid">
              <BatteryChart readings={filteredReadings} />
            </div>
          </section>

        </>
      )}

      <p className="insights-footer">
        Historical data refreshes every 30 seconds.
      </p>
    </main>
  );
}

export default Insights;
