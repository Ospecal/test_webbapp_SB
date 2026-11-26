

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

interface Co2ChartProps {
  readings: SensorReading[];
}

export default function Co2Chart({ readings }: Co2ChartProps) {
  const data = [...readings]
    .filter((reading) => reading.co2_ppm !== null)
    .sort(
      (a, b) =>
        new Date(a.measured_at).getTime() -
        new Date(b.measured_at).getTime()
    )
    .map((reading) => ({
      time: reading.measured_at,
      co2: reading.co2_ppm,
    }));

  return (
    <section className="chart-card">
      <div className="chart-heading">
        <div>
          <h2>Carbon dioxide</h2>
          <p>Historical CO₂ concentration</p>
        </div>
        <span className="chart-unit">ppm</span>
      </div>

      {data.length === 0 ? (
        <p className="chart-empty">No CO₂ data available.</p>
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
                  `${Number(value).toFixed(0)} ppm`,
                  "CO₂",
                ]}
              />
              <Line
                type="monotone"
                dataKey="co2"
                name="CO₂"
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

