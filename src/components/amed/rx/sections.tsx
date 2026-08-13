"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { asset, PORTFOLIO, PORTFOLIO_FILTERS, TEAM, type TeamMember } from "@/lib/amed/content";
import {
  RX_MAILTO,
  RX_HERO,
  RX_ABOUT,
  RX_FOCUS,
  RX_STORY,
  RX_PROCESS,
  RX_PHILOSOPHY,
  type RxMilestone,
} from "@/lib/amed/rx-content";
import { FadeUp, gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "../motion";
import { Arrow, Sparkle, SlideIn } from "./ui";

/* ------------------------------------------------------------------
   Hero (home)
   ------------------------------------------------------------------ */

export function RxHero() {
  const root = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      // opening: a giant "Capital" fills the screen, then shrinks precisely
      // onto the first word of the hero headline (reference behavior)
      const intro = root.current?.querySelector<HTMLElement>("[data-rx-intro]");
      const word = root.current?.querySelector<HTMLElement>("[data-rx-intro-word]");
      const h1 = root.current?.querySelector<HTMLElement>("[data-rx-hero-h1]");
      const target = root.current?.querySelector<HTMLElement>("[data-rx-hero-capital]");
      let INTRO = 0;
      if (intro && word && h1 && target && !reduced) {
        INTRO = 1.9;
        gsap.set(h1, { autoAlpha: 0 });
        const play = () => {
          const w = word.getBoundingClientRect();
          const t = target.getBoundingClientRect();
          const scale = t.height / w.height;
          const dx = t.left - w.left;
          const dy = t.top - w.top;
          gsap.set(word, { transformOrigin: "left top" });
          gsap
            .timeline()
            .fromTo(
              word,
              { autoAlpha: 0, yPercent: 14 },
              { autoAlpha: 1, yPercent: 0, duration: 0.55, ease: "quint.out", delay: 0.1 }
            )
            .to(word, {
              x: dx,
              y: dy,
              scale,
              duration: 1.0,
              ease: "quint.inOut",
              delay: 0.3,
            })
            // hand off: headline appears beneath the landed word
            .to(h1, { autoAlpha: 1, duration: 0.3, ease: "quint.out" }, ">-0.05")
            .to(intro, { autoAlpha: 0, duration: 0.35, ease: "quint.out" }, "<")
            .set(intro, { display: "none" });
        };
        // wait for the serif font so the measured shrink lands precisely
        if (document.fonts?.ready) {
          document.fonts.ready.then(play);
        } else {
          play();
        }
      } else {
        if (intro) gsap.set(intro, { display: "none" });
        if (h1) gsap.set(h1, { autoAlpha: 1 });
      }

      gsap.fromTo(
        "[data-rx-hero-item]",
        { autoAlpha: 0, y: 34 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "quint.out",
          stagger: 0.12,
          delay: INTRO + 0.15,
        }
      );
      // photo settles from 1.25 to a persistent 1.1 zoom (reference behavior)
      gsap.fromTo(
        "[data-rx-hero-img]",
        { scale: 1.25 },
        { scale: 1.1, duration: 1.6, ease: "quint.out", delay: INTRO + 0.5 }
      );
      // hero photo: vertical mask reveal on load and between slides —
      // the incoming slide wipes up over the previous one, with the image
      // counter-drifting for depth (reference behavior)
      const slides = gsap.utils.toArray<HTMLElement>("[data-rx-slide]");
      const HIDDEN = "inset(100% 0% 0% 0%)";
      const SHOWN = "inset(0% 0% 0% 0%)";
      gsap.set(slides, { clipPath: HIDDEN, zIndex: 1 });
      // entrance: first slide revealed by the mask sliding open
      gsap.set(slides[0], { zIndex: 2 });
      gsap.to(slides[0], {
        clipPath: SHOWN,
        duration: 1.2,
        ease: "quint.out",
        delay: INTRO + 0.45,
      });
      if (slides.length > 1) {
        const zc = { z: 3 };
        const ctl = gsap.timeline({ repeat: -1, delay: INTRO + 1.65 });
        slides.forEach((slide, i) => {
          const next = slides[(i + 1) % slides.length];
          const img = next.querySelector<HTMLElement>("[data-rx-hero-img]");
          ctl
            .to({}, { duration: 4.2 })
            .call(() => {
              gsap.set(next, { zIndex: zc.z++, clipPath: HIDDEN });
            })
            .to(next, { clipPath: SHOWN, duration: 1.0, ease: "quint.inOut" })
            .fromTo(
              img,
              { yPercent: 8, scale: 1.1 },
              { yPercent: 0, scale: 1.1, duration: 1.0, ease: "quint.inOut" },
              "<"
            );
        });
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div id="rx-top" ref={root}>
      {/* opening overlay: giant wordmark shrinking into the nav logo */}
      <div
        data-rx-intro
        className="fixed inset-0 z-[200] flex items-center justify-center"
        style={{ background: "var(--rx-paper)" }}
        aria-hidden
      >
        <span
          data-rx-intro-word
          className="rx-serif select-none opacity-0"
          style={{
            fontSize: "min(18vw, 17rem)",
            lineHeight: 1.08,
            color: "var(--rx-ink)",
            willChange: "transform",
          }}
        >
          Capital
        </span>
      </div>
      <div className="rx-frame grid items-center gap-12 px-6 py-16 md:grid-cols-2 md:px-10 md:py-24">
        <div>
          <div data-rx-hero-item>
            <span className="rx-chip">{RX_HERO.chip}</span>
          </div>
          <h1 className="rx-h1 mt-6" data-rx-hero-h1>
            <span className="block">
              <span data-rx-hero-capital>{RX_HERO.title[0].split(" ")[0]}</span>
              {" " + RX_HERO.title[0].split(" ").slice(1).join(" ")}
            </span>
            <span className="block">{RX_HERO.title[1]}</span>
          </h1>
          <p className="rx-lead mt-6 max-w-[30rem]" data-rx-hero-item>
            {RX_HERO.support}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-6" data-rx-hero-item>
            <a href={RX_MAILTO} className="rx-btn">
              {RX_HERO.ctaPrimary}
            </a>
            <Link
              href="/v2/about"
              className="group inline-flex items-center gap-3 font-bold"
              style={{ color: "var(--rx-ink)" }}
            >
              <span className="rx-circle group-hover:rotate-45" aria-hidden>
                <Arrow />
              </span>
              {RX_HERO.ctaSecondary}
            </Link>
          </div>
        </div>

        <div data-rx-hero-photo className="relative">
          <div className="relative" style={{ aspectRatio: "631 / 590" }}>
            {RX_HERO.slides.map((slide, i) => (
              <div key={slide.image} data-rx-slide className="absolute inset-0">
                <div className="rx-clip h-full w-full">
                  <Image
                    data-rx-hero-img
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    priority
                    sizes="(min-width: 768px) 46vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
            {/* progress dots */}
            <div className="absolute bottom-5 right-5 flex gap-1.5" aria-hidden>
              {RX_HERO.slides.map((s) => (
                <span
                  key={s.image}
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: "rgba(255,255,255,0.85)" }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Logo band (home)
   ------------------------------------------------------------------ */

/**
 * Per-logo display height (px) tuned from each mark's aspect ratio so every
 * logo carries a similar visual mass in the band; width follows the ratio.
 */
const LOGO_BAND_SIZE: Record<string, { h: number; r: number }> = {
  "Adona Medical": { h: 30, r: 2.53 },
  "Akura Medical": { h: 27, r: 3.53 },
  "Atia Vision": { h: 28, r: 3.27 },
  "Benthic Genomics": { h: 40, r: 0.6 },
  "Dynaflex Technologies": { h: 27, r: 3.44 },
  "Imperative Care": { h: 17, r: 8.26 },
  Instylla: { h: 34, r: 2.1 },
  "Kandu Health": { h: 26, r: 3.74 },
  "KT Medical": { h: 15, r: 9.81 },
  Rejoni: { h: 28, r: 3.31 },
  Sealonix: { h: 23, r: 4.77 },
  "Supira Medical": { h: 31, r: 2.65 },
  "Tioga Cardiovascular": { h: 26, r: 3.87 },
  "Tulavi Therapeutics": { h: 30, r: 2.89 },
  "Verge Medical": { h: 30, r: 2.76 },
  Wiltrom: { h: 28, r: 3.23 },
};

export function RxLogoBand() {
  const logos = PORTFOLIO.companies.filter((c) => c.logo);
  return (
    <div className="rx-sep relative">
      <div className="rx-frame overflow-hidden px-0 py-12">
        <div className="marquee-track items-center" style={{ animationDuration: "55s" }}>
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center">
              {logos.map((c) => {
                const size = LOGO_BAND_SIZE[c.name] ?? { h: 28, r: 3.2 };
                const w = Math.min(Math.round(size.h * size.r), 170);
                return (
                  <span key={`${copy}-${c.name}`} className="flex items-center">
                    <span
                      className="relative mx-10 inline-block"
                      style={{ height: size.h, width: w }}
                    >
                      <Image
                        src={c.logo!}
                        alt={c.name}
                        fill
                        sizes="12vw"
                        className="object-contain opacity-60 grayscale"
                      />
                    </span>
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{ background: "var(--rx-line)" }}
                      aria-hidden
                    />
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Firm at a glance: mission + image + counters (+ optional highlights)
   ------------------------------------------------------------------ */

export function RxGlance({ cta }: { cta?: { label: string; href: string } }) {
  const root = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const ctx = gsap.context(() => {
      // 4 highlight cards converge from the grid centre outward (reference offsets)
      const offsets = [
        { x: 150, y: 80 },
        { x: -150, y: 80 },
        { x: 150, y: -80 },
        { x: -150, y: -80 },
      ];
      const cards = gsap.utils.toArray<HTMLElement>("[data-rx-spread]");
      cards.forEach((card, i) => {
        const o = offsets[i % offsets.length];
        gsap.set(card, { x: o.x, y: o.y, autoAlpha: 0 });
      });
      if (cards.length) {
        ScrollTrigger.create({
          trigger: cards[0].parentElement,
          start: "top 78%",
          once: true,
          onEnter: () =>
            gsap.to(cards, {
              x: 0,
              y: 0,
              autoAlpha: 1,
              duration: 1.1,
              ease: "quint.out",
            }),
        });
      }
      // photo enters with the same vertical mask reveal as the hero
      const photo = root.current?.querySelector<HTMLElement>("[data-rx-glance-photo]");
      const photoImg = root.current?.querySelector<HTMLElement>("[data-rx-glance-img]");
      if (photo && photoImg) {
        gsap.set(photo, { clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set(photoImg, { scale: 1.25 });
        ScrollTrigger.create({
          trigger: photo,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(photo, {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.2,
              ease: "quint.out",
            });
            gsap.to(photoImg, { scale: 1.1, duration: 1.6, ease: "quint.out" });
          },
        });
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="rx-sep" ref={root}>
      <div className="rx-frame px-6 py-16 md:px-10 md:py-24">
        <FadeUp>
          <span className="rx-chip">{RX_ABOUT.chip}</span>
        </FadeUp>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-8">
          <SlideIn className="rx-h2 max-w-[36rem]">
            {RX_ABOUT.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </SlideIn>
          <FadeUp delay={0.15}>
            <p className="rx-lead max-w-[26rem]">{RX_ABOUT.body}</p>
          </FadeUp>
        </div>

        <div className="mt-16 grid items-center gap-12 md:grid-cols-2">
          <div data-rx-glance-photo>
            <div className="rx-clip" style={{ aspectRatio: "631 / 590" }}>
              <div data-rx-glance-img className="h-full w-full">
                <Image
                  src={RX_ABOUT.image}
                  alt={RX_ABOUT.imageAlt}
                  fill
                  sizes="(min-width: 768px) 46vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="grid gap-3 sm:grid-cols-2">
              {RX_ABOUT.highlights.map((item, i) => (
                <div
                  key={item.title}
                  data-rx-spread={i}
                  className="rounded-2xl p-7"
                  style={{
                    background: ["#e6edf8", "#ede5d3", "#e3eae0", "#ece7f0"][i % 4],
                  }}
                >
                  <p className="rx-serif text-2xl" style={{ color: "var(--rx-ink)" }}>
                    {item.title}
                  </p>
                  <p className="mt-4 text-base leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              {cta ? (
                <Link href={cta.href} className="rx-btn">
                  {cta.label}
                </Link>
              ) : (
                <a href={RX_MAILTO} className="rx-btn">
                  Send us your deck
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   Focus — full dark rows (focus page) + compact cards (home)
   ------------------------------------------------------------------ */

export function RxFocusRows({ withIntro = true }: { withIntro?: boolean }) {
  const [active, setActive] = useState(0);
  return (
    <section style={{ background: "var(--rx-dark)", color: "rgba(255,255,255,0.72)" }}>
      <div
        className="rx-frame px-6 py-16 md:px-10 md:py-24"
        style={{ borderColor: "var(--rx-dark-line)" }}
      >
        {withIntro ? (
          <>
            <FadeUp>
              <span
                className="rx-chip"
                style={{ background: "rgba(255,255,255,0.08)", color: "#fff" }}
              >
                {RX_FOCUS.chip}
              </span>
            </FadeUp>
            <div className="mt-6 flex flex-wrap items-end justify-between gap-8">
              <SlideIn className="rx-h2 max-w-[38rem]">
                <span style={{ color: "#fff" }}>
                  {RX_FOCUS.title.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </SlideIn>
              <div className="flex max-w-[26rem] flex-col gap-4">
                {RX_FOCUS.body.map((para) => (
                  <FadeUp key={para.slice(0, 16)}>
                    <p>{para}</p>
                  </FadeUp>
                ))}
              </div>
            </div>
          </>
        ) : null}

        <div className={`grid gap-10 lg:grid-cols-[1fr_minmax(0,24rem)] ${withIntro ? "mt-16" : ""}`}>
          <div>
            {RX_FOCUS.rows.map((row, i) => (
              <FadeUp key={row.index} delay={i * 0.06}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="rx-row flex w-full items-center gap-6 py-7 text-left transition-opacity duration-300"
                  style={{
                    borderTop: "1px solid var(--rx-dark-line)",
                    opacity: active === i ? 1 : 0.55,
                  }}
                >
                  <span className="text-sm font-bold" style={{ color: "var(--rx-accent)" }}>
                    {row.index}
                  </span>
                  <span className="flex-1">
                    <span
                      className="rx-serif block text-2xl md:text-4xl"
                      style={{ color: "#fff" }}
                    >
                      {row.title}
                    </span>
                    <span className="mt-1 block text-sm md:text-base">{row.desc}</span>
                  </span>
                  <span
                    className="rx-circle shrink-0"
                    style={{ borderColor: "var(--rx-dark-line)", color: "#fff" }}
                    aria-hidden
                  >
                    <Arrow />
                  </span>
                </button>
              </FadeUp>
            ))}
            <div style={{ borderTop: "1px solid var(--rx-dark-line)" }} />
          </div>

          <div className="relative hidden overflow-hidden rounded-2xl lg:block">
            {RX_FOCUS.rows.map((row, i) => (
              <div
                key={row.index}
                className="absolute inset-0 transition-opacity duration-700"
                style={{ opacity: active === i ? 1 : 0 }}
              >
                <Image src={row.image} alt={row.title} fill sizes="24rem" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid var(--rx-dark-line)" }}>
        <div className="overflow-hidden py-8">
          <div className="marquee-track items-center gap-6" style={{ animationDuration: "36s" }}>
            {[0, 1].map((copy) => (
              <div key={copy} className="flex items-center gap-6 pr-6">
                {RX_FOCUS.areas.map((area) => (
                  <span key={`${copy}-${area}`} className="flex items-center gap-6">
                    <Sparkle />
                    <span className="rx-pill">{area}</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Homepage focus: dark expandable service rows (reference interaction) —
 * the active row expands its copy, the title takes the accent colour, and a
 * tilted photo floats over the row; hover switches rows.
 */
export function RxFocusCards() {
  const [active, setActive] = useState(0);
  const detailRefs = useRef<(HTMLDivElement | null)[]>([]);

  useIsomorphicLayoutEffect(() => {
    detailRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        height: i === active ? "auto" : 0,
        autoAlpha: i === active ? 1 : 0,
        duration: 0.7,
        ease: "quint.out",
        overwrite: "auto",
        onComplete: () => ScrollTrigger.refresh(),
      });
    });
  }, [active]);

  return (
    <section className="rx-sep">
      <div className="rx-frame px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[44rem] text-center">
          <FadeUp>
            <span className="rx-chip">{RX_FOCUS.chip}</span>
          </FadeUp>
          <SlideIn className="rx-h2 mt-6">
            {RX_FOCUS.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </SlideIn>
          <FadeUp delay={0.1}>
            <p className="rx-lead mt-6">{RX_FOCUS.intro}</p>
          </FadeUp>
        </div>

        <div className="mt-16">
          {RX_FOCUS.rows.map((row, i) => {
            const isActive = active === i;
            return (
              <div
                key={row.index}
                className="relative"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className="flex w-full items-center gap-6 py-8 text-left md:gap-10"
                  style={{ borderTop: "1px dashed var(--rx-line)" }}
                >
                  <span
                    className="text-sm font-bold transition-colors duration-300"
                    style={{ color: isActive ? "var(--rx-accent)" : "rgba(20,19,26,0.4)" }}
                  >
                    {row.index}
                  </span>
                  <span className="flex-1">
                    <span
                      className="rx-serif block text-3xl transition-colors duration-300 md:text-5xl"
                      style={{
                        color: isActive ? "var(--rx-accent)" : "var(--rx-ink)",
                        fontWeight: 400,
                      }}
                    >
                      {row.title}
                    </span>
                  </span>
                </button>
                <div
                  ref={(el) => {
                    detailRefs.current[i] = el;
                  }}
                  className="overflow-hidden"
                  style={{ height: i === 0 ? "auto" : 0, opacity: i === 0 ? 1 : 0 }}
                >
                  <p className="max-w-[34rem] pb-10 pl-10 md:pl-16">{row.detail}</p>
                </div>
                {/* tilted floating photo aligned with its row */}
                <div
                  className="pointer-events-none absolute right-[12%] top-4 z-10 hidden w-[15rem] overflow-hidden rounded-2xl transition-all duration-700 lg:block"
                  style={{
                    transform: `rotate(8deg) scale(${isActive ? 1 : 0.85})`,
                    opacity: isActive ? 1 : 0,
                    transitionTimingFunction: "var(--ease-quint)",
                    aspectRatio: "1 / 1",
                  }}
                  aria-hidden
                >
                  <Image src={row.image} alt="" fill sizes="15rem" className="object-cover" />
                </div>
              </div>
            );
          })}
          <div style={{ borderTop: "1px dashed var(--rx-line)" }} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   Philosophy (dark band, VC-standard)
   ------------------------------------------------------------------ */

export function RxPhilosophy() {
  return (
    <section style={{ background: "var(--rx-dark)", color: "rgba(255,255,255,0.72)" }}>
      <div
        className="rx-frame px-6 py-16 md:px-10 md:py-24"
        style={{ borderColor: "var(--rx-dark-line)" }}
      >
        <FadeUp>
          <span
            className="rx-chip"
            style={{ background: "rgba(255,255,255,0.08)", color: "#fff" }}
          >
            {RX_PHILOSOPHY.chip}
          </span>
        </FadeUp>
        <SlideIn className="rx-h2 mt-6">
          <span style={{ color: "#fff" }}>{RX_PHILOSOPHY.title[0]}</span>
        </SlideIn>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl sm:grid-cols-2 lg:grid-cols-4" style={{ background: "var(--rx-dark-line)" }}>
          {RX_PHILOSOPHY.items.map((item, i) => (
            <FadeUp key={item.index} delay={i * 0.08} className="h-full">
              <div className="h-full p-7" style={{ background: "var(--rx-dark)" }}>
                <p className="text-sm font-bold" style={{ color: "var(--rx-accent)" }}>
                  {item.index}
                </p>
                <h3 className="mt-4 text-2xl" style={{ color: "#fff" }}>
                  {item.title}
                </h3>
                <p className="mt-3 text-sm">{item.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   Story list — reusable for teaser (limit) and full page (filters)
   ------------------------------------------------------------------ */

export function RxStoryList({
  limit,
  showFilters = false,
  showHeader = true,
}: {
  limit?: number;
  showFilters?: boolean;
  showHeader?: boolean;
}) {
  const [filter, setFilter] = useState("All");
  const listRef = useRef<HTMLDivElement | null>(null);

  let items: RxMilestone[] =
    filter === "All"
      ? [...RX_STORY.milestones]
      : RX_STORY.milestones.filter((m) => m.tag === filter);
  if (limit) items = items.slice(0, limit);

  const applyFilter = (f: string) => {
    if (f === filter) return;
    const list = listRef.current;
    if (!list) {
      setFilter(f);
      return;
    }
    gsap.to(list, {
      autoAlpha: 0,
      y: 12,
      duration: 0.25,
      ease: "quint.out",
      onComplete: () => {
        setFilter(f);
        requestAnimationFrame(() => {
          gsap.fromTo(
            list,
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: 0.5, ease: "quint.out" }
          );
          ScrollTrigger.refresh();
        });
      },
    });
  };

  return (
    <section className="rx-sep">
      <div className="rx-frame px-6 py-16 md:px-10 md:py-20">
        {showHeader ? (
          <>
            <FadeUp>
              <span className="rx-chip">{RX_STORY.chip}</span>
            </FadeUp>
            <div className="mt-6 flex flex-wrap items-end justify-between gap-8">
              <SlideIn className="rx-h2">
                {RX_STORY.title.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </SlideIn>
              {showFilters ? (
                <FadeUp>
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Filter milestones">
                    {RX_STORY.filters.map((f) => {
                      const activeF = f === filter;
                      return (
                        <button
                          key={f}
                          type="button"
                          aria-pressed={activeF}
                          onClick={() => applyFilter(f)}
                          className="rounded-full border px-5 py-2 text-sm font-bold transition-colors duration-300"
                          style={{
                            background: activeF ? "var(--rx-dark)" : "transparent",
                            color: activeF ? "#fff" : "var(--rx-ink)",
                            borderColor: activeF ? "var(--rx-dark)" : "var(--rx-line)",
                          }}
                        >
                          {f}
                        </button>
                      );
                    })}
                  </div>
                </FadeUp>
              ) : (
                <FadeUp>
                  <Link
                    href="/v2/story"
                    className="group inline-flex items-center gap-3 font-bold"
                    style={{ color: "var(--rx-ink)" }}
                  >
                    <span className="rx-circle group-hover:rotate-45" aria-hidden>
                      <Arrow />
                    </span>
                    All milestones
                  </Link>
                </FadeUp>
              )}
            </div>
          </>
        ) : null}

        <div ref={listRef} className={showHeader ? "mt-12" : ""}>
          {items.map((m) => (
            <a
              key={m.title}
              href={RX_MAILTO}
              className="rx-row group grid gap-3 py-6 transition-colors duration-300 md:grid-cols-[7rem_1fr_11rem_8rem_3rem] md:items-center md:gap-6"
              style={{ borderTop: "1px dashed var(--rx-line)" }}
            >
              <span className="text-sm font-bold" style={{ color: "var(--rx-accent)" }}>
                {m.date}
              </span>
              <span>
                <span
                  className="block font-bold leading-snug transition-colors duration-300 group-hover:underline"
                  style={{ color: "var(--rx-ink)" }}
                >
                  {m.title}
                </span>
                <span className="rx-label mt-1 block">{m.source}</span>
              </span>
              <span className="text-sm font-bold" style={{ color: "var(--rx-ink)" }}>
                {m.company}
              </span>
              <span
                className="rx-chip justify-self-start !py-1.5 text-xs"
                style={{ background: "var(--rx-grey)" }}
              >
                {m.tag}
              </span>
              <span className="rx-circle hidden md:inline-flex" aria-hidden>
                <Arrow />
              </span>
            </a>
          ))}
          <div className="rx-sep" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   Process (about page)
   ------------------------------------------------------------------ */

export function RxProcess() {
  return (
    <section className="rx-sep" style={{ background: "var(--rx-sand)" }}>
      <div className="rx-frame grid gap-12 px-6 py-16 md:grid-cols-2 md:px-10 md:py-24">
        <div>
          <div className="md:sticky md:top-28">
            <FadeUp>
              <span className="rx-chip" style={{ background: "#fff" }}>
                {RX_PROCESS.chip}
              </span>
            </FadeUp>
            <SlideIn className="rx-h2 mt-6">
              {RX_PROCESS.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </SlideIn>
            <FadeUp delay={0.15} className="mt-8">
              <a href={RX_MAILTO} className="rx-btn">
                {RX_PROCESS.cta}
              </a>
            </FadeUp>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {RX_PROCESS.steps.map((step, i) => (
            <FadeUp key={step.index} delay={i * 0.1}>
              <div
                className="rounded-2xl bg-white p-8 shadow-sm transition-transform duration-500 hover:-translate-y-1"
                style={{ transitionTimingFunction: "var(--ease-quint)" }}
              >
                <p className="text-sm font-bold" style={{ color: "var(--rx-accent)" }}>
                  {step.index}
                </p>
                <h3 className="mt-2 text-2xl">{step.title}</h3>
                <p className="mt-3">{step.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   Portfolio grid — featured (home) or full with filters (portfolio page)
   ------------------------------------------------------------------ */

export function RxPortfolioGrid({ featured = false }: { featured?: boolean }) {
  const [filter, setFilter] = useState<string>("all");
  const gridRef = useRef<HTMLUListElement | null>(null);

  let companies =
    filter === "all"
      ? [...PORTFOLIO.companies]
      : PORTFOLIO.companies.filter((c) => c.group === filter);
  if (featured) companies = PORTFOLIO.companies.filter((c) => c.logo).slice(0, 8);

  const applyFilter = (key: string) => {
    if (key === filter) return;
    const grid = gridRef.current;
    if (!grid) {
      setFilter(key);
      return;
    }
    gsap.to(grid, {
      autoAlpha: 0,
      y: 14,
      duration: 0.3,
      ease: "quint.out",
      onComplete: () => {
        setFilter(key);
        requestAnimationFrame(() => {
          gsap.fromTo(
            grid,
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, duration: 0.55, ease: "quint.out" }
          );
          ScrollTrigger.refresh();
        });
      },
    });
  };

  return (
    <section style={{ background: "var(--rx-dark)", color: "rgba(255,255,255,0.72)" }}>
      <div
        className="rx-frame px-6 py-16 md:px-10 md:py-20"
        style={{ borderColor: "var(--rx-dark-line)" }}
      >
        {featured ? (
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <FadeUp>
                <span
                  className="rx-chip"
                  style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
                >
                  Portfolio
                </span>
              </FadeUp>
              <SlideIn className="rx-h2 mt-6 max-w-[36rem]">
                <span style={{ color: "#fff" }}>
                  {PORTFOLIO.statement.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </SlideIn>
            </div>
            <FadeUp>
              <Link
                href="/v2/portfolio"
                className="group inline-flex items-center gap-3 font-bold"
                style={{ color: "#fff" }}
              >
                <span
                  className="rx-circle group-hover:rotate-45"
                  style={{ borderColor: "var(--rx-dark-line)" }}
                  aria-hidden
                >
                  <Arrow />
                </span>
                View all companies
              </Link>
            </FadeUp>
          </div>
        ) : (
          <FadeUp>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter portfolio">
              {PORTFOLIO_FILTERS.map((f) => {
                const active = filter === f.key;
                return (
                  <button
                    key={f.key}
                    type="button"
                    aria-pressed={active}
                    onClick={() => applyFilter(f.key)}
                    className="rounded-full border px-5 py-2 text-sm font-bold transition-colors duration-300"
                    style={{
                      background: active ? "#fff" : "transparent",
                      color: active ? "var(--rx-ink)" : "#fff",
                      borderColor: active ? "#fff" : "var(--rx-dark-line)",
                    }}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </FadeUp>
        )}

        <ul
          ref={gridRef}
          className={`grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 ${featured ? "mt-12" : "mt-10"}`}
        >
          {companies.map((company) => (
            <li
              key={company.name}
              className="group relative flex aspect-[4/3] flex-col items-center justify-center overflow-hidden rounded-2xl bg-white p-6 transition-transform duration-500 hover:-translate-y-1"
              style={{ transitionTimingFunction: "var(--ease-quint)" }}
            >
              <div className="relative flex h-12 w-full items-center justify-center md:h-14">
                {company.logo ? (
                  <Image
                    src={company.logo}
                    alt={company.name}
                    fill
                    sizes="22vw"
                    className="object-contain opacity-80 grayscale transition-[filter,opacity] duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                ) : (
                  <span
                    className="rx-serif text-2xl opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ color: "var(--rx-ink)" }}
                  >
                    {company.name.split(" ")[0]}
                  </span>
                )}
              </div>
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-4 text-center opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                style={{ transitionTimingFunction: "var(--ease-quint)" }}
              >
                <p className="text-sm font-bold" style={{ color: "var(--rx-ink)" }}>
                  {company.name}
                </p>
                <p className="text-xs" style={{ color: "var(--rx-body)" }}>
                  {company.sector} · {company.location} · {company.year}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {!featured ? (
          <FadeUp className="mt-12">
            <div
              className="flex flex-wrap items-baseline gap-x-8 gap-y-2 pt-8"
              style={{ borderTop: "1px solid var(--rx-dark-line)" }}
            >
              <span
                className="rx-chip !py-1.5 text-xs"
                style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
              >
                Exited
              </span>
              {PORTFOLIO.exited.map((name) => (
                <span key={name} className="text-sm">
                  {name}
                </span>
              ))}
            </div>
          </FadeUp>
        ) : null}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   Philosophy split — stacked full-bleed photos beside large statements
   ------------------------------------------------------------------ */

/** Per-card palette: photo backdrop tone ≈ text panel tone (reference look). */
const PHILOSOPHY_CARDS = [
  {
    photo: "/amed/images/philosophy-01.jpg",
    panel: "#e6edf8",
    ink: "var(--rx-ink)",
    muted: "var(--rx-body)",
  },
  {
    photo: "/amed/images/philosophy-02.jpg",
    panel: "#ede5d3",
    ink: "var(--rx-ink)",
    muted: "#5c554a",
  },
  {
    photo: "/amed/images/philosophy-03.jpg",
    panel: "#e3eae0",
    ink: "var(--rx-ink)",
    muted: "#4f584c",
  },
  {
    photo: "/amed/images/philosophy-04.jpg",
    panel: "#282b34",
    ink: "#ffffff",
    muted: "rgba(255,255,255,0.65)",
  },
];

export function RxPhilosophySplit() {
  return (
    <section className="rx-sep">
      <div className="rx-frame px-6 py-16 md:px-10 md:py-20">
        <FadeUp>
          <span className="rx-chip">{RX_PHILOSOPHY.chip}</span>
        </FadeUp>
        <SlideIn className="rx-h2 mt-6">{RX_PHILOSOPHY.title[0]}</SlideIn>

        {/* sticky stacking cards: each card pins at the same offset and the
            next one scrolls up over it (reference mechanism) */}
        <div className="mt-12">
          {RX_PHILOSOPHY.items.map((item, i) => {
            const c = PHILOSOPHY_CARDS[i];
            return (
              <div
                key={item.index}
                className="md:sticky"
                style={{
                  top: "6rem",
                  zIndex: i + 1,
                  marginBottom: i === RX_PHILOSOPHY.items.length - 1 ? 0 : "1.5rem",
                }}
              >
                <div
                  className="grid overflow-hidden rounded-2xl md:h-[60vh] md:max-h-[42rem] md:min-h-[24rem] md:grid-cols-2"
                  style={{ background: c.panel }}
                >
                  <div className="relative min-h-[16rem]">
                    <Image
                      src={asset(c.photo)}
                      alt={item.title}
                      fill
                      sizes="(min-width: 768px) 48vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-8 p-10 md:p-14">
                    <p className="rx-quote" style={{ color: c.ink }}>
                      {item.desc}
                    </p>
                    <div>
                      <p className="font-bold" style={{ color: c.ink }}>
                        {item.title}
                      </p>
                      <p className="rx-label mt-1" style={{ color: c.muted }}>
                        {RX_PHILOSOPHY.chip} · {item.index}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   Team — strip (home) and full blocks (team page)
   ------------------------------------------------------------------ */

function RxMonogram({ name, dark = false }: { name: string; dark?: boolean }) {
  const initials = name
    .replace(/Dr\.\s|,.*$/g, "")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <span
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold"
      style={{
        background: dark ? "var(--rx-dark)" : "var(--rx-grey)",
        color: dark ? "var(--cyan-hot)" : "var(--rx-ink)",
      }}
      aria-hidden
    >
      {initials}
    </span>
  );
}

/** Circular avatar — real photo when available, monogram fallback. */
function RxAvatar({ member, size = 44 }: { member: TeamMember; size?: number }) {
  if (!member.photo) return <RxMonogram name={member.name} dark />;
  return (
    <span
      className="relative inline-block shrink-0 overflow-hidden rounded-full"
      style={{ width: size, height: size }}
    >
      <Image src={member.photo} alt={member.name} fill sizes={`${size}px`} className="object-cover" />
    </span>
  );
}

export function RxTeamStrip() {
  const leaders = [...TEAM.leadership];
  return (
    <section className="rx-sep" style={{ background: "var(--rx-blue-soft)" }}>
      <div className="rx-frame flex flex-wrap items-center justify-between gap-8 px-6 py-14 md:px-10">
        <div>
          <FadeUp>
            <span className="rx-chip" style={{ background: "#fff" }}>
              Team
            </span>
          </FadeUp>
          <SlideIn className="rx-h2 mt-4 max-w-[30rem]">The people behind the capital.</SlideIn>
        </div>
        <div className="flex flex-col gap-4">
          {leaders.map((m) => (
            <FadeUp key={m.name}>
              <div className="flex items-center gap-4">
                <RxAvatar member={m} size={48} />
                <div style={{ lineHeight: 1.3 }}>
                  <p className="font-bold" style={{ color: "var(--rx-ink)" }}>
                    {m.name}
                  </p>
                  <p className="text-sm">{m.role}</p>
                </div>
              </div>
            </FadeUp>
          ))}
          <FadeUp>
            <Link
              href="/v2/team"
              className="group mt-2 inline-flex items-center gap-3 font-bold"
              style={{ color: "var(--rx-ink)" }}
            >
              <span className="rx-circle group-hover:rotate-45" style={{ borderColor: "var(--rx-line)" }} aria-hidden>
                <Arrow />
              </span>
              Meet the team
            </Link>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/** Simple profile card for members whose full bios are pending. */
function RxMemberCard({ member, delay = 0 }: { member: TeamMember; delay?: number }) {
  return (
    <FadeUp delay={delay} className="h-full">
      <div
        className="flex h-full flex-col gap-5 rounded-2xl p-5 transition-transform duration-500 hover:-translate-y-1"
        style={{
          background: "var(--rx-grey)",
          transitionTimingFunction: "var(--ease-quint)",
        }}
      >
        {member.photo ? (
          <span className="relative block aspect-square w-full overflow-hidden rounded-xl">
            <Image
              src={member.photo}
              alt={member.name}
              fill
              sizes="(min-width: 1024px) 22vw, 45vw"
              className="object-cover"
            />
          </span>
        ) : (
          <span
            className="flex aspect-square w-full items-center justify-center rounded-xl"
            style={{ background: "var(--rx-blue)" }}
          >
            <RxMonogram name={member.name} dark />
          </span>
        )}
        <div className="px-2 pb-2">
          <p className="rx-serif text-2xl" style={{ color: "var(--rx-ink)" }}>
            {member.name}
          </p>
          <p className="mt-1 text-sm">{member.role}</p>
        </div>
      </div>
    </FadeUp>
  );
}

function RxTeamGroup({
  label,
  members,
}: {
  label: string;
  members: readonly TeamMember[];
}) {
  return (
    <div className="mt-14">
      <FadeUp>
        <span className="rx-chip">{label}</span>
      </FadeUp>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((m, i) => (
          <RxMemberCard key={m.name} member={m} delay={i * 0.07} />
        ))}
      </div>
    </div>
  );
}

/** Full profile block: name card on the left, complete bio on the right. */
function RxProfile({ member, index }: { member: TeamMember; index: string }) {
  return (
    <article
      className="grid gap-8 py-12 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-16"
      style={{ borderTop: "1px dashed var(--rx-line)" }}
    >
      <div>
        <div className="md:sticky md:top-32">
          <div className="flex items-start justify-between gap-6">
            {member.photo ? (
              <span className="relative block aspect-square w-full max-w-[14rem] overflow-hidden rounded-2xl">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  sizes="14rem"
                  className="object-cover"
                />
              </span>
            ) : (
              <RxMonogram name={member.name} dark />
            )}
            <span className="text-sm font-bold" style={{ color: "var(--rx-accent)" }}>
              {index}
            </span>
          </div>
          <SlideIn as="h3" className="mt-6 text-3xl">
            {member.name}
          </SlideIn>
          <p className="mt-2">
            <span className="rx-chip !py-1.5 text-xs">{member.role}</span>
          </p>
        </div>
      </div>
      <div className="flex max-w-[42rem] flex-col gap-5">
        {member.bio?.map((para, j) => (
          <FadeUp key={j} delay={j * 0.06}>
            <p
              className={j === 0 ? "text-lg leading-relaxed" : "leading-relaxed"}
              style={j === 0 ? { color: "var(--rx-ink)" } : undefined}
            >
              {para}
            </p>
          </FadeUp>
        ))}
      </div>
    </article>
  );
}

export function RxTeamBlocks() {
  return (
    <section className="rx-sep">
      <div className="rx-frame px-6 py-16 md:px-10 md:py-20">
        <FadeUp>
          <p className="rx-lead max-w-[44rem]">{TEAM.intro}</p>
        </FadeUp>

        <RxTeamGroup label="Managing Partners" members={TEAM.leadership} />
        <RxTeamGroup label="Venture Advisors" members={TEAM.advisors} />

        {/* Investment team: full readable profiles */}
        <div className="mt-16">
          <FadeUp>
            <span className="rx-chip">Investment Team</span>
          </FadeUp>
          <div className="mt-8">
            {TEAM.investment.map((m, i) => (
              <RxProfile key={m.name} member={m} index={String(i + 1).padStart(2, "0")} />
            ))}
            <div style={{ borderTop: "1px dashed var(--rx-line)" }} />
          </div>
        </div>

        <RxTeamGroup label="Portfolio Strategy & Operations" members={TEAM.operations} />
      </div>
    </section>
  );
}
