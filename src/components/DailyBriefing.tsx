import type { DailyBriefing } from "@/lib/types";
import { Sparkles, TrendingUp, BookOpen } from "lucide-react";

interface DailyBriefingCardProps {
  briefing: DailyBriefing;
}

export function DailyBriefingCard({ briefing }: DailyBriefingCardProps) {
  const mood = briefing.mood || "neutral";

  return (
    <section className="glass-card-static p-6 mb-8 animate-fade-in-up opacity-0" style={{ animationFillMode: "forwards" }}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-accent" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Daily Briefing</h2>
          <p className="text-xs text-muted">
            AI-generated summary &middot; {briefing.date}
          </p>
        </div>
        <span className="ml-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-card border border-border">
          <TrendingUp className="w-3 h-3" />
          {mood}
        </span>
      </div>

      <div className="prose prose-invert prose-sm max-w-none text-muted leading-relaxed whitespace-pre-line">
        {briefing.daily_briefing}
      </div>

      {briefing.category_summary && Object.keys(briefing.category_summary).length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {Object.entries(briefing.category_summary).map(([cat, summary]) => (
            <div
              key={cat}
              className="bg-card rounded-lg p-2.5 border border-border"
            >
              <p className="text-xs font-medium text-foreground capitalize mb-0.5">
                {cat.replace(/_/g, " ")}
              </p>
              <p className="text-[11px] text-muted leading-tight">{summary}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export function BriefingSkeleton() {
  return (
    <div className="glass-card-static p-6 mb-8 animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-card" />
        <div className="space-y-1.5">
          <div className="h-5 w-32 bg-card rounded" />
          <div className="h-3 w-48 bg-card rounded" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 w-full bg-card rounded" />
        <div className="h-4 w-5/6 bg-card rounded" />
        <div className="h-4 w-4/6 bg-card rounded" />
      </div>
    </div>
  );
}
