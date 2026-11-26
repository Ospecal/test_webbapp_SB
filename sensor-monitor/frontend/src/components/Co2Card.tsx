
interface Props {
  value: number | null;
}

export default function Co2Card({ value }: Props) {
  return (
    <article className="metric-card">
      <div className="metric-heading">
        <span className="metric-icon">CO₂</span>
        <span className="metric-label">Carbon dioxide</span>
      </div>

      <div className="metric-value">
        {value === null ? "--" : value.toFixed(0)}
        <span className="metric-unit">ppm</span>
      </div>

      <p className="metric-description">Indoor CO₂ concentration</p>
    </article>
  );
}
