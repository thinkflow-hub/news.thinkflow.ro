export type Category =
  | "hackernews"
  | "reddit"
  | "github_trending"
  | "github_release"
  | "rss";

export type Sentiment = "positive" | "negative" | "neutral";

export interface NewsItem {
  source_id: string;
  source_name: string;
  title: string;
  url: string;
  description: string;
  published: string;
  score: number;
  category: Category;
  weight: number;

  tag?: string;
  stars?: number;
  language?: string;
  points?: number;
  comments_url?: string;
  upvotes?: number;
  subreddit?: string;
  num_comments?: number;

  summary?: string;
  summary_detailed?: string;
  summary_bullets?: string;
  thumbnail?: string | null;
  favicon?: string;
  sentiment?: Sentiment;
  keywords?: string[];

  cluster_id?: string;
  cluster_size?: number;
  cluster_topics?: string[];

  geo_title?: string;
  geo_keywords?: string[];
  schema_org?: Record<string, unknown>;
}

export interface NewsData {
  date: string;
  last_updated: string;
  total_items: number;
  enriched?: boolean;
  clustered?: boolean;
  geo_enriched?: boolean;
  items: NewsItem[];
  geo_metadata?: GeoMetadata;
}

export interface GeoMetadata {
  date: string;
  generated_at: string;
  schemas_generated: number;
  topics: string[];
  faq_items: { question: string; answer: string }[];
}

export interface DailyBriefing {
  date: string;
  generated_at: string;
  daily_briefing: string;
  category_summary: Record<string, string>;
  mood: string;
  top_stories_count: number;
  total_items: number;
}

export interface Metadata {
  dates: string[];
  categories: Category[];
  last_synced?: string;
  total_files?: number;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  hackernews: "Hacker News",
  reddit: "Reddit",
  github_trending: "GitHub Trending",
  github_release: "GitHub Releases",
  rss: "RSS",
};

export const CATEGORY_COLORS: Record<Category, string> = {
  hackernews: "#f59e0b",
  reddit: "#ef4444",
  github_trending: "#6b7280",
  github_release: "#6b7280",
  rss: "#3b82f6",
};

export const SENTIMENT_COLORS: Record<Sentiment, string> = {
  positive: "#22c55e",
  negative: "#ef4444",
  neutral: "#94a3b8",
};
