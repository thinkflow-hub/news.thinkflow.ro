import { Flame, MessageCircle, GitGraph, Rocket, FlaskRound, BookOpen, Newspaper, Building2, Sparkles } from "lucide-react";
import type { Category } from "@/lib/types";

const iconMap: Record<string, React.ReactNode> = {
  trending: <Flame className="w-3.5 h-3.5" />,
  community: <MessageCircle className="w-3.5 h-3.5" />,
  open_source: <GitGraph className="w-3.5 h-3.5" />,
  releases: <Rocket className="w-3.5 h-3.5" />,
  ai_labs: <FlaskRound className="w-3.5 h-3.5" />,
  research: <BookOpen className="w-3.5 h-3.5" />,
  newsletters: <Newspaper className="w-3.5 h-3.5" />,
  industry: <Building2 className="w-3.5 h-3.5" />,
};

const labelMap: Record<string, string> = {
  trending: "Trending",
  community: "Community",
  open_source: "Open Source",
  releases: "Releases",
  ai_labs: "AI Labs",
  research: "Research",
  newsletters: "Newsletters",
  industry: "Industry",
};

interface SourceBadgeProps {
  category?: string;
  sourceName?: string;
}

export function SourceBadge({ category, sourceName }: SourceBadgeProps) {
  if (!category) return null;

  const icon = iconMap[category] ?? <Sparkles className="w-3.5 h-3.5" />;
  const label = labelMap[category] ?? sourceName ?? category;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full source-${category}`}
    >
      {icon}
      {label}
    </span>
  );
}
