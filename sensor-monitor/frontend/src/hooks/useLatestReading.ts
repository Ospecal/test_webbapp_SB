
import { useEffect, useState } from "react";
import { getLatestReading } from "../services/sensorApi";
import type { SensorReading } from "../types/sensor";

export function useLatestReading() {
  const [reading, setReading] = useState<SensorReading | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    let timer: ReturnType<typeof setTimeout>;

    async function updateReading() {
      try {
        const result = await getLatestReading();

        if (active) {
          setReading(result);
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
          timer = setTimeout(updateReading, 10000);
        }
      }
    }

    updateReading();

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, []);

  return { reading, loading, error };
}
