import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-black/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
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
          <p>
            Part of{" "}
            <Link
              href="https://thinkflow.ro"
              className="text-accent hover:underline"
            >
              thinkflow.ro
            </Link>{" "}
            &mdash; AI Infrastructure &amp; Cloud Hosting
          </p>
        </div>
      </div>
    </footer>
  );
}
