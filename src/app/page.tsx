import { NewsFeed } from "@/components/NewsFeed";
import { DailyBriefingCard, BriefingSkeleton } from "@/components/DailyBriefing";
import { getLatestDate, readNewsFile, getAllDates, readDailyBriefing } from "@/lib/data-loader";

export default function HomePage() {
  const dates = getAllDates();
  const latest = getLatestDate();
  const items = latest ? readNewsFile(latest) : [];
  const briefing = latest ? readDailyBriefing(latest) : null;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <section className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Today&apos;s Signals
        </h1>
        <p className="text-muted mt-2 text-sm">
          Curated AI, cloud, DevOps, and web development news.
          {latest && <span> Updated: {latest}</span>}
        </p>
      </section>

      {briefing ? (
        <DailyBriefingCard briefing={briefing} />
      ) : (
        <BriefingSkeleton />
      )}

      <NewsFeed items={items} dates={dates} />
    </div>
  );
}
