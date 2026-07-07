"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-black/60 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight">
              <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                news
              </span>
              <span className="text-accent">.</span>
              <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                thinkflow
              </span>
              <span className="text-accent">.ro</span>
            </span>
          </Link>

          <nav className="hidden sm:flex items-center gap-6 text-sm text-muted">
            <Link href="/" className="transition-colors hover:text-foreground">
              Today
            </Link>
            <Link
              href="/archive"
              className="transition-colors hover:text-foreground"
            >
              Archive
            </Link>
            <Link
              href="https://thinkflow.ro"
              className="transition-colors hover:text-foreground"
            >
              thinkflow.ro
            </Link>
          </nav>

          <button
            className="sm:hidden p-2 text-muted hover:text-foreground"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {open && (
          <div className="sm:hidden pb-4 space-y-2">
            <Link
              href="/"
              className="block px-3 py-2 text-sm text-muted hover:text-foreground rounded-lg hover:bg-card transition-colors"
              onClick={() => setOpen(false)}
            >
              Today
            </Link>
            <Link
              href="/archive"
              className="block px-3 py-2 text-sm text-muted hover:text-foreground rounded-lg hover:bg-card transition-colors"
              onClick={() => setOpen(false)}
            >
              Archive
            </Link>
            <Link
              href="https://thinkflow.ro"
              className="block px-3 py-2 text-sm text-muted hover:text-foreground rounded-lg hover:bg-card transition-colors"
              onClick={() => setOpen(false)}
            >
              thinkflow.ro
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
