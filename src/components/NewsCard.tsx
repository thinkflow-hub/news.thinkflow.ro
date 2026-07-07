"use client";

import { useState } from "react";
import type { NewsItem, Category, Sentiment } from "@/lib/types";
import { CATEGORY_COLORS, CATEGORY_LABELS, SENTIMENT_COLORS } from "@/lib/types";
import { SourceBadge } from "./SourceBadge";
import { SummaryToggle } from "./SummaryToggle";
import {
  ExternalLink,
  MessageCircle,
  Star,
  ArrowUp,
  Layers,
} from "lucide-react";
import { extractDomain } from "@/lib/news";

interface NewsCardProps {
  item: NewsItem;
  index?: number;
  onClusterClick?: (clusterId: string) => void;
}

const scoreIcon: Record<string, React.ReactNode> = {
  trending: <ArrowUp className="w-3 h-3" />,
  community: <ArrowUp className="w-3 h-3" />,
  open_source: <Star className="w-3 h-3" />,
  releases: <Star className="w-3 h-3" />,
  ai_labs: <Star className="w-3 h-3" />,
  research: <Star className="w-3 h-3" />,
  newsletters: <Star className="w-3 h-3" />,
  industry: <Star className="w-3 h-3" />,
};

function SentimentDot({ sentiment }: { sentiment?: Sentiment }) {
  if (!sentiment || sentiment === "neutral") return null;
  const color = SENTIMENT_COLORS[sentiment];
  return (
    <span
      className="inline-block w-2 h-2 rounded-full shrink-0"
      style={{ backgroundColor: color }}
      title={sentiment}
    />
  );
}

function proxyUrl(url: string | null | undefined): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("http")) return `/api/image?url=${encodeURIComponent(url)}`;
  return url;
}

function Thumbnail({ item }: { item: NewsItem }) {
  const gradClass = `gradient-${item.category}`;
  const imgSrc = proxyUrl(item.thumbnail);

  if (imgSrc) {
    return (
      <div className="relative w-full h-36 overflow-hidden rounded-t-2xl bg-black/40">
        <img
          src={imgSrc}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>
    );
  }

  if (item.favicon) {
    return (
      <div className={`flex items-center justify-center w-full h-36 ${gradClass}`}>
        <img
          src={item.favicon}
          alt=""
          className="w-10 h-10 rounded opacity-70"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center w-full h-36 ${gradClass}`}>
      <span
        className="text-4xl font-bold opacity-20"
        style={{ color: CATEGORY_COLORS[item.category] }}
      >
        {CATEGORY_LABELS[item.category]?.charAt(0) || "N"}
      </span>
    </div>
  );
}

export function NewsCard({ item, index = 0, onClusterClick }: NewsCardProps) {
  const domain = extractDomain(item.url);
  const scoreVal = item.points || item.upvotes || item.stars || item.score || 0;
  const [summaryMode, setSummaryMode] = useState<"tldr" | "detailed" | "bullets">("tldr");

  const hasCluster = item.cluster_id && (item.cluster_size ?? 0) > 1;
  const hasMultipleSummaries = !!(item.summary_detailed || item.summary_bullets);

  const displaySummary = () => {
    if (summaryMode === "detailed" && item.summary_detailed) return item.summary_detailed;
    if (summaryMode === "bullets" && item.summary_bullets) return item.summary_bullets;
    return item.summary;
  };

  return (
    <article
      className="glass-card overflow-hidden group"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="block"
      >
        <Thumbnail item={item} />

        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <SourceBadge category={item.category} />
              <SentimentDot sentiment={item.sentiment} />
            </div>
            <span className="flex items-center gap-1 text-xs text-muted shrink-0">
              {scoreIcon[item.category]}
              <span>{scoreVal}</span>
            </span>
          </div>

          <h3 className="text-sm font-semibold leading-snug text-foreground line-clamp-3 group-hover:text-accent transition-colors">
            {item.title}
          </h3>

          {displaySummary() && (
            <p className="text-xs text-muted leading-relaxed line-clamp-2">
              {displaySummary()}
            </p>
          )}

          <div className="flex items-center justify-between text-xs text-muted pt-1">
            <div className="flex items-center gap-2">
              <span className="truncate max-w-[140px]">{domain}</span>
              {hasCluster && (
                <span
                  className="inline-flex items-center gap-1 text-accent/80 hover:text-accent cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onClusterClick?.(item.cluster_id!);
                  }}
                >
                  <Layers className="w-3 h-3" />
                  <span>{item.cluster_size}</span>
                </span>
              )}
            </div>
            <ExternalLink className="w-3 h-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {hasMultipleSummaries && (
            <div className="pt-1" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
              <SummaryToggle mode={summaryMode} onChange={setSummaryMode} />
            </div>
          )}
        </div>
      </a>
    </article>
  );
}
