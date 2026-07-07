import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { NewsFeed } from "@/components/NewsFeed";
import { readNewsFile, getAllDates } from "@/lib/data-loader";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ date: string }>;
}

export async function generateStaticParams() {
  const dates = getAllDates();
  return dates.map((date) => ({ date }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { date } = await params;
  return {
    title: `Archive: ${date}`,
    description: `AI and tech news archive for ${date}. Curated from HN, Reddit, GitHub, and RSS.`,
  };
}

export default async function ArchivePage({ params }: PageProps) {
  const { date } = await params;
  const items = readNewsFile(date);

  if (items.length === 0) {
    notFound();
  }

  const allDates = getAllDates();
  const currentIndex = allDates.indexOf(date);

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
            Archive: {date}
          </h1>
          <p className="text-muted mt-1 text-sm">{items.length} stories</p>
        </div>
        {allDates.length > 0 && (
          <div className="flex items-center gap-2 text-sm">
            {currentIndex > 0 && (
              <Link
                href={`/archive/${allDates[currentIndex - 1]}`}
                className="text-accent hover:underline"
              >
                &larr; Previous day
              </Link>
            )}
            {currentIndex > 0 && currentIndex < allDates.length - 1 && (
              <span className="text-muted">|</span>
            )}
            {currentIndex < allDates.length - 1 && (
              <Link
                href={`/archive/${allDates[currentIndex + 1]}`}
                className="text-accent hover:underline"
              >
                Next day &rarr;
              </Link>
            )}
          </div>
        )}
      </div>

      <NewsFeed items={items} dates={allDates} />
    </div>
  );
}
