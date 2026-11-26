
// export interface SensorReading {
//   id: number;
//   sensor_id: string;
//   measured_at: string;
//   temperature_c: number;
//   humidity_pct: number;
//   battery_pct: number;
//   created_at: string;
// }


export interface SensorReading {
  id: number;
  sensor_id: string;
  measured_at: string;

  // Environmental measurements
  temperature_c: number | null;
  humidity_pct: number | null;
  light_lux: number | null;
  pir: boolean | null;

  // Air quality
  co2_ppm: number | null;
  tvoc_ppb: number | null;
  pm25_ugm3: number | null;
  pm10_ugm3: number | null;

  // Other measurements
  pressure_hpa: number | null;
  battery_pct: number | null;

  created_at: string;
}
