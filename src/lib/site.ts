export const siteName = "Sifego";
export const siteTitle = "Sifego | Soluções digitais sob medida para empresas";
export const siteDescription =
  "Sites, sistemas, automações, branding e campanhas com escopo definido para a necessidade de cada empresa.";

export const whatsappUrl =
  "https://wa.me/5562998729014?text=Ol%C3%A1%2C%20conheci%20a%20Sifego%20pelo%20site%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.";

export const whatsappNumber = "+55 62 99872-9014";

export function isAnalyticsEnabled(): boolean {
  return (
    process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true" &&
    /^G-[A-Z0-9]+$/.test(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "")
  );
}

export function getSiteUrl(): URL {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!configuredUrl) return new URL("http://localhost:3000");

  try {
    return new URL(configuredUrl);
  } catch {
    throw new Error("NEXT_PUBLIC_SITE_URL precisa ser uma URL absoluta válida.");
  }
}

export function isSiteIndexable(): boolean {
  return process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true";
}
