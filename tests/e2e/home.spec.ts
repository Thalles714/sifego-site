import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("preserva a proposta, a conversão única e a estrutura final", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Soluções digitais para o que seu negócio precisa.",
  );
  const topbarCta = page.locator(".contact-chip");
  await expect(topbarCta).toHaveText("Contato");
  await expect(topbarCta).toHaveAttribute("href", /wa\.me/);

  const meetingCtas = page.locator(
    ".rail-card__cta, .studio-panel__cta, .site-footer__cta",
  );
  await expect(meetingCtas).toHaveCount(3);
  await expect(meetingCtas).toHaveText([
    "Agende uma reunião",
    "Agende uma reunião",
    "Agende uma reunião",
  ]);
  await expect(page.locator(".rail-card__support")).toHaveText("Agenda aberta");
  await expect(page.getByRole("link", { name: "Privacidade" })).toHaveAttribute(
    "href",
    "/politica-de-privacidade",
  );
  await expect(page.locator("main > section")).toHaveCount(4);
  expect(
    await page.locator("main > section").evaluateAll((sections) =>
      sections.map((section) => section.id),
    ),
  ).toEqual(["inicio", "projetos", "servicos", "como-trabalhamos"]);
  await expect(page.locator(".project-logos")).toHaveCount(0);
  const externalLinks = page.locator('a[target="_blank"]');
  await expect(externalLinks).toHaveCount(10);
  expect(
    await externalLinks.evaluateAll((links) =>
      links.every((link) => link.getAttribute("rel") === "noopener noreferrer"),
    ),
  ).toBe(true);
  for (const link of await externalLinks.all()) {
    await expect(link).toHaveAttribute("aria-label", /abre outro site em nova aba/);
  }
  await expect(page.locator(".external-action")).toHaveCount(4);
  expect(
    await page.locator(".external-action").first().evaluate((link) =>
      getComputedStyle(link, "::after").content.includes("↗"),
    ),
  ).toBe(true);

  const horizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(horizontalOverflow).toBeLessThanOrEqual(1);
});

test("sincroniza a abertura da hero e mantém poster e fallback", async ({ page }) => {
  await page.goto("/");

  const hero = page.locator(".hero");
  const showreel = page.locator(".showreel");
  const video = showreel.locator(".showreel__video");

  await expect.poll(() => hero.getAttribute("data-opening-state")).toMatch(/running|complete/);
  await expect(showreel.locator(".showreel__placeholder img")).toHaveCount(1);
  await expect(video).toHaveAttribute("poster", /01-sobre-citylight\.webp$/);
  await expect(video).toHaveAttribute("data-showreel-version", "v10");
  await expect(video.locator('source[media="(max-width: 767px)"]')).toHaveAttribute(
    "src",
    /showreel-sifego-brand-hero-mobile-v10\.mp4$/,
  );
  await expect(video.locator("source:not([media])")).toHaveAttribute(
    "src",
    /showreel-sifego-brand-hero-ultrawide-v10\.mp4$/,
  );
  await expect(hero.locator(".hero__top")).toHaveClass(/is-visible/);
});

test("apresenta os seis serviços na ordem canônica no trilho e na prancha", async ({ page }) => {
  await page.goto("/");

  const expectedServices = [
    "Sites e landing pages",
    "Tráfego pago",
    "Aplicativos personalizados",
    "Automações e integrações",
    "Branding",
    "Consultoria",
  ];

  const railCards = page.locator(".service-rail .rail-card");
  await expect(railCards).toHaveCount(7);
  await expect(railCards.locator("h2, h3")).toHaveText(["Sobre Sifego", ...expectedServices]);

  await page.getByRole("button", { name: "Mostrar o serviço Sites e landing pages" }).click();
  await expect(railCards.nth(1)).toBeFocused();
  await page.getByRole("button", { name: "Voltar ao início dos serviços" }).click();
  await expect(railCards.first()).toBeFocused();

  const proofs = page.locator(".service-proof");
  await expect(proofs).toHaveCount(6);
  await expect(proofs.locator("h3")).toHaveText(expectedServices);
  await expect(page.locator(".services__sticky, .services-index")).toHaveCount(0);

  const brandingVideo = page.locator("#servico-branding [data-service-video]");
  await expect(brandingVideo).toHaveAttribute("poster", /branding-sifego-system-v04-poster\.webp$/);
  await expect(brandingVideo).toHaveAttribute("data-branding-version", "v04");
  await expect(brandingVideo).not.toHaveAttribute("autoplay", "");
  await expect(brandingVideo.locator("source")).toHaveAttribute(
    "src",
    /branding-sifego-system-v04\.webm$/,
  );
});

test("mantém os projetos na ordem aprovada e sem linguagem de prompts", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator(".project-row__name")).toHaveText([
    "Workflow",
    "Nítido",
    "IdlePoke",
    "Clínica Voe Alto",
  ]);
  await expect(page.locator(".projects")).not.toContainText("prompts");
  await expect(page.locator(".project-row")).toHaveCount(4);
  await expect(page.locator(".project-frame")).toHaveCount(12);
});

test("fecha a narrativa com processo, estúdio e CTA real", async ({ page }) => {
  await page.goto("/");

  const process = page.locator("#como-trabalhamos");
  await expect(process.getByRole("heading", { level: 2 })).toContainText(
    "Atendimento direto, do início à entrega",
  );
  await expect(process.locator(".process-step__title")).toHaveText(["Entender", "Definir", "Criar"]);
  await expect(process).toContainText("liderado por Thalles Leal");
  await expect(process.getByRole("link", { name: "Agende uma reunião" })).toHaveAttribute(
    "href",
    /wa\.me/,
  );
  await expect(process.locator("img")).toHaveCount(0);
});

test("conclui o ciclo da marca do footer mesmo após a saída do ponteiro", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Interação exclusiva de ponteiro fino");
  await page.goto("/");

  const symbolLink = page.locator(".site-footer__symbol-link");
  await symbolLink.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1_100);
  await symbolLink.hover();
  await page.waitForTimeout(180);

  await expect
    .poll(() =>
      symbolLink.locator(".brand-symbol__module").evaluateAll((modules) =>
        modules.every((module) =>
          module.getAnimations().some((animation) => animation.playState === "running"),
        ),
      ),
    )
    .toBe(true);

  await page.mouse.move(600, 20);
  await page.waitForTimeout(1_000);
  const settledTransforms = await symbolLink.locator(".brand-symbol__module").evaluateAll((modules) =>
    modules.map((module) => getComputedStyle(module).transform),
  );
  expect(
    settledTransforms.every(
      (transform) => transform === "none" || transform === "matrix(1, 0, 0, 1, 0, 0)",
    ),
  ).toBe(true);
});

test("valida temas e mídias da nova narrativa", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "QA dirigido para desktop");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const themeToggle = page.locator(".theme-toggle");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await themeToggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await themeToggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

  await page.locator("#servicos").scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      page.locator(".service-proof img").evaluateAll((images) =>
        images.every(
          (image) => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0,
        ),
      ),
    )
    .toBe(true);

  await page.locator("#como-trabalhamos").scrollIntoViewIfNeeded();
  const horizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(horizontalOverflow).toBeLessThanOrEqual(1);
});

test("oferece pausa persistente para os vídeos contínuos", async ({ page }) => {
  await page.goto("/");

  const motionToggle = page.locator(".motion-toggle");
  await expect(motionToggle).toHaveAttribute("aria-pressed", "false");
  await motionToggle.click();
  await expect(motionToggle).toHaveAttribute("aria-pressed", "true");
  await expect(motionToggle).toHaveAttribute("aria-label", "Retomar vídeos");
  expect(
    await page.locator("video").evaluateAll((videos) =>
      (videos as HTMLVideoElement[]).every((video) => video.paused),
    ),
  ).toBe(true);
  await page.reload();
  await expect(page.locator(".motion-toggle")).toHaveAttribute("aria-pressed", "true");
  expect(
    await page.locator("video").evaluateAll((videos) =>
      (videos as HTMLVideoElement[]).every((video) => video.paused),
    ),
  ).toBe(true);
});

test("resolve serviços e processo em 390 por 844", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "QA dirigido para a largura móvel solicitada");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await page.locator("#servicos").scrollIntoViewIfNeeded();
  await expect(page.locator(".service-proof")).toHaveCount(6);
  await expect
    .poll(() =>
      page.locator(".service-proof img").evaluateAll((images) =>
        images.every((image) => (image as HTMLImageElement).naturalWidth > 0),
      ),
    )
    .toBe(true);

  await page.locator("#como-trabalhamos").scrollIntoViewIfNeeded();
  await expect(page.locator(".process-step")).toHaveCount(3);
  await expect(page.locator(".studio-panel__cta")).toBeVisible();

  const horizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(horizontalOverflow).toBeLessThanOrEqual(1);
});

test("menu móvel funciona por teclado", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Fluxo específico do menu móvel");
  await page.goto("/");

  const toggle = page.getByRole("button", { name: "Menu", exact: true });
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#mobile-services-menu")).toContainText("Como trabalhamos");
  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toBeFocused();
});

test("respeita preferência por movimento reduzido", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const videoStates = await page.locator("video").evaluateAll((elements) =>
    (elements as HTMLVideoElement[]).map((video) => video.paused),
  );
  expect(videoStates.every(Boolean)).toBe(true);
  await expect(page.locator(".service-showcase__title-line-inner").first()).toBeVisible();
  await expect(page.locator(".service-proof").first()).toBeVisible();
  await expect(page.locator(".studio-panel")).toBeVisible();
});

test("não apresenta violações automáticas críticas ou sérias de acessibilidade", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  expect(
    results.violations.filter(
      (violation) => violation.impact === "critical" || violation.impact === "serious",
    ),
  ).toEqual([]);
});

test("não emite erros no console nem falhas de runtime nas rotas públicas", async ({ page }) => {
  const errors: string[] = [];
  const failedResponses: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") {
      const location = message.location();
      errors.push(`console: ${message.text()} (${location.url || "sem URL"})`);
    }
  });
  page.on("pageerror", (error) => errors.push(`runtime: ${error.message}`));
  page.on("response", (response) => {
    if (response.status() >= 400) failedResponses.push(`${response.status()} ${response.url()}`);
  });

  for (const route of ["/", "/politica-de-privacidade", "/manifest.webmanifest", "/robots.txt", "/sitemap.xml"]) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
  }

  expect(errors).toEqual([]);
  expect(failedResponses).toEqual([]);
});

test("mantém metadados e bloqueio de indexação antes da autorização", async ({ page, request }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Sifego | Soluções digitais sob medida para empresas");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /Sites, sistemas/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /og-sifego-v2\.png$/,
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image",
  );

  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("Disallow: /");

  const llms = await request.get("/llms.txt");
  expect(llms.status()).toBe(200);
  expect(llms.headers()["content-type"]).toContain("text/plain");
  expect(await llms.text()).toContain("Inteligência artificial e criação de prompts não fazem parte");

  const structuredData = page.locator('script[type="application/ld+json"]');
  await expect(structuredData).toHaveCount(1);
  const graph = JSON.parse(await structuredData.textContent() ?? "{}") as {
    "@graph"?: Array<{ "@type"?: string }>;
  };
  expect(graph["@graph"]?.filter((item) => item["@type"] === "Service")).toHaveLength(6);
  expect(graph["@graph"]?.some((item) => item["@type"] === "Organization")).toBe(true);
  await expect(page.locator('script[src*="googletagmanager.com"]')).toHaveCount(0);
  await expect(page.locator('a[data-analytics-event="whatsapp_click"]')).toHaveCount(5);
});

test("página de privacidade está disponível", async ({ page }) => {
  await page.goto("/politica-de-privacidade");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Política de privacidade");
  await expect(page.getByRole("link", { name: "Voltar para o site" })).toHaveAttribute("href", "/");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /\/politica-de-privacidade$/,
  );
});
