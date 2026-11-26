
import { useEffect, useState } from "react";
import { getLatestReadings } from "../services/sensorApi";
import type { SensorReading } from "../types/sensor";

export function useLatestReading(sensorId?: string) {
  const [readings, setReadings] = useState<SensorReading[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    let timer: ReturnType<typeof setTimeout>;

    async function updateReadings() {
      try {
        const result = await getLatestReadings();

        if (active) {
          setReadings(result);
          setError(null);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to connect to sensor API"
          );
        }
      } finally {
        if (active) {
          setLoading(false);
          timer = setTimeout(updateReadings, 10000);
        }
      }
    }

    updateReadings();

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, []);

  const selectedReading =
    readings.find((reading) => reading.sensor_id === sensorId) ??
    (!sensorId ? readings[0] ?? null : null);

  return {
    reading: selectedReading,
    readings,
    loading,
    error,
  };
}

