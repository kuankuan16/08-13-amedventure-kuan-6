"use client";

import { useRef } from "react";
import { PORTFOLIO, CONTACT_MAILTO } from "@/lib/amed/content";
import { Roll, gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "./motion";

/** Fixed bottom bar (M11) with the portfolio-name marquee (M10). */
export function BottomBar() {
  const ref = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { yPercent: 110 });
    const trigger = ScrollTrigger.create({
      start: () => window.innerHeight * 1.5,
      end: () => ScrollTrigger.maxScroll(window) + window.innerHeight,
      onToggle: (self) => {
        gsap.to(el, {
          yPercent: self.isActive ? 0 : 110,
          duration: 0.8,
          ease: "quint.out",
        });
      },
    });
    return () => trigger.kill();
  }, []);

  const names = PORTFOLIO.companies.map((c) => c.name);

  return (
    <div
      ref={ref}
      className="fixed inset-x-0 bottom-0 z-[90] hidden items-stretch md:flex"
      style={{
        height: "3.25rem",
        backgroundColor: "rgba(5,11,35,0.86)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        color: "var(--chalk-60)",
      }}
    >
      <div className="relative flex-1 overflow-hidden" aria-hidden>
        <div className="marquee-track h-full items-center">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex h-full items-center">
              {names.map((name) => (
                <span
                  key={`${copy}-${name}`}
                  className="t-small flex items-center whitespace-nowrap px-5 tracking-wide"
                >
                  {name}
                  <span className="ml-10 inline-block h-1 w-1 rounded-full" style={{ backgroundColor: "var(--cyan)" }} />
                </span>
              ))}
            </div>
          ))}
        </div>
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-24"
          style={{ background: "linear-gradient(to left, rgba(5,11,35,1), transparent)" }}
        />
      </div>
      <a
        href={CONTACT_MAILTO}
        className="t-small flex items-center px-7 font-medium"
        style={{ backgroundColor: "var(--cyan)", color: "var(--chalk)" }}
      >
        <Roll>Share your company</Roll>
      </a>
    </div>
  );
}
