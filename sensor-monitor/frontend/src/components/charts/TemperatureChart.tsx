

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
import { formatChartTime, formatTooltipTime } from "./chartUtils";

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
      time: reading.measured_at,
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
            <LineChart data={data} margin={{ top: 5, right: 15, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                tickFormatter={formatChartTime}
                minTickGap={35}
                tick={{ fontSize: 11 }}
              />
              <YAxis
                domain={["auto", "auto"]}
                width={45}
                tick={{ fontSize: 11 }}
              />
              <Tooltip
                labelFormatter={(value) =>
                  formatTooltipTime(String(value))
                }
                formatter={(value) => [
                  `${Number(value).toFixed(2)} °C`,
                  "Temperature",
                ]}
              />
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
