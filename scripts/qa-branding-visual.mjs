import { chromium } from "playwright";
import path from "node:path";

const output = path.resolve("../assets/production/sifego/branding-film");
const browser = await chromium.launch({ headless: true });

try {
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktop.goto("http://localhost:3000/#servico-branding", { waitUntil: "domcontentloaded" });
  await desktop.waitForTimeout(2200);
  await desktop.screenshot({ path: path.join(output, "qa-branding-desktop.png") });
  const desktopState = await desktop.evaluate(() => {
    const panel = document.querySelector('[data-service-panel="branding"]');
    const video = panel.querySelector("video");
    return {
      opacity: getComputedStyle(panel).opacity,
      readyState: video.readyState,
      currentTime: video.currentTime,
      size: [video.videoWidth, video.videoHeight],
      horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    };
  });

  await desktop.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
  await desktop.locator(".brand-mark").hover();
  await desktop.waitForTimeout(340);
  await desktop.screenshot({ path: path.join(output, "qa-header-hover.png") });

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  await mobile.goto("http://localhost:3000/#servico-branding", { waitUntil: "domcontentloaded" });
  await mobile.waitForTimeout(1600);
  await mobile.screenshot({ path: path.join(output, "qa-branding-mobile.png") });
  const mobileState = await mobile.evaluate(() => {
    const film = document.querySelector("#servico-branding .branding-film");
    const video = film.querySelector("video");
    const rect = film.getBoundingClientRect();
    return {
      rect: [rect.width, rect.height],
      readyState: video.readyState,
      paused: video.paused,
      horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    };
  });

  const reduced = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  await reduced.goto("http://localhost:3000/#servico-branding", { waitUntil: "domcontentloaded" });
  const reducedState = await reduced.evaluate(() => {
    const video = document.querySelector('[data-service-panel="branding"] video');
    const poster = document.querySelector('[data-service-panel="branding"] .branding-film__poster');
    return {
      videoDisplay: getComputedStyle(video).display,
      videoPaused: video.paused,
      posterDisplay: getComputedStyle(poster).display,
    };
  });

  console.log(JSON.stringify({ desktop: desktopState, mobile: mobileState, reduced: reducedState }, null, 2));
} finally {
  await browser.close();
}

