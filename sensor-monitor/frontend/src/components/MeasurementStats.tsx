

interface MeasurementStatsProps {
  title: string;
  unit: string;
  values: number[];
}

export default function MeasurementStats({
  title,
  unit,
  values,
}: MeasurementStatsProps) {
  const minimum = Math.min(...values);
  const maximum = Math.max(...values);
  const average =
    values.reduce((sum, value) => sum + value, 0) / values.length;

  return (
    <section className="measurement-stats">
      <h2>{title}</h2>

      <div className="stats-values">
        <div>
          <span>Minimum</span>
          <strong>{minimum.toFixed(2)} {unit}</strong>
        </div>

        <div>
          <span>Average</span>
          <strong>{average.toFixed(2)} {unit}</strong>
        </div>

        <div>
          <span>Maximum</span>
          <strong>{maximum.toFixed(2)} {unit}</strong>
        </div>
      </div>
    </section>
  );
}

