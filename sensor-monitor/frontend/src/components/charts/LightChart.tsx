
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

interface LightChartProps {
  readings: SensorReading[];
}

export default function LightChart({ readings }: LightChartProps) {
  const data = [...readings]
    .filter((reading) => reading.light_lux !== null)
    .sort(
      (a, b) =>
        new Date(a.measured_at).getTime() -
        new Date(b.measured_at).getTime()
    )
    .map((reading) => ({
      time: reading.measured_at,
      light: reading.light_lux,
    }));

  return (
    <section className="chart-card">
      <div className="chart-heading">
        <div>
          <h2>Light intensity</h2>
          <p>Historical ambient light readings</p>
        </div>
        <span className="chart-unit">lux</span>
      </div>

      {data.length === 0 ? (
        <p className="chart-empty">No light data available.</p>
      ) : (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 15, bottom: 5, left: 0 }}
            >
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
                  `${Number(value).toFixed(2)} lux`,
                  "Light intensity",
                ]}
              />
              <Line
                type="monotone"
                dataKey="light"
                name="Light intensity"
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
