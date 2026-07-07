import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Hash } from "lucide-react";
import { NewsFeed } from "@/components/NewsFeed";
import { getAllDates, readNewsFile, getAllTopics } from "@/lib/data-loader";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const topics = getAllTopics();
  return topics.map((slug) => ({ slug: encodeURIComponent(slug) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = decodeURIComponent(slug);
  return {
    title: `${topic} — AI & Tech News`,
    description: `Latest news and developments about ${topic}. Curated AI and tech coverage from HN, Reddit, GitHub, and RSS.`,
    openGraph: {
      title: `${topic} — news.thinkflow.ro`,
      description: `Latest news about ${topic} in AI and technology.`,
    },
  };
}

export default async function TopicPage({ params }: PageProps) {
  const { slug } = await params;
  const topic = decodeURIComponent(slug).toLowerCase();

  // Collect items matching this topic across recent dates
  const dates = getAllDates();
  const recentDates = dates.slice(0, 14);
  const topicPattern = topic.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  const topicRegex = new RegExp(topicPattern, "i");

  const matchingItems = [];
  for (const date of recentDates) {
    const items = readNewsFile(date);
    for (const item of items) {
      const textToSearch = [
        item.title,
        ...(item.keywords || []),
        ...(item.geo_keywords || []),
        ...(item.cluster_topics || []),
        item.summary || "",
      ].join(" ");

      if (topicRegex.test(textToSearch)) {
        matchingItems.push(item);
      }
    }
    if (matchingItems.length >= 50) break;
  }

  if (matchingItems.length === 0) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 space-y-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to today
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center">
            <Hash className="w-4 h-4 text-accent" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight capitalize">
              {topic}
            </h1>
            <p className="text-muted mt-1 text-sm">
              {matchingItems.length} stories across {recentDates.length} days
            </p>
          </div>
        </div>
      </div>

      <NewsFeed items={matchingItems} dates={dates} />
    </div>
  );
}
