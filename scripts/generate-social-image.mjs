import { chromium } from "@playwright/test";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const siteDirectory = path.resolve(scriptDirectory, "..");
const symbolPath = path.join(siteDirectory, "public", "assets", "brand", "sifego-symbol.svg");
const outputPath = path.join(siteDirectory, "public", "og-sifego.png");
const symbol = await readFile(symbolPath, "utf8");

const browser = await chromium.launch({ headless: true });

try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(`<!doctype html>
    <html lang="pt-BR">
      <head>
        <meta charset="utf-8" />
        <style>
          * { box-sizing: border-box; }
          html, body { width: 1200px; height: 630px; margin: 0; overflow: hidden; }
          body {
            background: #f6f5f1;
            color: #181918;
            font-family: Arial, Helvetica, sans-serif;
          }
          main {
            display: flex;
            width: 100%;
            height: 100%;
            align-items: center;
            justify-content: center;
          }
          .brand {
            display: flex;
            align-items: center;
            gap: 54px;
            transform: translateY(-2px);
          }
          .symbol { width: 164px; height: 164px; }
          .symbol svg { display: block; width: 100%; height: 100%; }
          .name {
            font-size: 92px;
            font-weight: 700;
            line-height: 1;
            letter-spacing: .015em;
          }
        </style>
      </head>
      <body>
        <main>
          <div class="brand"><div class="symbol">${symbol}</div><span class="name">SIFEGO</span></div>
        </main>
      </body>
    </html>`);
  await page.screenshot({ path: outputPath, type: "png" });
  console.log(`Imagem social gerada em ${outputPath}`);
} finally {
  await browser.close();
}
