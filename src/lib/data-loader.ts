import fs from "fs";
import path from "path";
import type { NewsItem, NewsData, Metadata, Category } from "./types";

const DATA_DIR = path.join(process.cwd(), "public", "data", "news");

export function readNewsFile(date: string): NewsItem[] {
  try {
    const filePath = path.join(DATA_DIR, `${date}.json`);
    if (!fs.existsSync(filePath)) return [];
    const raw = fs.readFileSync(filePath, "utf-8");
    const data: NewsData = JSON.parse(raw);
    return data.items || [];
  } catch {
    return [];
  }
}

export function readMetadata(): Metadata | null {
  try {
    const filePath = path.join(DATA_DIR, "metadata.json");
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function getAllDates(): string[] {
  const meta = readMetadata();
  if (meta?.dates?.length) return meta.dates;

  try {
    if (!fs.existsSync(DATA_DIR)) return [];
    const files = fs.readdirSync(DATA_DIR);
    return files
      .filter((f) => f.endsWith(".json") && f !== "metadata.json")
      .map((f) => f.replace(".json", ""))
      .sort()
      .reverse();
  } catch {
    return [];
  }
}

export function getLatestDate(): string | null {
  const dates = getAllDates();
  return dates.length > 0 ? dates[0] : null;
}
