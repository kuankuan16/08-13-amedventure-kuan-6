"use client";

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);

export { gsap, ScrollTrigger, SplitText };

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* ------------------------------------------------------------------
   Smooth scroll (M1) — Lenis driven by the GSAP ticker
   ------------------------------------------------------------------ */

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({ lerp: 0.11, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Route in-page anchors through Lenis so its virtual scroll state
    // never desyncs from a native hash jump.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest?.('a[href^="#"]');
      if (!link) return;
      const target = document.querySelector(link.getAttribute("href") ?? "");
      if (!target) return;
      e.preventDefault();
      // Tween a proxy and let Lenis apply every frame — one writer, no fighting.
      const proxy = { y: window.scrollY };
      const targetY =
        window.scrollY + (target as HTMLElement).getBoundingClientRect().top;
      gsap.to(proxy, {
        y: targetY,
        duration: 1.5,
        ease: "quint.inOut",
        overwrite: "auto",
        onUpdate: () => lenis.scrollTo(proxy.y, { immediate: true, force: true }),
      });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>{children}</LenisContext.Provider>
  );
}

/* ------------------------------------------------------------------
   Line-mask reveal (M4) — headings split into masked lines that
   rise into view, staggered, when they enter the viewport.
   ------------------------------------------------------------------ */

type LinesProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  /** seconds added before the first line moves */
  delay?: number;
  /** start immediately instead of on scroll (hero) */
  immediate?: boolean;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Lines<T extends ElementType = "div">({
  as,
  children,
  delay = 0,
  immediate = false,
  className = "",
  ...rest
}: LinesProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const split = new SplitText(el, {
        type: "lines",
        linesClass: "split-line-inner",
      });
      // wrap each line in an overflow-hidden mask
      split.lines.forEach((line) => {
        const mask = document.createElement("div");
        mask.className = "split-line";
        line.parentNode?.insertBefore(mask, line);
        mask.appendChild(line);
      });
      gsap.set(split.lines, { yPercent: 110 });
      const tween = gsap.to(split.lines, {
        yPercent: 0,
        duration: 1.1,
        ease: "quint.out",
        stagger: 0.13,
        delay,
        paused: !immediate,
      });
      if (!immediate) {
        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          once: true,
          onEnter: () => tween.play(),
        });
      }
    }, el);

    return () => ctx.revert();
  }, [delay, immediate]);

  return (
    <Tag ref={ref} className={`line-mask ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------
   Fade-up reveal for paragraphs / blocks
   ------------------------------------------------------------------ */

export function FadeUp({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.set(el, { autoAlpha: 0, y });
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        once: true,
        onEnter: () =>
          gsap.to(el, { autoAlpha: 1, y: 0, duration: 1.1, ease: "quint.out", delay }),
      });
    }, el);
    return () => ctx.revert();
  }, [delay, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------
   Hover roll label (M5) — duplicated label rolls up on hover
   ------------------------------------------------------------------ */

export function Roll({ children }: { children: string }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden>{children}</span>
    </span>
  );
}

/* ------------------------------------------------------------------
   Parallax media — image drifts slower than the scroll (scrubbed)
   ------------------------------------------------------------------ */

export function Parallax({
  children,
  amount = 12,
  className = "",
}: {
  children: ReactNode;
  /** percent of element height the inner layer travels */
  amount?: number;
  className?: string;
}) {
  const outer = useRef<HTMLDivElement | null>(null);
  const inner = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (!outer.current || !inner.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner.current,
        { yPercent: -amount / 2 },
        {
          yPercent: amount / 2,
          ease: "none",
          scrollTrigger: {
            trigger: outer.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, outer);
    return () => ctx.revert();
  }, [amount]);

  return (
    <div ref={outer} className={`overflow-hidden ${className}`}>
      <div ref={inner} className="relative h-full w-full" style={{ scale: `${1 + amount / 100}` }}>
        {children}
      </div>
    </div>
  );
}
