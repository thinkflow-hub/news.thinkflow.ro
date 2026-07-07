import { getAllDates, getAllTopics, readMetadata } from "@/lib/data-loader";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://news.thinkflow.ro";
  const dates = getAllDates();
  const topics = getAllTopics();
  const meta = readMetadata();

  const entries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: meta?.last_synced ? new Date(meta.last_synced) : new Date(),
      changeFrequency: "hourly",
      priority: 1.0,
    },
  ];

  // Category pages
  const categories = ["trending", "community", "open_source", "releases", "ai_labs", "research", "newsletters", "industry"];
  for (const cat of categories) {
    entries.push({
      url: `${baseUrl}/category/${cat}`,
      changeFrequency: "daily",
      priority: 0.8,
    });
  }

  // Archive pages (last 30 days)
  for (const date of dates.slice(0, 30)) {
    entries.push({
      url: `${baseUrl}/archive/${date}`,
      lastModified: new Date(date),
      changeFrequency: "never",
      priority: 0.6,
    });
  }

  // Topic pages
  for (const topic of topics.slice(0, 50)) {
    entries.push({
      url: `${baseUrl}/topic/${encodeURIComponent(topic)}`,
      changeFrequency: "weekly",
      priority: 0.5,
    });
  }

  return entries;
}
