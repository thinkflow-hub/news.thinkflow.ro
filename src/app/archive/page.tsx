import Link from "next/link";
import type { Metadata } from "next";
import { Calendar, ChevronRight } from "lucide-react";
import { getAllDates, readMetadata } from "@/lib/data-loader";

export const metadata: Metadata = {
  title: "News Archive",
  description:
    "Browse the complete archive of AI and tech news on news.thinkflow.ro. Daily curated coverage from HN, Reddit, GitHub, and RSS.",
};

export default function ArchivePage() {
  const dates = getAllDates();
  const meta = readMetadata();

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Archive
        </h1>
        <p className="text-muted mt-1 text-sm">
          {dates.length} days of curated AI and tech news
          {meta?.last_synced && (
            <span> &middot; Last synced: {meta.last_synced.slice(0, 10)}</span>
          )}
        </p>
      </div>

      <div className="space-y-1">
        {dates.map((date, i) => (
          <Link
            key={date}
            href={`/archive/${date}`}
            className="flex items-center justify-between px-4 py-3 rounded-xl glass-card-static hover:bg-card-hover transition-all group"
            style={{ animationDelay: `${i * 30}ms` }}
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-muted" />
              <span className="text-sm font-medium">{date}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}
      </div>
    </div>
  );
}
