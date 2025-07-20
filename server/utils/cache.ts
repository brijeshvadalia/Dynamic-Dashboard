const cache: Record<string, { data: any, timestamp: number }> = {};
const TTL = 60000; // 1 min

export function getCache(key: string) {
    const cached = cache[key];
    if (!cached) return null;
    if (Date.now() - cached.timestamp > TTL) return null;
    return cached.data;
}

export function setCache(key: string, data: any) {
    cache[key] = { data, timestamp: Date.now() };
}
