import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { getSiteUrl, isSiteIndexable, siteDescription, siteName, siteTitle } from "@/lib/site";
import "./globals.css";

const albertSans = localFont({
  variable: "--font-albert-sans",
  src: [
    {
      path: "./fonts/albert-sans-latin-variable.woff2",
      weight: "400 700",
      style: "normal",
    },
    {
      path: "./fonts/albert-sans-latin-variable-italic.woff2",
      weight: "400 700",
      style: "italic",
    },
  ],
  display: "swap",
});

const instrumentSerif = localFont({
  variable: "--font-instrument-serif",
  src: [
    {
      path: "./fonts/instrument-serif-latin.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/instrument-serif-latin-italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  display: "swap",
});

const indexable = isSiteIndexable();
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: siteTitle,
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  category: "Tecnologia",
  alternates: configuredSiteUrl ? { canonical: "/" } : undefined,
  icons: {
    icon: [{ url: "/assets/brand/sifego-symbol.svg", type: "image/svg+xml" }],
  },
  robots: {
    index: indexable,
    follow: indexable,
    googleBot: { index: indexable, follow: indexable },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName,
    title: siteTitle,
    description: siteDescription,
    url: configuredSiteUrl ? "/" : undefined,
    images: [
      {
        url: "/og-sifego.png",
        width: 1200,
        height: 630,
        alt: "Sifego, soluções digitais sob medida",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-sifego.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#181818" },
    { media: "(prefers-color-scheme: light)", color: "#f0f0f0" },
  ],
};

const themeBootScript = `
  (() => {
    try {
      const storedTheme = localStorage.getItem("sifego-theme");
      document.documentElement.dataset.theme = storedTheme === "light" ? "light" : "dark";
    } catch {
      document.documentElement.dataset.theme = "dark";
    }
  })();
`;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      data-theme="dark"
      suppressHydrationWarning
      className={`${albertSans.variable} ${instrumentSerif.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
