
export interface SensorReading {
  id: number;
  sensor_id: string;
  measured_at: string;
  temperature_c: number;
  humidity_pct: number;
  battery_pct: number;
  created_at: string;
}
