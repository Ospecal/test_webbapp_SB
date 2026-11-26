
interface Props {
  value: number | null;
}

export default function PressureCard({ value }: Props) {
  return (
    <article className="metric-card">
      <div className="metric-heading">
        <span className="metric-icon">↗</span>
        <span className="metric-label">Air pressure</span>
      </div>

      <div className="metric-value">
        {value === null ? "--" : value.toFixed(1)}
        <span className="metric-unit">hPa</span>
      </div>

      <p className="metric-description">Atmospheric pressure</p>
    </article>
  );
}
