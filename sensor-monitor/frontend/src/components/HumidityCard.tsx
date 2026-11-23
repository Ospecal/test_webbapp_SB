
interface Props {
  value: number | null;
}

export default function HumidityCard({ value }: Props) {
  return (
    <article className="metric-card">
      <div className="metric-heading">
        <span className="metric-icon humidity-icon">%</span>
        <span className="metric-label">Humidity</span>
      </div>

      <div className="metric-value">
        {value === null ? "--" : value.toFixed(1)}
        <span className="metric-unit">%</span>
      </div>

      <p className="metric-description">Relative humidity</p>
    </article>
  );
}
