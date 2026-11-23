
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
 * Retrieves the latest sensor reading.
 * The API returns an array, even for the latest endpoint.
 */
export async function getLatestReading(): Promise<SensorReading | null> {
  const response = await apiFetch("/readings/latest");

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const readings: SensorReading[] = await response.json();

  return readings.length > 0 ? readings[0] : null;
}

/**
 * Retrieves historical sensor readings.
 */
export async function getReadings(): Promise<SensorReading[]> {
  const response = await apiFetch("/readings/");

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}
