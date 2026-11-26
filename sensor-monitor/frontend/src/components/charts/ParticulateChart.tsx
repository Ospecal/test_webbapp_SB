

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

interface ParticulateChartProps {
  readings: SensorReading[];
}

export default function ParticulateChart({
  readings,
}: ParticulateChartProps) {
  const data = [...readings]
    .filter(
      (reading) =>
        reading.pm25_ugm3 !== null || reading.pm10_ugm3 !== null
    )
    .sort(
      (a, b) =>
        new Date(a.measured_at).getTime() -
        new Date(b.measured_at).getTime()
    )
    .map((reading) => ({
      time: reading.measured_at,
      pm25: reading.pm25_ugm3,
      pm10: reading.pm10_ugm3,
    }));

  return (
    <section className="chart-card">
      <div className="chart-heading">
        <div>
          <h2>Particulate matter</h2>
          <p>Historical PM2.5 and PM10 concentrations</p>
        </div>
        <span className="chart-unit">µg/m³</span>
      </div>

      {data.length === 0 ? (
        <p className="chart-empty">
          No particulate matter data available.
        </p>
      ) : (
        <>
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
                  formatter={(value, name) => [
                    `${Number(value).toFixed(2)} µg/m³`,
                    name,
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="pm25"
                  name="PM2.5"
                  stroke="#16a36a"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="pm10"
                  name="PM10"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="chart-legend">
            <span>PM2.5</span>
            <span>PM10</span>
          </p>
        </>
      )}
    </section>
  );
}

