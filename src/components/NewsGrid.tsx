"use client";

import { useRef, useEffect, useState } from "react";
import type { NewsItem } from "@/lib/types";
import { NewsCard } from "./NewsCard";

interface NewsGridProps {
  items: NewsItem[];
}

export function NewsGrid({ items }: NewsGridProps) {
  const [visible, setVisible] = useState(12);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible((prev) => Math.min(prev + 12, items.length));
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [items.length]);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg text-muted">No news items found.</p>
        <p className="text-sm text-muted/60 mt-1">
          Try a different date or category.
        </p>
      </div>
    );
  }

  const shown = items.slice(0, visible);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {shown.map((item, i) => (
          <div
            key={`${item.url}-${i}`}
            className="animate-fade-in-up opacity-0"
            style={{ animationDelay: `${(i % 12) * 60}ms`, animationFillMode: "forwards" }}
          >
            <NewsCard item={item} index={i} />
          </div>
        ))}
      </div>

      {visible < items.length && (
        <div
          ref={loaderRef}
          className="flex items-center justify-center py-8"
        >
          <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </>
  );
}
