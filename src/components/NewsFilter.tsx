"use client";

import { useState, useMemo } from "react";
import type { NewsItem, Category } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";
import { Search, Filter, Flame, MessageCircle, GitGraph, Rocket, FlaskRound, BookOpen, Newspaper, Building2, PartyPopper } from "lucide-react";

interface NewsFilterProps {
  items: NewsItem[];
  onFilter: (filtered: NewsItem[]) => void;
}

type Tab = "all" | Category;

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "all", label: "All", icon: <PartyPopper className="w-3.5 h-3.5" /> },
  { id: "trending", label: "Trending", icon: <Flame className="w-3.5 h-3.5" /> },
  { id: "community", label: "Community", icon: <MessageCircle className="w-3.5 h-3.5" /> },
  { id: "open_source", label: "Open Source", icon: <GitGraph className="w-3.5 h-3.5" /> },
  { id: "releases", label: "Releases", icon: <Rocket className="w-3.5 h-3.5" /> },
  { id: "ai_labs", label: "AI Labs", icon: <FlaskRound className="w-3.5 h-3.5" /> },
  { id: "research", label: "Research", icon: <BookOpen className="w-3.5 h-3.5" /> },
  { id: "newsletters", label: "Newsletters", icon: <Newspaper className="w-3.5 h-3.5" /> },
  { id: "industry", label: "Industry", icon: <Building2 className="w-3.5 h-3.5" /> },
];

export function NewsFilter({ items, onFilter }: NewsFilterProps) {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let result = activeTab === "all"
      ? items
      : items.filter((i) => i.category === activeTab);

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.source_name?.toLowerCase().includes(q) ||
          i.summary?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [items, activeTab, query]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              onFilter(filtered);
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full transition-all ${
              activeTab === tab.id
                ? "bg-accent text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                : "bg-card text-muted hover:text-foreground border border-border"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}

        <div className="relative ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-48 lg:w-64 pl-9 pr-3 py-1.5 text-sm bg-card border border-border rounded-full text-foreground placeholder-muted focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-muted">
        <Filter className="w-3 h-3" />
        <span>
          {filtered.length} of {items.length} items
        </span>
      </div>
    </div>
  );
}
