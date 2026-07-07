import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for news.thinkflow.ro — how we collect, use, and protect your personal data.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="glass-card-static p-8 md:p-12">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Privacy Policy</h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">1. Data Controller</h2>
          <p className="text-muted text-sm leading-relaxed">
            ThinkFLOW Systems (thinkflowhub@gmail.com, Bucharest, Romania) is the data controller
            for personal data collected through news.thinkflow.ro.
          </p>
          <p className="mt-2 text-muted text-sm leading-relaxed">
            Contact:{" "}
            <Link href="https://thinkflow.ro/contact" className="text-accent underline">
              thinkflowhub@gmail.com
            </Link>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">2. What We Collect</h2>
          <p className="text-muted text-sm leading-relaxed">
            We collect minimal personal data: IP address and browser user agent (via server logs),
            and anonymous usage statistics. We do not use cookies for tracking. Affiliate links
            use URL parameters only. We do not collect names, email addresses, or any sensitive
            personal data on this site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">3. Legal Basis (GDPR Art. 6)</h2>
          <p className="text-muted text-sm leading-relaxed">
            We process data based on legitimate interests (site analytics, affiliate tracking,
            security — Art. 6(1)(f)). No consent is required for essential operations.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">4. Cookies</h2>
          <p className="text-muted text-sm leading-relaxed">
            This site uses only essential cookies for functionality. No tracking cookies,
            analytics cookies, or third-party advertising cookies are used. Affiliate referrals
            use URL parameters, not cookies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">5. Data Sharing</h2>
          <p className="text-muted text-sm leading-relaxed">
            We share data with: Vercel Inc. (US — hosting, covered by EU-US Data Privacy
            Framework). We do not sell personal data.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">6. Your Rights (GDPR)</h2>
          <p className="text-muted text-sm leading-relaxed">
            You have the right to access, rectify, erase, restrict, port, and object to
            processing of your data. Contact us at thinkflowhub@gmail.com to exercise
            these rights. We respond within 30 days.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">7. Changes</h2>
          <p className="text-muted text-sm leading-relaxed">
            We may update this policy. Material changes will be notified via a notice
            on this site. Last updated: July 7, 2026.
          </p>
        </section>
      </div>
    </div>
  );
}
