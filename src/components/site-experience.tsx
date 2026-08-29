"use client";

import { useEffect } from "react";

type ScrambleController = {
  reveal: () => void;
  restore: () => void;
};

type NetworkInformation = {
  saveData?: boolean;
};

function elements<T extends Element>(selector: string, scope: ParentNode = document): T[] {
  return Array.from(scope.querySelectorAll<T>(selector));
}

function prepareScramble(
  title: HTMLElement | null,
  lineSelector: string,
  characterClass: string,
  ariaLabel: string,
  revealContainer: HTMLElement | null,
  reduceMotion: MediaQueryList,
  timeoutIds: number[],
): ScrambleController {
  const lines = title ? elements<HTMLElement>(lineSelector, title) : [];
  let revealed = false;

  if (title && lines.length && title.dataset.scramblePrepared !== "true") {
    title.dataset.scramblePrepared = "true";
    title.setAttribute("aria-label", ariaLabel);
    let characterIndex = 0;

    for (const line of lines) {
      const walker = document.createTreeWalker(line, NodeFilter.SHOW_TEXT);
      const textNodes: Text[] = [];
      while (walker.nextNode()) textNodes.push(walker.currentNode as Text);

      for (const textNode of textNodes) {
        const fragment = document.createDocumentFragment();
        for (const character of Array.from(textNode.nodeValue ?? "")) {
          if (/^[\p{L}\p{N}]$/u.test(character)) {
            const span = document.createElement("span");
            span.className = characterClass;
            span.dataset.original = character;
            span.dataset.scramble = String(characterIndex % 2 === 0);
            span.textContent = character;
            fragment.append(span);
            characterIndex += 1;
          } else {
            fragment.append(document.createTextNode(character));
          }
        }
        textNode.replaceWith(fragment);
      }
      line.setAttribute("aria-hidden", "true");
    }
  }

  const restore = () => {
    for (const line of lines) {
      for (const character of elements<HTMLElement>(`.${characterClass}`, line)) {
        character.textContent = character.dataset.original ?? "";
      }
    }
  };

  restore();
  revealContainer?.classList.remove("is-visible");

  const reveal = () => {
    if (revealed || !revealContainer) return;
    revealed = true;
    revealContainer.classList.add("is-visible");

    if (reduceMotion.matches) {
      restore();
      return;
    }

    const uppercase = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    const lowercase = "abcdefghijkmnopqrstuvwxyz";
    const digits = "0123456789";

    lines.forEach((line) => {
      const characters = elements<HTMLElement>('[data-scramble="true"]', line);
      const startDelay = 0;

      for (let step = 0; step < 4; step += 1) {
        const timeoutId = window.setTimeout(() => {
          for (const character of characters) {
            const original = character.dataset.original ?? "";
            if (step === 3) {
              character.textContent = original;
              continue;
            }

            const pool = /\d/.test(original)
              ? digits
              : original === original.toUpperCase() && original !== original.toLowerCase()
                ? uppercase
                : lowercase;
            character.textContent = pool[Math.floor(Math.random() * pool.length)];
          }
        }, startDelay + step * 100);
        timeoutIds.push(timeoutId);
      }
    });
  };

  return { reveal, restore };
}

function initializeSiteExperience(): () => void {
  const abortController = new AbortController();
  const { signal } = abortController;
  const observers: IntersectionObserver[] = [];
  const timeoutIds: number[] = [];
  const frameIds: number[] = [];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const root = document.documentElement;
  const saveData = (navigator as Navigator & { connection?: NetworkInformation }).connection?.saveData === true;
  if (saveData) root.dataset.saveData = "true";

  let videoMotionPaused = false;
  try {
    videoMotionPaused = localStorage.getItem("sifego-video-motion") === "paused";
  } catch {
    // Storage can be unavailable in privacy-restricted browsing contexts.
  }

  const hero = document.querySelector<HTMLElement>(".hero");
  const heroTop = hero?.querySelector<HTMLElement>(".hero__top") ?? null;
  const heroTitle = hero?.querySelector<HTMLElement>(".hero__title") ?? null;
  const heroScramble = prepareScramble(
    heroTitle,
    ".headline-line__inner",
    "hero__title-char",
    "Soluções digitais para o que seu negócio precisa.",
    heroTop,
    reduceMotion,
    timeoutIds,
  );
  const heroOpeningAnimations: Animation[] = [];
  let heroOpeningStarted = false;

  if (hero) {
    if (reduceMotion.matches) {
      hero.dataset.openingState = "complete";
      heroScramble.reveal();
    } else {
      hero.classList.add("hero--motion");
      hero.dataset.openingState = "waiting-for-video";
    }
  }

  if (!reduceMotion.matches) {
    const openingGroups = [
      {
        selector: ".brand-mark, .service-nav, .mobile-services-toggle, .topbar__right",
        offset: "translateY(-7px)",
        duration: 500,
      },
      { selector: ".service-rail-shell", offset: "translateY(16px)", duration: 800 },
    ];

    for (const group of openingGroups) {
      for (const element of elements<HTMLElement>(group.selector)) {
        const animation = element.animate(
          [
            { opacity: 0, transform: group.offset },
            { opacity: 1, transform: "translateY(0)" },
          ],
          {
            duration: group.duration,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            fill: "both",
          },
        );
        animation.pause();
        heroOpeningAnimations.push(animation);
      }
    }
  }

  const themeToggle = document.querySelector<HTMLButtonElement>(".theme-toggle");
  const setThemeLabel = () => {
    if (!themeToggle) return;
    const isDark = root.dataset.theme !== "light";
    themeToggle.setAttribute("aria-label", isDark ? "Ativar tema claro" : "Ativar tema escuro");
  };

  themeToggle?.addEventListener(
    "click",
    () => {
      root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
      try {
        localStorage.setItem("sifego-theme", root.dataset.theme);
      } catch {
        // The selected theme remains valid for the current page session.
      }
      setThemeLabel();
    },
    { signal },
  );
  setThemeLabel();

  const motionToggle = document.querySelector<HTMLButtonElement>(".motion-toggle");
  const setMotionLabel = () => {
    if (!motionToggle) return;
    const isPaused = videoMotionPaused || reduceMotion.matches || saveData;
    motionToggle.setAttribute("aria-pressed", String(videoMotionPaused));
    motionToggle.dataset.state = isPaused ? "paused" : "playing";
    motionToggle.setAttribute(
      "aria-label",
      videoMotionPaused ? "Retomar vídeos" : "Pausar vídeos",
    );
    motionToggle.title = videoMotionPaused ? "Retomar vídeos" : "Pausar vídeos";
  };
  setMotionLabel();

  const mobileToggle = document.querySelector<HTMLButtonElement>(".mobile-services-toggle");
  const mobileMenu = document.querySelector<HTMLElement>(".mobile-menu");
  const closeMobileMenu = () => {
    if (!mobileMenu || !mobileToggle) return;
    mobileMenu.hidden = true;
    mobileToggle.setAttribute("aria-expanded", "false");
  };

  mobileToggle?.addEventListener(
    "click",
    () => {
      if (!mobileMenu) return;
      const shouldOpen = mobileMenu.hidden;
      mobileMenu.hidden = !shouldOpen;
      mobileToggle.setAttribute("aria-expanded", String(shouldOpen));
    },
    { signal },
  );

  for (const link of mobileMenu ? elements<HTMLAnchorElement>("a[href^='#']", mobileMenu) : []) {
    link.addEventListener("click", closeMobileMenu, { signal });
  }

  document.addEventListener(
    "pointerdown",
    (event) => {
      if (
        mobileMenu &&
        mobileToggle &&
        !mobileMenu.hidden &&
        event.target instanceof Node &&
        !mobileMenu.contains(event.target) &&
        !mobileToggle.contains(event.target)
      ) {
        closeMobileMenu();
      }
    },
    { signal },
  );

  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape" && mobileMenu && !mobileMenu.hidden) {
        closeMobileMenu();
        mobileToggle?.focus();
      }
    },
    { signal },
  );

  const rail = document.querySelector<HTMLElement>(".service-rail");
  const railFade = document.querySelector<HTMLElement>(".service-rail__fade");
  const cards = elements<HTMLElement>(".rail-card");
  const railStepButtons = elements<HTMLButtonElement>("[data-rail-step]");

  const updateRailFade = () => {
    if (!rail) return;
    const hasMoreContent = rail.scrollTop + rail.clientHeight < rail.scrollHeight - 3;
    railFade?.classList.toggle("is-hidden", !hasMoreContent);
  };

  const scrollToCard = (card: HTMLElement | undefined, movePage = false) => {
    if (!rail || !card) return;
    const behavior: ScrollBehavior = reduceMotion.matches ? "auto" : "smooth";

    if (movePage && window.innerWidth <= 991) {
      rail.scrollIntoView({ behavior, block: "start" });
      const timeoutId = window.setTimeout(
        () => rail.scrollTo({ top: card.offsetTop, behavior: "auto" }),
        reduceMotion.matches ? 0 : 260,
      );
      timeoutIds.push(timeoutId);
    } else {
      rail.scrollTo({ top: card.offsetTop, behavior: "auto" });
    }
  };

  for (const button of railStepButtons) {
    button.addEventListener(
      "click",
      () => {
        const card = cards.find((item) => item.dataset.card === button.dataset.railStep);
        scrollToCard(card);
        const timeoutId = window.setTimeout(
          () => card?.focus({ preventScroll: true }),
          reduceMotion.matches ? 0 : 500,
        );
        timeoutIds.push(timeoutId);
      },
      { signal },
    );
  }

  rail?.addEventListener(
    "keydown",
    (event) => {
      if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
      if (event.target instanceof Element && event.target.closest("button, a")) return;

      event.preventDefault();
      const focusedCard =
        document.activeElement instanceof Element
          ? document.activeElement.closest<HTMLElement>(".rail-card")
          : null;
      const focusedIndex = focusedCard ? cards.indexOf(focusedCard) : -1;
      const nearestIndex = cards.reduce(
        (bestIndex, card, index) =>
          Math.abs(card.offsetTop - rail.scrollTop) <
          Math.abs(cards[bestIndex].offsetTop - rail.scrollTop)
            ? index
            : bestIndex,
        0,
      );
      const currentIndex = focusedIndex >= 0 ? focusedIndex : nearestIndex;
      const targetIndex =
        event.key === "Home"
          ? 0
          : event.key === "End"
            ? cards.length - 1
            : event.key === "ArrowDown"
              ? Math.min(currentIndex + 1, cards.length - 1)
              : Math.max(currentIndex - 1, 0);
      const targetCard = cards[targetIndex];
      scrollToCard(targetCard);
      targetCard?.focus({ preventScroll: true });
    },
    { signal },
  );

  rail?.addEventListener(
    "scroll",
    () => {
      updateRailFade();
    },
    { passive: true, signal },
  );
  window.addEventListener("resize", updateRailFade, { passive: true, signal });
  updateRailFade();

  const showreel = document.querySelector<HTMLElement>(".showreel");
  const showreelVideo = document.querySelector<HTMLVideoElement>(".showreel__video");
  const startHeroOpening = () => {
    if (
      !hero ||
      !showreel ||
      !showreelVideo ||
      heroOpeningStarted ||
      reduceMotion.matches ||
      document.hidden
    ) {
      return;
    }

    heroOpeningStarted = true;
    const frameId = window.requestAnimationFrame(() => {
      if (signal.aborted) return;

      const videoIsReady = showreelVideo.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA;
      if (videoIsReady) {
        showreelVideo.pause();
        showreelVideo.currentTime = 0;
      }

      const openingToken = `${performance.timeOrigin}-${performance.now()}`;
      hero.dataset.openingToken = openingToken;
      showreelVideo.dataset.openingToken = openingToken;
      hero.dataset.openingState = "running";

      if (videoIsReady) showreel.classList.add("has-video");
      heroScramble.reveal();
      heroOpeningAnimations.forEach((animation) => animation.play());
      if (videoIsReady && !videoMotionPaused && !saveData) {
        void showreelVideo.play().catch(() => undefined);
      }

      const timeoutId = window.setTimeout(() => {
        hero.dataset.openingState = "complete";
      }, 1_100);
      timeoutIds.push(timeoutId);
    });
    frameIds.push(frameId);
  };

  const syncShowreel = () => {
    if (!showreelVideo) return;
    if (reduceMotion.matches) {
      showreelVideo.pause();
      showreelVideo.currentTime = 0;
      return;
    }
    if (videoMotionPaused || saveData || document.hidden) {
      showreelVideo.pause();
      return;
    }
    if (!heroOpeningStarted) {
      startHeroOpening();
      return;
    }
    if (showreelVideo.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      showreel?.classList.add("has-video");
    }
    void showreelVideo.play().catch(() => undefined);
  };

  if (showreelVideo?.querySelector("source[src]")) {
    showreelVideo.addEventListener(
      "error",
      () => showreel?.classList.add("is-video-failed"),
      { once: true, signal },
    );
    const handleShowreelLoaded = () => {
      if (!heroOpeningStarted) startHeroOpening();
      else syncShowreel();
    };
    if (showreelVideo.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) handleShowreelLoaded();
    else showreelVideo.addEventListener("loadeddata", handleShowreelLoaded, { once: true, signal });
    showreelVideo.load();
    const openingFallbackId = window.setTimeout(startHeroOpening, 1_200);
    timeoutIds.push(openingFallbackId);
  }
  document.addEventListener("visibilitychange", syncShowreel, { signal });

  const projects = document.querySelector<HTMLElement>(".projects");
  const projectsIntro = projects?.querySelector<HTMLElement>(".projects__intro") ?? null;
  const projectsTitle = projects?.querySelector<HTMLElement>(".projects__title") ?? null;
  const projectsScramble = prepareScramble(
    projectsTitle,
    ".projects__title-line-inner",
    "projects__title-char",
    "Em parceria com equipes ambiciosas para criar experiências digitais relevantes na era dos prompts.",
    projectsIntro,
    reduceMotion,
    timeoutIds,
  );
  const projectRows = projects ? elements<HTMLElement>(".project-row", projects) : [];
  const projectVideos = projects ? elements<HTMLVideoElement>("video", projects) : [];

  const revealAllProjects = () => {
    projects?.classList.remove("projects--motion");
    projectsIntro?.classList.add("is-visible");
    projectRows.forEach((row) => row.classList.add("is-visible"));
    projectsScramble.restore();
  };

  if (projects && !reduceMotion.matches && "IntersectionObserver" in window) {
    projects.classList.add("projects--motion");
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (entry.target === projectsIntro) projectsScramble.reveal();
          else entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    observers.push(revealObserver);
    if (projectsIntro) revealObserver.observe(projectsIntro);
    projectRows.forEach((row) => revealObserver.observe(row));
  } else {
    revealAllProjects();
  }

  if (projectVideos.length && "IntersectionObserver" in window) {
    const videoObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = entry.target as HTMLVideoElement;
          if (reduceMotion.matches || saveData || videoMotionPaused) {
            video.pause();
          } else if (entry.isIntersecting) {
            if (video.readyState === HTMLMediaElement.HAVE_NOTHING) video.load();
            void video.play().catch(() => video.closest(".project-frame")?.classList.add("is-video-blocked"));
          } else {
            video.pause();
          }
        }
      },
      { rootMargin: "160px 0px", threshold: 0.08 },
    );
    observers.push(videoObserver);
    projectVideos.forEach((video) => videoObserver.observe(video));
  }

  for (const image of projects ? elements<HTMLImageElement>("img", projects) : []) {
    image.addEventListener(
      "error",
      () => image.closest(".project-frame")?.classList.add("is-failed"),
      { once: true, signal },
    );
  }

  const serviceShowcase = document.querySelector<HTMLElement>(".service-showcase");
  const serviceShowcaseIntro =
    serviceShowcase?.querySelector<HTMLElement>(".service-showcase__intro") ?? null;
  const serviceShowcaseTitle =
    serviceShowcase?.querySelector<HTMLElement>(".service-showcase__title") ?? null;
  const serviceShowcaseScramble = prepareScramble(
    serviceShowcaseTitle,
    ".service-showcase__title-line-inner",
    "service-showcase__title-char",
    "Nossos experimentos, produtos e curiosidade moldam novas formas de trabalhar.",
    serviceShowcaseIntro,
    reduceMotion,
    timeoutIds,
  );
  const serviceProofs = serviceShowcase
    ? elements<HTMLElement>("[data-service-proof]", serviceShowcase)
    : [];
  const serviceProofVideos = serviceShowcase
    ? elements<HTMLVideoElement>("[data-service-video]", serviceShowcase)
    : [];

  const revealAllServiceProofs = () => {
    serviceShowcase?.classList.remove("service-showcase--motion");
    serviceShowcaseIntro?.classList.add("is-visible");
    serviceProofs.forEach((proof) => proof.classList.add("is-visible"));
    serviceShowcaseScramble.restore();
  };

  if (serviceShowcase && !reduceMotion.matches && "IntersectionObserver" in window) {
    serviceShowcase.classList.add("service-showcase--motion");
    const serviceProofObserver = new IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (entry.target === serviceShowcaseIntro) serviceShowcaseScramble.reveal();
          else entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );
    observers.push(serviceProofObserver);
    if (serviceShowcaseIntro) serviceProofObserver.observe(serviceShowcaseIntro);
    serviceProofs.forEach((proof) => serviceProofObserver.observe(proof));
  } else {
    revealAllServiceProofs();
  }

  for (const image of serviceShowcase ? elements<HTMLImageElement>("img", serviceShowcase) : []) {
    image.addEventListener(
      "error",
      () => image.closest(".service-proof__media")?.classList.add("is-failed"),
      { once: true, signal },
    );
  }

  serviceProofVideos.forEach((video) => {
    video.addEventListener(
      "error",
      () => video.closest(".service-proof__media")?.classList.add("is-failed"),
      { once: true, signal },
    );
  });

  if (serviceProofVideos.length && "IntersectionObserver" in window) {
    const serviceProofVideoObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = entry.target as HTMLVideoElement;
          if (reduceMotion.matches || saveData || videoMotionPaused || !entry.isIntersecting) video.pause();
          else void video.play().catch(() => undefined);
        }
      },
      { threshold: 0.08, rootMargin: "120px 0px" },
    );
    observers.push(serviceProofVideoObserver);
    serviceProofVideos.forEach((video) => serviceProofVideoObserver.observe(video));
  }

  const playVisibleVideo = (video: HTMLVideoElement, margin: number) => {
    const bounds = video.getBoundingClientRect();
    if (bounds.bottom < -margin || bounds.top > window.innerHeight + margin) return;
    if (video.readyState === HTMLMediaElement.HAVE_NOTHING) video.load();
    void video.play().catch(() => undefined);
  };

  motionToggle?.addEventListener(
    "click",
    () => {
      videoMotionPaused = !videoMotionPaused;
      try {
        localStorage.setItem("sifego-video-motion", videoMotionPaused ? "paused" : "playing");
      } catch {
        // The control remains valid for the current page session.
      }
      setMotionLabel();

      if (videoMotionPaused || reduceMotion.matches || saveData) {
        elements<HTMLVideoElement>("video").forEach((video) => video.pause());
        return;
      }

      syncShowreel();
      projectVideos.forEach((video) => playVisibleVideo(video, 160));
      serviceProofVideos.forEach((video) => playVisibleVideo(video, 120));
    },
    { signal },
  );

  const processSection = document.querySelector<HTMLElement>(".process-section");
  const processIntro = processSection?.querySelector<HTMLElement>(".process-section__intro") ?? null;
  const processTitle = processSection?.querySelector<HTMLElement>(".process-section__title") ?? null;
  const processScramble = prepareScramble(
    processTitle,
    ".process-section__title-line-inner",
    "process-section__title-char",
    "Um estúdio que valoriza um bom trabalho e cultiva as relações que o tornam possível.",
    processIntro,
    reduceMotion,
    timeoutIds,
  );
  const processItems = processSection
    ? elements<HTMLElement>(".process-step, .studio-panel", processSection)
    : [];

  const revealAllProcess = () => {
    processSection?.classList.remove("process-section--motion");
    processIntro?.classList.add("is-visible");
    processItems.forEach((item) => item.classList.add("is-visible"));
    processScramble.restore();
  };

  if (processSection && !reduceMotion.matches && "IntersectionObserver" in window) {
    processSection.classList.add("process-section--motion");
    const processObserver = new IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (entry.target === processIntro) processScramble.reveal();
          else entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );
    observers.push(processObserver);
    if (processIntro) processObserver.observe(processIntro);
    processItems.forEach((item) => processObserver.observe(item));
  } else {
    revealAllProcess();
  }

  const footer = document.querySelector<HTMLElement>(".site-footer");
  const footerClosing = footer?.querySelector<HTMLElement>(".site-footer__closing") ?? null;
  const year = footer?.querySelector<HTMLElement>("[data-current-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  if (footer && footerClosing && !reduceMotion.matches && "IntersectionObserver" in window) {
    footer.classList.add("site-footer--motion");
    const footerObserver = new IntersectionObserver(
      (entries, observer) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        footerClosing.classList.add("is-visible");
        observer.disconnect();
      },
      { threshold: 0.12 },
    );
    observers.push(footerObserver);
    footerObserver.observe(footerClosing);
  } else {
    footerClosing?.classList.add("is-visible");
  }

  reduceMotion.addEventListener(
    "change",
    () => {
      if (reduceMotion.matches) {
        hero?.classList.remove("hero--motion");
        heroOpeningAnimations.forEach((animation) => animation.finish());
        heroScramble.restore();
        revealAllProjects();
        revealAllServiceProofs();
        revealAllProcess();
        footer?.classList.remove("site-footer--motion");
        footerClosing?.classList.add("is-visible");
        projectVideos.forEach((video) => video.pause());
        serviceProofVideos.forEach((video) => video.pause());
      }
      setMotionLabel();
      syncShowreel();
    },
    { signal },
  );

  return () => {
    abortController.abort();
    observers.forEach((observer) => observer.disconnect());
    timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
    frameIds.forEach((frameId) => window.cancelAnimationFrame(frameId));
    heroOpeningAnimations.forEach((animation) => animation.cancel());
  };
}

export function SiteExperience() {
  useEffect(() => initializeSiteExperience(), []);
  return null;
}
