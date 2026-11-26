
interface Props {
  value: number | null;
}

export default function TvocCard({ value }: Props) {
  return (
    <article className="metric-card">
      <div className="metric-heading">
        <span className="metric-icon">VOC</span>
        <span className="metric-label">Total VOC</span>
      </div>

      <div className="metric-value">
        {value === null ? "--" : value.toFixed(0)}
        <span className="metric-unit">ppb</span>
      </div>

      <p className="metric-description">Total volatile organic compounds</p>
    </article>
  );
}

