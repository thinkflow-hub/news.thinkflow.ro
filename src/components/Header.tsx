import Link from "next/link";

export function Header() {
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
          <nav className="flex items-center gap-6 text-sm text-muted">
            <Link
              href="https://thinkflow.ro"
              className="transition-colors hover:text-foreground"
            >
              thinkflow.ro
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
