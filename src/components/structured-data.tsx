import { services } from "@/lib/content";
import { getSiteUrl, siteDescription, siteName, whatsappNumber } from "@/lib/site";

export function StructuredData() {
  const siteUrl = getSiteUrl();
  const organizationId = new URL("/#organization", siteUrl).toString();
  const websiteId = new URL("/#website", siteUrl).toString();

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteName,
        url: siteUrl.toString(),
        logo: new URL("/assets/brand/sifego-symbol.svg", siteUrl).toString(),
        description: siteDescription,
        founder: { "@type": "Person", name: "Thalles Leal" },
        areaServed: { "@type": "Country", name: "Brasil" },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: whatsappNumber,
          contactType: "sales",
          availableLanguage: "pt-BR",
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: siteName,
        url: siteUrl.toString(),
        inLanguage: "pt-BR",
        publisher: { "@id": organizationId },
      },
      ...services.map((service) => ({
        "@type": "Service",
        "@id": new URL(`/#servico-${service.id}`, siteUrl).toString(),
        name: service.title,
        description: service.description,
        serviceType: service.title,
        areaServed: { "@type": "Country", name: "Brasil" },
        provider: { "@id": organizationId },
        url: new URL(`/#servico-${service.id}`, siteUrl).toString(),
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
