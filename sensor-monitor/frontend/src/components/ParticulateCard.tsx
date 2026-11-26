
interface Props {
  pm25: number | null;
  pm10: number | null;
}

export default function ParticulateCard({ pm25, pm10 }: Props) {
  return (
    <article className="metric-card">
      <div className="metric-heading">
        <span className="metric-icon">PM</span>
        <span className="metric-label">Particulate matter</span>
      </div>

      <div className="metric-value">
        {pm25 === null ? "--" : pm25.toFixed(1)}
        <span className="metric-unit">µg/m³ PM2.5</span>
      </div>

      <div className="metric-value" style={{ fontSize: "20px", marginTop: "12px" }}>
        {pm10 === null ? "--" : pm10.toFixed(1)}
        <span className="metric-unit">µg/m³ PM10</span>
      </div>

      <p className="metric-description">Fine and coarse airborne particles</p>
    </article>
  );
}
