import type { NewsItem, Category } from "@/lib/types";
import { CATEGORY_COLORS, CATEGORY_LABELS } from "@/lib/types";
import { SourceBadge } from "./SourceBadge";
import {
  ExternalLink,
  MessageCircle,
  Star,
  ArrowUp,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { extractDomain } from "@/lib/news";

interface NewsCardProps {
  item: NewsItem;
  index?: number;
}

const scoreIcon: Record<string, React.ReactNode> = {
  hackernews: <ArrowUp className="w-3 h-3" />,
  reddit: <ArrowUp className="w-3 h-3" />,
  github_trending: <Star className="w-3 h-3" />,
  github_release: <Star className="w-3 h-3" />,
  rss: <Star className="w-3 h-3" />,
};

function Thumbnail({ item }: { item: NewsItem }) {
  const gradClass = `gradient-${item.category}`;

  if (item.thumbnail) {
    return (
      <div className="relative w-full h-36 overflow-hidden rounded-t-2xl bg-black/40">
        <img
          src={item.thumbnail}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
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
        {item.category === "hackernews"
          ? "Y"
          : item.category === "reddit"
          ? "R"
          : item.category === "github_trending" || item.category === "github_release"
          ? "G"
          : "F"}
      </span>
    </div>
  );
}

export function NewsCard({ item, index = 0 }: NewsCardProps) {
  const domain = extractDomain(item.url);
  const scoreVal = item.points || item.upvotes || item.stars || item.score || 0;

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
            <SourceBadge category={item.category} size="sm" />
            <span className="flex items-center gap-1 text-xs text-muted shrink-0">
              {scoreIcon[item.category]}
              <span>{scoreVal}</span>
            </span>
          </div>

          <h3 className="text-sm font-semibold leading-snug text-foreground line-clamp-3 group-hover:text-accent transition-colors">
            {item.title}
          </h3>

          {item.summary && (
            <p className="text-xs text-muted leading-relaxed line-clamp-2">
              {item.summary}
            </p>
          )}

          <div className="flex items-center justify-between text-xs text-muted pt-1">
            <span className="truncate max-w-[180px]">{domain}</span>
            <ExternalLink className="w-3 h-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </a>
    </article>
  );
}
