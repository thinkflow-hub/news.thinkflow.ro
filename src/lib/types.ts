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
  thumbnail?: string | null;
  favicon?: string;
  cluster_id?: string;
  cluster_size?: number;

  geo_title?: string;
  geo_keywords?: string[];
  sentiment?: Sentiment;
}

export interface NewsData {
  date: string;
  last_updated: string;
  total_items: number;
  items: NewsItem[];
}

export interface Metadata {
  dates: string[];
  categories: Category[];
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
