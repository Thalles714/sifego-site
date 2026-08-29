import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return [
    { url: siteUrl.toString(), priority: 1 },
    { url: new URL("/politica-de-privacidade", siteUrl).toString(), priority: 0.3 },
  ];
}
