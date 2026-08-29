import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const siteDirectory = path.resolve(scriptDirectory, "..");
const headers = await readFile(path.join(siteDirectory, "public", "_headers"), "utf8");
const nextConfig = await readFile(path.join(siteDirectory, "next.config.ts"), "utf8");

for (const expected of [
  "Content-Security-Policy:",
  "frame-ancestors 'none'",
  "X-Content-Type-Options: nosniff",
  "X-Frame-Options: DENY",
  "Referrer-Policy: strict-origin-when-cross-origin",
  "Permissions-Policy:",
  "https://:project.pages.dev/*",
  "https://:version.:project.pages.dev/*",
  "X-Robots-Tag: noindex, nofollow",
  "/assets/production/*",
  "Cache-Control: public, max-age=31536000, immutable",
]) {
  assert(headers.includes(expected), `Configuração ausente em public/_headers: ${expected}`);
}

assert(nextConfig.includes('output: "export"'), "next.config.ts precisa manter output: export");
console.log("Cloudflare Pages: exportação, segurança, cache e noindex validados.");
