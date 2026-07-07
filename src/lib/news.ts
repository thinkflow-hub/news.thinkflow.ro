import type { NewsItem, NewsData, Category } from "./types";

function newsDataUrl(date: string): string {
  return `/data/news/${date}.json`;
}

export async function getNewsByDate(date: string): Promise<NewsItem[]> {
  try {
    const res = await fetch(newsDataUrl(date));
    if (!res.ok) return [];
    const data: NewsData = await res.json();
    return data.items || [];
  } catch {
    return [];
  }
}

export async function getAllDates(): Promise<string[]> {
  try {
    const res = await fetch("/data/news/metadata.json");
    if (!res.ok) return [];
    const meta = await res.json();
    return meta.dates || [];
  } catch {
    return [];
  }
}

export async function getCategories(items: NewsItem[]): Promise<Category[]> {
  const cats = new Set<Category>();
  items.forEach((i) => cats.add(i.category));
  return Array.from(cats);
}

export function getItemsByCategory(items: NewsItem[], cat: Category | "all"): NewsItem[] {
  if (cat === "all") return items;
  return items.filter((i) => i.category === cat);
}

export function clusterItems(items: NewsItem[]): Map<string, NewsItem[]> {
  const map = new Map<string, NewsItem[]>();
  items.forEach((item) => {
    if (!item.cluster_id) return;
    const existing = map.get(item.cluster_id) || [];
    existing.push(item);
    map.set(item.cluster_id, existing);
  });
  return map;
}

export function sortByScore(items: NewsItem[]): NewsItem[] {
  return [...items].sort((a, b) => (b.score || 0) - (a.score || 0));
}

export function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return "";
  }
}

export function getItemsFromCluster(items: NewsItem[], clusterId: string): NewsItem[] {
  return items.filter((i) => i.cluster_id === clusterId);
}
