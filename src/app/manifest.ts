import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sifego",
    short_name: "Sifego",
    description:
      "Soluções digitais personalizadas para empresas que precisam criar, melhorar ou divulgar sua presença digital.",
    start_url: "/",
    display: "standalone",
    background_color: "#181818",
    theme_color: "#181818",
    icons: [
      {
        src: "/assets/brand/sifego-symbol.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
