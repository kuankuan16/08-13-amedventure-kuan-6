"use client";

import { useRef } from "react";
import { RX_PHILOSOPHY } from "@/lib/amed/rx-content";
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "../motion";
import { MONO, SERIF, BRAND_BLUE } from "./shared";

/* ------------------------------------------------------------------
   Investment Philosophy — scroll grammar borrowed from Zenvia's
   "About …" block: the label column lifts in on a slight X-rotation,
   and the statement brightens letter by letter, scrubbed to scroll.
   ------------------------------------------------------------------ */

/** Split a string into spans per letter, preserving word boundaries. */
function SplitText({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, wi) => (
        <span key={`${word}-${wi}`} className="inline-block whitespace-nowrap">
          {[...word].map((ch, ci) => (
            <span key={ci} data-letter className="inline-block" style={{ opacity: 0.18 }}>
              {ch}
            </span>
          ))}
          {wi < text.split(" ").length - 1 ? (
            <span data-letter className="inline-block" style={{ opacity: 0.18 }}>
              &nbsp;
            </span>
          ) : null}
        </span>
      ))}
    </>
  );
}

export function PhilosophyScroll() {
  const root = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set("[data-letter]", { opacity: 1 });
        gsap.set("[data-appear]", { opacity: 1, y: 0, rotateX: 0 });
        return;
      }

      // label / title columns lift in
      gsap.utils.toArray<HTMLElement>("[data-appear]").forEach((el, i) => {
        gsap.set(el, { opacity: 0, y: 30, rotateX: 30, transformPerspective: 800 });
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () =>
            gsap.to(el, {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 1.1,
              delay: i * 0.08,
              ease: "quint.out",
            }),
        });
      });

      // each statement brightens letter by letter, scrubbed to its own scroll span
      gsap.utils.toArray<HTMLElement>("[data-statement]").forEach((block) => {
        const letters = block.querySelectorAll("[data-letter]");
        if (!letters.length) return;
        gsap.fromTo(
          letters,
          { opacity: 0.18 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.5,
            scrollTrigger: {
              trigger: block,
              start: "top 82%",
              end: "bottom 55%",
              scrub: 0.6,
            },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="rx-frame px-6 py-24 md:px-10 md:py-32">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* label column */}
        <div className="lg:col-span-4">
          <div data-appear className="lg:sticky lg:top-32">
            <p
              className="uppercase"
              style={{
                fontFamily: MONO,
                fontSize: 11,
                letterSpacing: "0.25em",
                color: BRAND_BLUE,
              }}
            >
              ( {RX_PHILOSOPHY.chip} )
            </p>
            <h2
              className="mt-6 text-[2.4rem] leading-[1.0] tracking-tight sm:text-5xl md:text-[58px] md:leading-[0.98]"
              style={{ fontFamily: SERIF, fontWeight: 500, color: "var(--rx-ink)" }}
            >
              {RX_PHILOSOPHY.title[0]}
            </h2>
          </div>
        </div>

        {/* statements */}
        <div className="lg:col-span-8">
          {RX_PHILOSOPHY.items.map((item, i) => (
            <div
              key={item.index}
              data-statement
              className="border-t py-10 first:border-t-0 first:pt-0 md:py-12"
              style={{ borderColor: "rgba(20,19,26,0.09)" }}
            >
              <div className="flex items-baseline gap-5">
                <span
                  data-appear
                  style={{ fontFamily: MONO, fontSize: 11, color: BRAND_BLUE }}
                >
                  {item.index}
                </span>
                <h3
                  className="text-xl font-bold tracking-tight md:text-2xl"
                  style={{ color: "var(--rx-ink)" }}
                >
                  {item.title}
                </h3>
              </div>
              <p
                className="mt-5 text-[1.15rem] leading-[1.5] tracking-tight sm:text-[1.3rem] md:text-[1.6rem] md:leading-[1.45]"
                style={{ color: "var(--rx-ink)" }}
                aria-label={item.desc}
              >
                <span aria-hidden>
                  <SplitText text={item.desc} />
                </span>
              </p>
              {i === RX_PHILOSOPHY.items.length - 1 ? null : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
