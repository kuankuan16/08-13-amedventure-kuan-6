"use client";

import { useRef } from "react";
import { FIRM } from "@/lib/amed/content";
import { Lines, FadeUp, gsap, useIsomorphicLayoutEffect } from "./motion";

/**
 * The Firm (M12 + bg-expand): statement with line reveals, then the studio
 * film expands from an inset mask to full-bleed as you scroll (scrubbed).
 */
export function Firm() {
  const root = useRef<HTMLElement | null>(null);
  const mask = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        mask.current,
        { clipPath: "inset(12% 18% 12% 18% round 1.5rem)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0rem)",
          ease: "none",
          scrollTrigger: {
            trigger: mask.current,
            start: "top 85%",
            end: "top 15%",
            scrub: true,
          },
        }
      );
      gsap.fromTo(
        "[data-firm-video]",
        { scale: 1.15 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: mask.current,
            start: "top 85%",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative"
      style={{ backgroundColor: "var(--chalk)", color: "var(--ink)" }}
    >
      <div
        className="grid gap-x-16 md:grid-cols-[1fr_minmax(0,26rem)]"
        style={{ paddingInline: "var(--pad)", paddingBlock: "clamp(6rem, 14vh, 11rem)" }}
      >
        <div>
          <FadeUp>
            <p className="t-eyebrow" style={{ color: "var(--cyan)" }}>
              {FIRM.eyebrow}
            </p>
          </FadeUp>
          <Lines as="h2" className="t-display-l mt-8">
            {FIRM.statement.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </Lines>
        </div>
        <div className="mt-10 flex flex-col justify-end gap-6 md:mt-0">
          {FIRM.body.map((para, i) => (
            <FadeUp key={i} delay={i * 0.12}>
              <p className="t-body" style={{ color: "var(--ink-60)" }}>
                {para}
              </p>
            </FadeUp>
          ))}
          <FadeUp delay={0.25}>
            <ul className="mt-4 flex flex-col">
              {FIRM.highlights.map((item) => (
                <li
                  key={item}
                  className="t-small flex items-center gap-4 border-t py-4"
                  style={{ borderColor: "rgba(7,16,34,0.12)" }}
                >
                  <span
                    className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: "var(--cyan)" }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </div>

      <div ref={mask} className="relative h-[110vh] w-full overflow-hidden">
        <video
          data-firm-video
          className="absolute inset-0 h-full w-full object-cover"
          src={FIRM.video}
          poster={FIRM.poster}
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
    </section>
  );
}
