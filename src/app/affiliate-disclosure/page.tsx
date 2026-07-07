import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: "Affiliate disclosure for news.thinkflow.ro — transparency about affiliate links and commissions.",
};

export default function AffiliateDisclosurePage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="glass-card-static p-8 md:p-12">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Affiliate Disclosure</h1>

        <section className="mb-8">
          <p className="text-muted text-sm leading-relaxed">
            news.thinkflow.ro participates in various affiliate marketing programs. This means
            we may earn a commission when you click on certain links and make a purchase or
            sign up for services, at no additional cost to you.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">How It Works</h2>
          <p className="text-muted text-sm leading-relaxed">
            When you click an affiliate link on this site, a unique identifier is added via
            URL parameter (not a cookie). If you complete a qualifying action (purchase,
            signup, etc.), the affiliate program credits us a referral commission. This
            helps us keep the site free and maintain daily operations.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Transparency</h2>
          <p className="text-muted text-sm leading-relaxed">
            We only recommend products and services we genuinely believe provide value to our
            readers. Our editorial content is not influenced by affiliate partnerships.
            Affiliate links are clearly marked with a &quot;ref&quot; parameter and disclosed
            inline where they appear.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Current Affiliate Programs</h2>
          <p className="text-muted text-sm leading-relaxed">
            As of {currentYear}, we may participate in programs including but not limited to:
            Vercel, DigitalOcean, Supabase, Cloudflare, Pinecone, ElevenLabs, and others
            through networks like PartnerStack, Impact, and CJ Affiliate.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Questions</h2>
          <p className="text-muted text-sm leading-relaxed">
            For questions about our affiliate relationships:{" "}
            <Link href="https://thinkflow.ro/contact" className="text-accent underline">
              thinkflowhub@gmail.com
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
