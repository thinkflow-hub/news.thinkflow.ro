import type { Category } from "@/lib/types";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/types";
import {
  ExternalLink,
  MessageCircle,
  GitGraph,
  GitFork,
  Rss,
} from "lucide-react";

interface SourceBadgeProps {
  category: Category;
  sourceName?: string;
  size?: "sm" | "md";
}

const icons: Record<Category, React.ReactNode> = {
  hackernews: <MessageCircle className="w-3 h-3" />,
  reddit: <ExternalLink className="w-3 h-3" />,
  github_trending: <GitGraph className="w-3 h-3" />,
  github_release: <GitFork className="w-3 h-3" />,
  rss: <Rss className="w-3 h-3" />,
};

export function SourceBadge({ category, sourceName, size = "sm" }: SourceBadgeProps) {
  const color = CATEGORY_COLORS[category];
  const label = sourceName || CATEGORY_LABELS[category];
  const isSm = size === "sm";

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full ${
        isSm ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm"
      }`}
      style={{
        backgroundColor: `${color}15`,
        color: color,
        border: `1px solid ${color}30`,
      }}
    >
      {icons[category]}
      {label}
    </span>
  );
}
