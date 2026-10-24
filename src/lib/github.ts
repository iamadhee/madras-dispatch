/**
 * Star counts for project repositories, fetched once per build.
 * Uses GITHUB_TOKEN when present. Falls back to the count in the content file.
 */
const cache = new Map<string, Promise<number | undefined>>();

export function stars(repoUrl: string | undefined, fallback: number | undefined): Promise<number | undefined> {
  if (!repoUrl) return Promise.resolve(fallback);
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return Promise.resolve(fallback);
  const key = `${match[1]}/${match[2]}`;
  let p = cache.get(key);
  if (!p) {
    p = load(key, fallback);
    cache.set(key, p);
  }
  return p;
}

async function load(key: string, fallback: number | undefined): Promise<number | undefined> {
  const headers: Record<string, string> = { Accept: "application/vnd.github+json", "User-Agent": "the-adheeban-times" };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  try {
    const res = await fetch(`https://api.github.com/repos/${key}`, { headers, signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as { stargazers_count?: number };
    return typeof data.stargazers_count === "number" ? data.stargazers_count : fallback;
  } catch (error) {
    console.warn(`[github] ${key}: using fallback (${(error as Error).message})`);
    return fallback;
  }
}
