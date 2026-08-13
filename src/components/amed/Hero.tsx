"use client";

import { useRef } from "react";
import Image from "next/image";
import { HERO_SLIDES, asset } from "@/lib/amed/content";
import { Lines, gsap, useIsomorphicLayoutEffect } from "./motion";

/**
 * Hero (M2): a sticky full-viewport media stage with three statement
 * slides scrolling over it, preceded by a cinematic intro overlay (M3').
 */
export function Hero() {
  const root = useRef<HTMLDivElement | null>(null);
  const intro = useRef<HTMLDivElement | null>(null);
  const stage = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ---- intro overlay: wordmark rises, overlay lifts away ----
      const tl = gsap.timeline();
      tl.fromTo(
        "[data-intro-logo]",
        { yPercent: 120 },
        { yPercent: 0, duration: 1.1, ease: "quint.out", delay: 0.35 }
      )
        .to("[data-intro-logo]", {
          yPercent: -120,
          duration: 0.9,
          ease: "quint.in",
          delay: 0.5,
        })
        .to(
          intro.current,
          {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 1.1,
            ease: "quint.inOut",
            onComplete: () => intro.current?.remove(),
          },
          "-=0.25"
        )
        .fromTo(
          stage.current,
          { scale: 1.12 },
          { scale: 1, duration: 1.6, ease: "quint.out" },
          "-=1.0"
        );

      // ---- per-slide scrubbed exit: text drifts up + fades as you leave ----
      gsap.utils.toArray<HTMLElement>("[data-hero-slide]").forEach((slide) => {
        const content = slide.querySelector("[data-slide-content]");
        if (!content) return;
        gsap.fromTo(
          content,
          { autoAlpha: 1, y: 0 },
          {
            autoAlpha: 0,
            y: -90,
            ease: "none",
            scrollTrigger: {
              trigger: slide,
              start: "bottom 78%",
              end: "bottom 30%",
              scrub: true,
            },
          }
        );
      });

      // scroll cue fades out immediately
      gsap.to("[data-scroll-cue]", {
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: { start: 10, end: 200, scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div id="top" ref={root} className="relative" style={{ backgroundColor: "var(--navy-950)" }}>
      {/* intro overlay */}
      <div
        ref={intro}
        className="fixed inset-0 z-[200] flex items-center justify-center"
        style={{ backgroundColor: "var(--navy-950)", clipPath: "inset(0% 0% 0% 0%)" }}
      >
        <div className="overflow-hidden px-8">
          <div data-intro-logo>
            <Image
              src={asset("/amed/brand/amed-logo-dark.png")}
              alt="AMED Ventures"
              width={1999}
              height={452}
              priority
              className="h-10 w-auto md:h-14"
            />
          </div>
        </div>
      </div>

      {/* sticky media stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div ref={stage} className="absolute inset-0">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={asset("/amed/video/hero-stage.mp4")}
            poster={asset("/amed/images/hero-stage.jpg")}
            autoPlay
            muted
            loop
            playsInline
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(75deg, rgba(5,11,35,0.72) 0%, rgba(5,11,35,0.38) 45%, rgba(5,11,35,0.12) 100%)",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-40"
            style={{ background: "linear-gradient(to top, rgba(5,11,35,0.55), transparent)" }}
          />
        </div>
      </div>

      {/* slides scroll over the stage */}
      <div className="relative z-10" style={{ marginTop: "-100vh" }}>
        {HERO_SLIDES.map((slide, i) => (
          <section
            key={i}
            data-hero-slide
            className="flex h-screen items-center"
            style={{ paddingInline: "var(--pad)", paddingTop: "var(--header-h)" }}
          >
            <div data-slide-content className="max-w-[74rem]" style={{ color: "var(--chalk)" }}>
              {"eyebrow" in slide && slide.eyebrow ? (
                <Lines
                  as="p"
                  className="t-eyebrow mb-6"
                  style={{ color: "var(--cyan-hot)" }}
                  immediate
                  delay={2.35}
                >
                  {slide.eyebrow}
                </Lines>
              ) : null}
              <Lines
                as="h1"
                className="t-display-xl"
                immediate={i === 0}
                delay={i === 0 ? 2.5 : 0}
              >
                {slide.display.map((line, j) => (
                  <span key={j} className="block">
                    {line}
                  </span>
                ))}
              </Lines>
              <Lines
                as="p"
                className="t-body-l mt-8 max-w-[34rem]"
                style={{ color: "var(--chalk-60)" }}
                immediate={i === 0}
                delay={i === 0 ? 2.9 : 0.25}
              >
                {slide.support}
              </Lines>
            </div>
          </section>
        ))}
      </div>

      {/* scroll cue */}
      <div
        data-scroll-cue
        className="t-eyebrow fixed bottom-6 right-8 z-20 flex items-center gap-3"
        style={{ color: "var(--chalk-60)" }}
      >
        Scroll
        <span
          className="block h-10 w-px origin-top animate-pulse"
          style={{ backgroundColor: "var(--cyan)" }}
        />
      </div>
    </div>
  );
}
