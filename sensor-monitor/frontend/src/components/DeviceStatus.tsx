
import type { SensorReading } from "../types/sensor";

interface Props {
  reading: SensorReading | null;
  error: string | null;
}

export default function DeviceStatus({ reading, error }: Props) {
  const measurementTime = reading
    ? new Date(reading.measured_at).getTime()
    : NaN;

  const ageSeconds = (Date.now() - measurementTime) / 1000;

  const online =
    !error &&
    reading !== null &&
    Number.isFinite(ageSeconds) &&
    ageSeconds >= -5 &&
    ageSeconds <= 60;

  const status = online
    ? "Online"
    : error
      ? "Connection error"
      : reading
        ? "Offline"
        : "Waiting for data";

  return (
    <article className="device-card">
      <div className="device-card-heading">
        <div>
          <p className="eyebrow">CONNECTED DEVICE</p>
          <h2>{reading?.sensor_id ?? "Sensor"}</h2>
        </div>

        <span className={`status-pill ${online ? "online" : "offline"}`}>
          <span className="status-dot" />
          {status}
        </span>
      </div>

      <div className="device-details">
        <div>
          <span className="detail-label">Last measurement</span>
          <strong>
            {reading
              ? new Date(reading.measured_at).toLocaleString()
              : "Not available"}
          </strong>
        </div>

        <div>
          <span className="detail-label">Reading ID</span>
          <strong>{reading?.id ?? "—"}</strong>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}
    </article>
  );
}
