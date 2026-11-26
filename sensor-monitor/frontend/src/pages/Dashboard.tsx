

import { useState } from "react";
import TemperatureCard from "../components/TemperatureCard";
import HumidityCard from "../components/HumidityCard";
import BatteryCard from "../components/BatteryCard";
import LightCard from "../components/LightCard";
import PirCard from "../components/PirCard";
import Co2Card from "../components/Co2Card";
import TvocCard from "../components/TvocCard";
import PressureCard from "../components/PressureCard";
import ParticulateCard from "../components/ParticulateCard";
import DeviceStatus from "../components/DeviceStatus";
import { useLatestReading } from "../hooks/useLatestReading";

export default function Dashboard() {
  const [selectedSensorId, setSelectedSensorId] = useState("");

  const {
    reading,
    readings,
    loading,
    error,
  } = useLatestReading(selectedSensorId || undefined);

  const availableSensorIds = Array.from(
    new Set(readings.map((item) => item.sensor_id))
  );

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

      {availableSensorIds.length > 0 && (
        <section className="section-heading">
          <div>
            <h2>Select sensor</h2>
            <select
              className="time-range-button"
              value={selectedSensorId || availableSensorIds[0]}
              onChange={(event) => setSelectedSensorId(event.target.value)}
            >
              {availableSensorIds.map((sensorId) => (
                <option key={sensorId} value={sensorId}>
                  {sensorId}
                </option>
              ))}
            </select>
          </div>
        </section>
      )}

      {loading && !reading && (
        <p className="loading-message">Loading sensor measurements...</p>
      )}

      <section className="metrics-grid">
        <TemperatureCard value={reading?.temperature_c ?? null} />
        <HumidityCard value={reading?.humidity_pct ?? null} />
        <BatteryCard value={reading?.battery_pct ?? null} />
        <LightCard value={reading?.light_lux ?? null} />
        <PirCard value={reading?.pir ?? null} />
        <Co2Card value={reading?.co2_ppm ?? null} />
        <TvocCard value={reading?.tvoc_ppb ?? null} />
        <PressureCard value={reading?.pressure_hpa ?? null} />
        <ParticulateCard
          pm25={reading?.pm25_ugm3 ?? null}
          pm10={reading?.pm10_ugm3 ?? null}
        />
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
