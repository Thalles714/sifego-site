"use client";

import { useEffect, useRef } from "react";

type BrandSymbolProps = {
  className?: string;
};

const modulePath = "M64 10A54 54 0 0 1 118 64H90A26 26 0 0 0 64 38Z";

const motion = [
  {
    collapse: "rotate(-318deg) scale(0.12)",
    anticipate: "rotate(3deg) scale(1.012)",
    overshoot: "rotate(7deg) scale(1.026)",
    settle: "rotate(-1.15deg) scale(0.996)",
  },
  {
    collapse: "rotate(286deg) scale(0.12)",
    anticipate: "rotate(-2.6deg) scale(1.012)",
    overshoot: "rotate(-6.4deg) scale(1.026)",
    settle: "rotate(1deg) scale(0.996)",
  },
  {
    collapse: "rotate(-254deg) scale(0.12)",
    anticipate: "rotate(2.2deg) scale(1.012)",
    overshoot: "rotate(5.6deg) scale(1.026)",
    settle: "rotate(-0.9deg) scale(0.996)",
  },
] as const;

function keyframesFor(index: number): Keyframe[] {
  const values = motion[index];

  return [
    { offset: 0, transform: "rotate(0deg) scale(1)", easing: "linear" },
    { offset: 0.045, transform: "rotate(0deg) scale(1)", easing: "cubic-bezier(0.45, 0, 0.72, 0.34)" },
    { offset: 0.105, transform: values.anticipate, easing: "cubic-bezier(0.58, 0, 0.9, 0.42)" },
    { offset: 0.29, transform: values.collapse, easing: "cubic-bezier(0.12, 0.78, 0.2, 1)" },
    { offset: 0.73, transform: values.overshoot, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
    { offset: 0.89, transform: values.settle, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
    { offset: 0.96, transform: "rotate(0deg) scale(1)", easing: "linear" },
    { offset: 1, transform: "rotate(0deg) scale(1)" },
  ];
}

export function BrandSymbol({ className = "" }: BrandSymbolProps) {
  const symbolRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const symbol = symbolRef.current;
    if (!symbol) return;

    const trigger = symbol.closest<HTMLElement>("a, button") ?? symbol;
    const modules = Array.from(symbol.querySelectorAll<SVGGElement>(".brand-symbol__module"));
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let activeAnimations: Animation[] = [];

    const play = () => {
      if (!finePointer.matches || reducedMotion.matches) return;
      if (activeAnimations.some((animation) => animation.playState === "running")) return;

      activeAnimations = modules.map((brandModule, index) =>
        brandModule.animate(keyframesFor(index), {
          duration: 940,
          iterations: 1,
        }),
      );

      void Promise.allSettled(activeAnimations.map((animation) => animation.finished)).then(() => {
        activeAnimations = [];
      });
    };

    trigger.addEventListener("pointerenter", play);

    return () => {
      trigger.removeEventListener("pointerenter", play);
      activeAnimations.forEach((animation) => animation.cancel());
    };
  }, []);

  return (
    <svg
      ref={symbolRef}
      className={`brand-symbol ${className}`.trim()}
      viewBox="0 0 128 128"
      aria-hidden="true"
      focusable="false"
    >
      <g className="brand-symbol__module brand-symbol__module--one">
        <path d={modulePath} />
      </g>
      <g className="brand-symbol__module brand-symbol__module--two">
        <g transform="rotate(120 64 64)">
          <path d={modulePath} />
        </g>
      </g>
      <g className="brand-symbol__module brand-symbol__module--three">
        <g transform="rotate(240 64 64)">
          <path d={modulePath} />
        </g>
      </g>
    </svg>
  );
}
