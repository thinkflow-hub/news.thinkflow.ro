import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Category } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";
import { NewsFeed } from "@/components/NewsFeed";
import { getLatestDate, readNewsFile, getAllDates } from "@/lib/data-loader";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ type: string }>;
}

const VALID_CATEGORIES: Category[] = [
  "trending",
  "community",
  "open_source",
  "releases",
  "ai_labs",
  "research",
  "newsletters",
  "industry",
];

export async function generateStaticParams() {
  return VALID_CATEGORIES.map((type) => ({ type }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type } = await params;
  const label = CATEGORY_LABELS[type as Category] || type;
  return {
    title: `${label} News`,
    description: `Latest ${label} stories curated for AI and tech professionals.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { type } = await params;

  if (!VALID_CATEGORIES.includes(type as Category)) {
    notFound();
  }

  const category = type as Category;
  const latest = getLatestDate();
  const allItems = latest ? readNewsFile(latest) : [];
  const items = allItems.filter((i) => i.category === category);
  const dates = getAllDates();

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
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {CATEGORY_LABELS[category]}
          </h1>
          <p className="text-muted mt-1 text-sm">
            {items.length} stories from {latest || "today"}
          </p>
        </div>
      </div>

      <NewsFeed items={items} dates={dates} />
    </div>
  );
}
