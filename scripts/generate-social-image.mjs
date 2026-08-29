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
            background:
              radial-gradient(circle at 78% 12%, rgba(231, 255, 89, .12), transparent 31%),
              linear-gradient(135deg, #181818 0%, #0f0f0f 100%);
            color: #f0f0f0;
            font-family: Arial, Helvetica, sans-serif;
          }
          main {
            position: relative;
            display: flex;
            width: 100%;
            height: 100%;
            padding: 68px 76px;
            flex-direction: column;
            justify-content: space-between;
            border: 1px solid rgba(240, 240, 240, .16);
          }
          main::after {
            content: "";
            position: absolute;
            right: -90px;
            bottom: -160px;
            width: 500px;
            height: 500px;
            border: 1px solid rgba(231, 255, 89, .22);
            border-radius: 50%;
          }
          .brand { display: flex; align-items: center; gap: 20px; font-size: 29px; font-weight: 650; letter-spacing: -.03em; }
          .symbol { width: 54px; height: 54px; color: #e7ff59; }
          .symbol svg { display: block; width: 100%; height: 100%; }
          .content { position: relative; z-index: 1; max-width: 920px; }
          h1 { margin: 0; max-width: 900px; font-size: 78px; line-height: .98; letter-spacing: -.055em; font-weight: 550; }
          p { margin: 30px 0 0; max-width: 820px; color: rgba(240, 240, 240, .72); font-size: 25px; line-height: 1.35; letter-spacing: -.018em; }
          .rule { position: absolute; left: 76px; right: 76px; bottom: 52px; height: 1px; background: rgba(240, 240, 240, .16); }
        </style>
      </head>
      <body>
        <main>
          <div class="brand"><div class="symbol">${symbol}</div><span>Sifego</span></div>
          <div class="content">
            <h1>Soluções digitais sob medida.</h1>
            <p>Sites, sistemas, automações, branding e campanhas com escopo definido para cada empresa.</p>
          </div>
          <div class="rule"></div>
        </main>
      </body>
    </html>`);
  await page.screenshot({ path: outputPath, type: "png" });
  console.log(`Imagem social gerada em ${outputPath}`);
} finally {
  await browser.close();
}
