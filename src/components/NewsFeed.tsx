"use client";

import { useState } from "react";
import type { NewsItem } from "@/lib/types";
import { NewsFilter } from "./NewsFilter";
import { NewsGrid } from "./NewsGrid";
import { sortByScore } from "@/lib/news";

interface NewsFeedProps {
  items: NewsItem[];
  dates: string[];
}

export function NewsFeed({ items, dates }: NewsFeedProps) {
  const [filtered, setFiltered] = useState<NewsItem[]>(() =>
    sortByScore(items)
  );

  const handleFilter = (f: NewsItem[]) => {
    setFiltered(f);
  };

  return (
    <div className="space-y-6">
      <NewsFilter items={sortByScore(items)} onFilter={handleFilter} />
      <NewsGrid items={filtered} />
    </div>
  );
}
