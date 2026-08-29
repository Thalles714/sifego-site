import { chromium } from "playwright";
import path from "node:path";

const output = path.resolve("../assets/production/sifego/branding-film");
const browser = await chromium.launch({ headless: true });

try {
  const frames = await browser.newPage({ viewport: { width: 1200, height: 1000 } });
  await frames.setContent(`
    <style>html,body{margin:0;background:#11110f}video{display:block;width:1200px;height:1000px}</style>
    <video muted preload="auto" src="http://localhost:3000/assets/production/site/services/branding-sifego-system-v02.webm"></video>
  `);
  const video = frames.locator("video");
  await video.evaluate((element) => new Promise((resolve, reject) => {
    if (element.readyState >= 2) resolve();
    else {
      element.addEventListener("loadeddata", resolve, { once: true });
      element.addEventListener("error", reject, { once: true });
    }
  }));

  for (const time of [0.38, 0.72, 1.18, 1.72, 4.62, 6.4]) {
    await video.evaluate((element, nextTime) => {
      element.pause();
      element.currentTime = nextTime;
    }, time);
    await frames.waitForTimeout(180);
    await video.screenshot({
      path: path.join(output, `qa-v02-${String(time).replace(".", "-")}s.png`),
    });
  }

  const site = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await site.goto("http://localhost:3000/#servico-branding", { waitUntil: "domcontentloaded" });
  await site.waitForTimeout(1600);
  const siteState = await site.evaluate(() => {
    const panel = document.querySelector('[data-service-panel="branding"]');
    const activeVideo = panel.querySelector("video");
    return {
      readyState: activeVideo.readyState,
      size: [activeVideo.videoWidth, activeVideo.videoHeight],
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    };
  });

  await site.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
  const mark = site.locator(".brand-mark");
  await mark.hover();
  await site.waitForTimeout(235);
  const hoverState = await mark.locator(".brand-symbol__module").evaluateAll((modules) =>
    modules.map((module) => getComputedStyle(module).transform),
  );

  console.log(JSON.stringify({ site: siteState, hoverTransforms: hoverState }, null, 2));
} finally {
  await browser.close();
}
