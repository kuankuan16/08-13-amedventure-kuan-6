"use client";

import { useRef } from "react";
import Image from "next/image";
import { THESIS } from "@/lib/amed/content";
import { Lines, FadeUp, gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "./motion";

/**
 * Thesis (M6): copy steps scroll on the left while a sticky image panel
 * on the right crossfades to match the active step (scroll-driven, not click).
 */
export function Thesis() {
  const root = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const images = gsap.utils.toArray<HTMLElement>("[data-thesis-image]");
      const steps = gsap.utils.toArray<HTMLElement>("[data-thesis-step]");
      const counter = root.current?.querySelector<HTMLElement>("[data-thesis-counter]");

      gsap.set(images, { autoAlpha: 0, scale: 1.06 });
      gsap.set(images[0], { autoAlpha: 1, scale: 1 });

      steps.forEach((step, i) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (!self.isActive) return;
            images.forEach((img, j) => {
              gsap.to(img, {
                autoAlpha: i === j ? 1 : 0,
                scale: i === j ? 1 : 1.06,
                duration: 0.9,
                ease: "quint.out",
                overwrite: "auto",
              });
            });
            if (counter) counter.textContent = THESIS.steps[i].index;
            // dim inactive copy
            steps.forEach((s, j) => {
              gsap.to(s, {
                opacity: i === j ? 1 : 0.28,
                duration: 0.6,
                ease: "quint.out",
                overwrite: "auto",
              });
            });
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="thesis"
      ref={root}
      className="relative"
      style={{ backgroundColor: "var(--ice)", color: "var(--ink)" }}
    >
      <div style={{ paddingInline: "var(--pad)", paddingBlock: "clamp(6rem, 14vh, 11rem)" }}>
        <FadeUp>
          <p className="t-eyebrow" style={{ color: "var(--cyan)" }}>
            {THESIS.eyebrow}
          </p>
        </FadeUp>
        <Lines as="h2" className="t-display-l mt-8 max-w-[56rem]">
          {THESIS.statement.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </Lines>
        <FadeUp delay={0.2} className="mt-12">
          <div className="flex max-w-[52rem] flex-wrap gap-2">
            {THESIS.areas.map((area) => (
              <span
                key={area}
                className="t-small rounded-full border px-5 py-2"
                style={{ borderColor: "rgba(7,16,34,0.18)", color: "var(--ink-60)" }}
              >
                {area}
              </span>
            ))}
          </div>
        </FadeUp>
      </div>

      <div
        className="grid gap-x-16 md:grid-cols-2"
        style={{ paddingInline: "var(--pad)", paddingBottom: "clamp(5rem, 12vh, 10rem)" }}
      >
        {/* scrolling copy */}
        <div>
          {THESIS.steps.map((step, i) => (
            <article
              key={step.index}
              data-thesis-step
              className="flex flex-col justify-center"
              style={{ minHeight: i === THESIS.steps.length - 1 ? "70vh" : "95vh" }}
            >
              <p className="t-eyebrow" style={{ color: "var(--cyan)" }}>
                {step.index}
              </p>
              <h3 className="t-display-m mt-4">{step.title}</h3>
              <p className="t-body-l mt-6 max-w-[30rem]" style={{ color: "var(--ink-60)" }}>
                {step.body}
              </p>
              {/* mobile inline image */}
              <div className="mt-8 overflow-hidden rounded-2xl md:hidden">
                <Image
                  src={step.image}
                  alt={step.alt}
                  width={2336}
                  height={1744}
                  className="h-auto w-full"
                />
              </div>
            </article>
          ))}
        </div>

        {/* sticky image panel */}
        <div className="hidden md:block">
          <div className="sticky top-0 flex h-screen items-center py-16">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl">
              {THESIS.steps.map((step) => (
                <div key={step.index} data-thesis-image className="absolute inset-0">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ))}
              <div
                className="t-eyebrow absolute bottom-5 left-6 flex items-baseline gap-2 rounded-full px-4 py-2"
                style={{ backgroundColor: "rgba(255,255,255,0.85)", color: "var(--ink)" }}
              >
                <span data-thesis-counter>01</span>
                <span style={{ color: "var(--ink-60)" }}>/ 03</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
