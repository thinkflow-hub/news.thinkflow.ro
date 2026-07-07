import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-black/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center gap-4 text-sm text-muted">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
            <Link href="/affiliate-disclosure" className="hover:text-accent transition-colors">Affiliate Disclosure</Link>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <p>
              &copy; {new Date().getFullYear()}{" "}
              <Link
                href="https://thinkflow.ro"
                className="text-accent hover:underline"
              >
                ThinkFLOW
              </Link>
              . All rights reserved.
            </p>
            <span className="hidden sm:inline mx-1">&middot;</span>
            <p>
              Part of{" "}
              <Link
                href="https://thinkflow.ro"
                className="text-accent hover:underline"
              >
                thinkflow.ro
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
