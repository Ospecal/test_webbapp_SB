
import { useEffect, useState } from "react";
import { getReadings } from "../services/sensorApi";
import type { SensorReading } from "../types/sensor";

export function useReadings() {
  const [readings, setReadings] = useState<SensorReading[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    let timer: ReturnType<typeof setTimeout>;

    async function updateReadings() {
      try {
        const result = await getReadings();

        if (active) {
          setReadings(result);
          setError(null);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load historical readings"
          );
        }
      } finally {
        if (active) {
          setLoading(false);
          timer = setTimeout(updateReadings, 30000);
        }
      }
    }

    updateReadings();

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, []);

  return { readings, loading, error };
}
