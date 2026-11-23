
interface Props {
  value: number | null;
}

export default function BatteryCard({ value }: Props) {
  return (
    <article className="metric-card">
      <div className="metric-heading">
        <span className="metric-icon battery-icon">⚡</span>
        <span className="metric-label">Battery</span>
      </div>

      <div className="metric-value">
        {value === null ? "--" : value.toFixed(1)}
        <span className="metric-unit">%</span>
      </div>

      <div className="battery-track">
        <div
          className="battery-fill"
          style={{
            width: `${Math.max(0, Math.min(100, value ?? 0))}%`,
          }}
        />
      </div>

      <p className="metric-description">Remaining battery level</p>
    </article>
  );
}

