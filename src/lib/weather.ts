import { site } from "../site";

/**
 * Today's weather for the ear, fetched once per build from Open-Meteo.
 * Falls back to the static copy in site.ts when the network is unavailable.
 */
export interface Weather {
  place: string;
  summary: string;
  high: string;
  low: string;
  /** Local clock times, such as "6.00am". Only a live fetch has them. */
  sunrise?: string;
  sunset?: string;
  live: boolean;
}

const CODES: Array<[number[], string]> = [
  [[0], "Clear"],
  [[1, 2], "Mostly clear"],
  [[3], "Overcast"],
  [[45, 48], "Fog"],
  [[51, 53, 55, 56, 57], "Drizzle"],
  [[61, 63, 65, 66, 67], "Rain"],
  [[71, 73, 75, 77], "Snow, improbably"],
  [[80, 81, 82], "Showers"],
  [[85, 86], "Snow showers, improbably"],
  [[95, 96, 99], "Thunderstorms"],
];

/** "2026-10-24T17:45" to "5.45pm", the way a British paper prints the time. */
function clock(iso: string): string {
  const [h, m] = iso.slice(11, 16).split(":").map(Number);
  return `${h % 12 || 12}.${String(m).padStart(2, "0")}${h < 12 ? "am" : "pm"}`;
}

function describe(code: number): string {
  return CODES.find(([codes]) => codes.includes(code))?.[1] ?? "Weather";
}

const fallback: Weather = { ...site.weather, live: false };

let cached: Promise<Weather> | undefined;

export function weather(): Promise<Weather> {
  cached ??= load();
  return cached;
}

async function load(): Promise<Weather> {
  const { lat, lon, timezone } = site.weather.coords;
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.search = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    daily: "temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code,sunrise,sunset",
    timezone,
    forecast_days: "1",
  }).toString();
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as {
      daily: { temperature_2m_max: number[]; temperature_2m_min: number[]; precipitation_probability_max: number[]; weather_code: number[]; sunrise: string[]; sunset: string[] };
    };
    const d = data.daily;
    const rain = d.precipitation_probability_max[0];
    const summary = `${describe(d.weather_code[0])}. Chance of rain, ${rain} per cent. Chance of a deploy, moderate.`;
    return {
      place: site.weather.place,
      summary,
      high: `${Math.round(d.temperature_2m_max[0])}°`,
      low: `${Math.round(d.temperature_2m_min[0])}°`,
      sunrise: clock(d.sunrise[0]),
      sunset: clock(d.sunset[0]),
      live: true,
    };
  } catch (error) {
    console.warn(`[weather] using fallback: ${(error as Error).message}`);
    return fallback;
  }
}
