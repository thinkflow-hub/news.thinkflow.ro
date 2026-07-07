import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for news.thinkflow.ro — rules and conditions for using our news aggregator.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="glass-card-static p-8 md:p-12">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Terms of Service</h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">1. Acceptance</h2>
          <p className="text-muted text-sm leading-relaxed">
            By accessing news.thinkflow.ro, you agree to these terms. If you do not agree,
            do not use the site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">2. Service Description</h2>
          <p className="text-muted text-sm leading-relaxed">
            news.thinkflow.ro is an AI-curated news aggregator that collects and summarizes
            content from third-party sources (Hacker News, Reddit, GitHub, RSS feeds). We do
            not produce original news reports. All summarized content is attributed to its
            original source.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">3. Intellectual Property</h2>
          <p className="text-muted text-sm leading-relaxed">
            The site design, code, and AI-generated summaries are owned by ThinkFLOW Systems.
            Original news content belongs to its respective publishers. You may share links
            and excerpts with proper attribution.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">4. Affiliate Links</h2>
          <p className="text-muted text-sm leading-relaxed">
            Some links on this site are affiliate links. We may earn a commission if you
            make a purchase through them, at no extra cost to you. See our{" "}
            <Link href="/affiliate-disclosure" className="text-accent underline">
              Affiliate Disclosure
            </Link>{" "}
            for details.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">5. Limitation of Liability</h2>
          <p className="text-muted text-sm leading-relaxed">
            news.thinkflow.ro provides content &quot;as is&quot; without warranties of accuracy,
            completeness, or timeliness. We are not liable for decisions made based on
            our content. AI summaries may contain errors — always verify with the source.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">6. Third-Party Content</h2>
          <p className="text-muted text-sm leading-relaxed">
            We aggregate content from third parties. We do not endorse, guarantee, or take
            responsibility for the accuracy of third-party content. Contact the original
            publisher for disputes about their content.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">7. Governing Law</h2>
          <p className="text-muted text-sm leading-relaxed">
            These terms are governed by Romanian law. Disputes shall be resolved in the
            courts of Bucharest, Romania.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">8. Contact</h2>
          <p className="text-muted text-sm leading-relaxed">
            For questions about these terms:{" "}
            <Link href="https://thinkflow.ro/contact" className="text-accent underline">
              thinkflowhub@gmail.com
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
