

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

interface TemperatureChartProps {
  readings: SensorReading[];
}

export default function TemperatureChart({
  readings,
}: TemperatureChartProps) {
  const data = [...readings]
    .sort(
      (a, b) =>
        new Date(a.measured_at).getTime() -
        new Date(b.measured_at).getTime()
    )
    .map((reading) => ({
      time: new Date(reading.measured_at).toLocaleString(),
      temperature: reading.temperature_c,
    }));

  return (
    <section className="chart-card">
      <div className="chart-heading">
        <div>
          <h2>Temperature</h2>
          <p>Historical temperature readings</p>
        </div>
        <span className="chart-unit">°C</span>
      </div>

      {data.length === 0 ? (
        <p className="chart-empty">No temperature data available.</p>
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
                domain={["auto", "auto"]}
                width={45}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="temperature"
                name="Temperature"
                stroke="#16a36a"
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

