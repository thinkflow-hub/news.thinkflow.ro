export function SchemaOrg() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://news.thinkflow.ro/#website",
        url: "https://news.thinkflow.ro",
        name: "news.thinkflow.ro",
        description:
          "Daily curated AI, cloud, DevOps, and web development news. Aggregated from Hacker News, Reddit, GitHub, and RSS.",
        publisher: {
          "@type": "Organization",
          "@id": "https://thinkflow.ro/#organization",
          name: "ThinkFLOW",
          url: "https://thinkflow.ro",
        },
        inLanguage: "en-US",
      },
      {
        "@type": "Organization",
        "@id": "https://thinkflow.ro/#organization",
        name: "ThinkFLOW",
        url: "https://thinkflow.ro",
        description: "AI Infrastructure & Cloud Hosting",
      },
      {
        "@type": "WebPage",
        "@id": "https://news.thinkflow.ro/#webpage",
        url: "https://news.thinkflow.ro",
        name: "news.thinkflow.ro — AI & Tech News Aggregator",
        isPartOf: { "@id": "https://news.thinkflow.ro/#website" },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
