"use client";

import { useRef } from "react";
import Image from "next/image";
import { asset } from "@/lib/amed/content";
import { RX_PHILOSOPHY } from "@/lib/amed/rx-content";
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "../motion";
import { CARD_TITLE, LABEL, META, Reveal } from "./shared";

/* ------------------------------------------------------------------
   Investment Philosophy — the original photo + solid-panel cards,
   moving the way Zenvia's stack does: every card pins at the same
   offset and the next slides up over it while the one beneath
   scales back and dims, scrubbed to scroll.
   ------------------------------------------------------------------ */

const CARDS = [
  {
    photo: "/amed/images/philosophy-01.jpg",
    panel: "#e6edf8",
    ink: "#14131a",
    muted: "#494852",
  },
  {
    photo: "/amed/images/philosophy-02.jpg",
    panel: "#ede5d3",
    ink: "#14131a",
    muted: "#5c554a",
  },
  {
    photo: "/amed/images/philosophy-03.jpg",
    panel: "#e3eae0",
    ink: "#14131a",
    muted: "#4f584c",
  },
  {
    photo: "/amed/images/philosophy-04.jpg",
    panel: "#282b34",
    ink: "#ffffff",
    muted: "rgba(255,255,255,0.65)",
  },
];

const STICK_TOP_REM = 11;

export function PhilosophyStack() {
  const root = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const mq = window.matchMedia("(min-width: 768px)");
    if (!mq.matches) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]");
      cards.forEach((card, i) => {
        const inner = card.querySelector<HTMLElement>("[data-stack-inner]");
        const dim = card.querySelector<HTMLElement>("[data-stack-dim]");
        if (!inner || i === cards.length - 1) return;
        const st = {
          trigger: cards[i + 1],
          start: "top bottom",
          end: `top top+=${STICK_TOP_REM}rem`,
          scrub: 0.4,
        };
        // the card recedes while the following one rides up over it
        gsap.fromTo(inner, { scale: 1 }, { scale: 0.9, ease: "none", scrollTrigger: st });
        if (dim) gsap.fromTo(dim, { opacity: 0 }, { opacity: 0.04, ease: "none", scrollTrigger: st });
      });
      ScrollTrigger.refresh();
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="rx-frame px-6 py-20 md:px-10 md:py-24">
      <Reveal>
        <p style={LABEL}>{RX_PHILOSOPHY.chip}</p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2
          className="mt-6 text-[2.4rem] leading-[1.0] tracking-tight sm:text-5xl md:text-[58px] md:leading-[0.98]"
          style={{ ...CARD_TITLE, color: "#0a0a0a" }}
        >
          {RX_PHILOSOPHY.title[0]}
        </h2>
      </Reveal>

      <div className="mt-14">
        {RX_PHILOSOPHY.items.map((item, i) => {
          const c = CARDS[i % CARDS.length];
          return (
            <div
              key={item.index}
              data-stack-card
              className="md:sticky"
              style={{ top: `${STICK_TOP_REM}rem`, zIndex: i + 1 }}
            >
              <div
                data-stack-inner
                className="relative mb-6 grid overflow-hidden rounded-[1.6rem] md:mb-0 md:h-[58vh] md:max-h-[42rem] md:min-h-[24rem] md:grid-cols-2"
                style={{
                  background: c.panel,
                  transformOrigin: "center top",
                  willChange: "transform",
                  boxShadow: "0 -10px 34px -28px rgba(20,19,26,0.18)",
                }}
              >
                <div className="relative aspect-square md:aspect-auto md:min-h-0">
                  <Image
                    src={asset(c.photo)}
                    alt={item.title}
                    fill
                    sizes="(min-width: 768px) 48vw, 100vw"
                    className="object-cover object-top md:object-center"
                  />
                </div>
                <div className="relative flex flex-col justify-center gap-8 p-10 md:p-14">
                  <p
                    className="text-[1.5rem] leading-[1.42] md:text-[1.75rem]"
                    style={{ ...CARD_TITLE, fontWeight: 400, color: c.ink }}
                  >
                    {item.desc}
                  </p>
                  <div>
                    <p className="font-bold" style={{ color: c.ink }}>
                      {item.title}
                    </p>
                    <p className="mt-1.5" style={{ ...META, color: c.muted }}>
                      {RX_PHILOSOPHY.chip} · {item.index}
                    </p>
                  </div>
                </div>
                <div
                  data-stack-dim
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{ background: "#14131a", opacity: 0 }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
