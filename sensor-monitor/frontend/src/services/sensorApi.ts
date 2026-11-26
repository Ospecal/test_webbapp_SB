
import type { SensorReading } from "../types/sensor";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080";

const API_TOKEN = import.meta.env.VITE_API_TOKEN;

async function apiFetch(endpoint: string): Promise<Response> {
  return fetch(`${API_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
}


/**
 * Retrieves the latest reading for every sensor.
 * The API returns an array of readings.
 */
export async function getLatestReadings(): Promise<SensorReading[]> {
  const response = await apiFetch("/readings/latest");

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const readings: SensorReading[] = await response.json();

  return Array.isArray(readings) ? readings : [];
}

/**
 * Retrieves historical sensor readings.
 */

export async function getReadings(): Promise<SensorReading[]> {
  const pageSize = 1000;
  let offset = 0;
  let allReadings: SensorReading[] = [];

  while (true) {
    const response = await apiFetch(
      `/readings?limit=${pageSize}&offset=${offset}`
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const page: SensorReading[] = await response.json();

    allReadings = [...allReadings, ...page];

    if (page.length < pageSize) {
      break;
    }

    offset += pageSize;
  }

  return allReadings;
}
