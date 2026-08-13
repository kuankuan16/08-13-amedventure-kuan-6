"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { APPROACH } from "@/lib/amed/content";
import { Lines, FadeUp, Parallax, gsap, useIsomorphicLayoutEffect } from "./motion";

/**
 * Approach (M9): sticky title column beside an accordion.
 * Accordion answers open with a GSAP height + fade tween.
 */
export function Approach() {
  const root = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(0);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useIsomorphicLayoutEffect(() => {
    answerRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        height: i === open ? "auto" : 0,
        autoAlpha: i === open ? 1 : 0,
        duration: 0.8,
        ease: "quint.out",
        overwrite: "auto",
      });
    });
  }, [open]);

  return (
    <section
      id="approach"
      ref={root}
      style={{ backgroundColor: "var(--ice)", color: "var(--ink)" }}
    >
      <div
        className="grid gap-x-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]"
        style={{ paddingInline: "var(--pad)", paddingBlock: "clamp(6rem, 14vh, 11rem)" }}
      >
        {/* sticky title */}
        <div>
          <div className="md:sticky" style={{ top: "calc(var(--header-h) + 2rem)" }}>
            <FadeUp>
              <p className="t-eyebrow" style={{ color: "var(--cyan)" }}>
                {APPROACH.eyebrow}
              </p>
            </FadeUp>
            <Lines as="h2" className="t-display-l mt-8">
              {APPROACH.title}
            </Lines>
            <FadeUp delay={0.15} className="mt-10 hidden md:block">
              <Parallax amount={10} className="aspect-[3/4] max-w-[22rem] overflow-hidden rounded-3xl">
                <Image
                  src={APPROACH.image}
                  alt={APPROACH.alt}
                  fill
                  sizes="30vw"
                  className="object-cover"
                />
              </Parallax>
            </FadeUp>
          </div>
        </div>

        {/* accordion */}
        <div className="mt-12 md:mt-2">
          {APPROACH.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="border-t"
                style={{ borderColor: "rgba(7,16,34,0.12)" }}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-baseline gap-6 py-7 text-left"
                >
                  <span className="t-small tabular-nums" style={{ color: "var(--cyan)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="t-title flex-1">{item.q}</span>
                  <span
                    className="t-title relative inline-block transition-transform duration-500"
                    style={{
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      transitionTimingFunction: "var(--ease-quint)",
                      color: "var(--cyan)",
                    }}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                <div
                  ref={(el) => {
                    answerRefs.current[i] = el;
                  }}
                  className="overflow-hidden"
                  style={{ height: i === 0 ? "auto" : 0 }}
                >
                  <p
                    className="t-body max-w-[34rem] pb-8 pl-12"
                    style={{ color: "var(--ink-60)" }}
                  >
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
          <div className="border-t" style={{ borderColor: "rgba(7,16,34,0.12)" }} />
        </div>
      </div>
    </section>
  );
}
