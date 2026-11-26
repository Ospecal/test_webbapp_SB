
interface Props {
  value: number | null;
}

export default function LightCard({ value }: Props) {
  return (
    <article className="metric-card">
      <div className="metric-heading">
        <span className="metric-icon">☀</span>
        <span className="metric-label">Light</span>
      </div>

      <div className="metric-value">
        {value === null ? "--" : value.toFixed(1)}
        <span className="metric-unit">lux</span>
      </div>

      <p className="metric-description">Ambient light intensity</p>
    </article>
  );
}
