interface Props {
  value: boolean | null;
}

export default function PirCard({ value }: Props) {
  return (
    <article className="metric-card">
      <div className="metric-heading">
        <span className="metric-icon">◉</span>
        <span className="metric-label">Motion</span>
      </div>

      <div className="metric-value">
        {value === null ? "--" : value ? "Detected" : "None"}
      </div>

      <p className="metric-description">Passive infrared motion detection</p>
    </article>
  );
}