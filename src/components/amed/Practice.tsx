"use client";

import { useRef } from "react";
import Image from "next/image";
import { PRACTICE } from "@/lib/amed/content";
import { Lines, FadeUp, Parallax, gsap, useIsomorphicLayoutEffect } from "./motion";

const TONE_STYLES = {
  light: { backgroundColor: "var(--chalk)", color: "var(--ink)", muted: "var(--ink-60)" },
  tint: { backgroundColor: "#dff2f8", color: "var(--ink)", muted: "rgba(7,16,34,0.65)" },
  dark: { backgroundColor: "var(--navy-900)", color: "var(--chalk)", muted: "var(--chalk-60)" },
} as const;

/**
 * Practice (M7): three full-width cards, each sticky near the top of the
 * viewport, stacking over one another; the card underneath scales away
 * slightly as the next one arrives.
 */
export function Practice() {
  const root = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-practice-card]");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        gsap.fromTo(
          card,
          { scale: 1, filter: "brightness(1)" },
          {
            scale: 0.94,
            filter: "brightness(0.82)",
            ease: "none",
            scrollTrigger: {
              trigger: card.parentElement,
              start: "bottom bottom",
              end: "bottom 20%",
              scrub: true,
            },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="practice"
      ref={root}
      style={{ backgroundColor: "var(--ice)", color: "var(--ink)" }}
    >
      <div style={{ paddingInline: "var(--pad)", paddingTop: "clamp(6rem, 14vh, 11rem)" }}>
        <FadeUp>
          <p className="t-eyebrow" style={{ color: "var(--cyan)" }}>
            {PRACTICE.eyebrow}
          </p>
        </FadeUp>
        <Lines as="h2" className="t-display-l mt-8">
          {PRACTICE.title}
        </Lines>
      </div>

      <div style={{ paddingInline: "var(--pad)", paddingBlock: "clamp(3rem, 8vh, 6rem)" }}>
        {PRACTICE.cards.map((card, i) => {
          const tone = TONE_STYLES[card.tone];
          return (
            <div key={card.index} style={{ height: "140vh" }} className="relative">
              <article
                data-practice-card
                className="sticky overflow-hidden rounded-3xl"
                style={{
                  top: "7vh",
                  height: "86vh",
                  backgroundColor: tone.backgroundColor,
                  color: tone.color,
                  boxShadow: "0 24px 80px rgba(5,11,35,0.18)",
                  transformOrigin: "center top",
                  zIndex: i + 1,
                }}
              >
                <div className="grid h-full md:grid-cols-2">
                  <div className="flex flex-col justify-between p-8 md:p-14">
                    <div>
                      <p className="t-eyebrow" style={{ color: "var(--cyan)" }}>
                        Practice {card.index}
                      </p>
                      <h3 className="t-display-m mt-6 max-w-[26rem]">{card.title}</h3>
                      <p className="t-body mt-6 max-w-[28rem]" style={{ color: tone.muted }}>
                        {card.body}
                      </p>
                    </div>
                    <ul className="mt-8 flex flex-col">
                      {card.points.map((point) => (
                        <li
                          key={point}
                          className="t-small flex items-center gap-4 border-t py-4"
                          style={{
                            borderColor:
                              card.tone === "dark"
                                ? "rgba(255,255,255,0.16)"
                                : "rgba(7,16,34,0.12)",
                          }}
                        >
                          <span
                            className="inline-block h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: "var(--cyan)" }}
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Parallax amount={10} className="relative hidden h-full md:block">
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      sizes="50vw"
                      className="object-cover"
                    />
                  </Parallax>
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
}
