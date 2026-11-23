
interface Props {
  value: number | null;
}

export default function TemperatureCard({ value }: Props) {
  return (
    <article className="metric-card">
      <div className="metric-heading">
        <span className="metric-icon temperature-icon">°C</span>
        <span className="metric-label">Temperature</span>
      </div>

      <div className="metric-value">
        {value === null ? "--" : value.toFixed(1)}
        <span className="metric-unit">°C</span>
      </div>

      <p className="metric-description">Latest measurement</p>
    </article>
  );
}
