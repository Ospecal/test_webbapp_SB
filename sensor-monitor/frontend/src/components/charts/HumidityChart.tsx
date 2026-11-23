

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { SensorReading } from "../../types/sensor";

interface HumidityChartProps {
  readings: SensorReading[];
}

export default function HumidityChart({
  readings,
}: HumidityChartProps) {
  const data = [...readings]
    .sort(
      (a, b) =>
        new Date(a.measured_at).getTime() -
        new Date(b.measured_at).getTime()
    )
    .map((reading) => ({
      time: new Date(reading.measured_at).toLocaleString(),
      humidity: reading.humidity_pct,
    }));

  return (
    <section className="chart-card">
      <div className="chart-heading">
        <div>
          <h2>Humidity</h2>
          <p>Historical humidity readings</p>
        </div>
        <span className="chart-unit">%</span>
      </div>

      {data.length === 0 ? (
        <p className="chart-empty">No humidity data available.</p>
      ) : (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                tick={false}
                minTickGap={30}
              />
              <YAxis
                domain={[0, 100]}
                width={45}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="humidity"
                name="Humidity"
                stroke="#3988d6"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}

