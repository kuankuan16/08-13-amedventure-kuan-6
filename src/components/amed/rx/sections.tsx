"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PORTFOLIO, PORTFOLIO_FILTERS, TEAM, type TeamMember } from "@/lib/amed/content";
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
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-rx-hero-item]",
        { autoAlpha: 0, y: 34 },
        { autoAlpha: 1, y: 0, duration: 1, ease: "quint.out", stagger: 0.12, delay: 0.15 }
      );
      gsap.fromTo(
        "[data-rx-hero-photo]",
        { autoAlpha: 0, x: 60 },
        { autoAlpha: 1, x: 0, duration: 1.2, ease: "quint.out", delay: 0.45 }
      );
      const items = gsap.utils.toArray<HTMLElement>("[data-rx-tick]");
      if (items.length > 1) {
        const tl = gsap.timeline({ repeat: -1 });
        items.forEach((item) => {
          tl.fromTo(
            item,
            { autoAlpha: 0, y: 18 },
            { autoAlpha: 1, y: 0, duration: 0.5, ease: "quint.out" }
          )
            .to(item, { autoAlpha: 1, duration: 1.8 })
            .to(item, { autoAlpha: 0, y: -18, duration: 0.4, ease: "quint.in" });
        });
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div id="rx-top" ref={root}>
      <div className="rx-frame grid items-center gap-12 px-6 py-16 md:grid-cols-2 md:px-10 md:py-24">
        <div>
          <div data-rx-hero-item>
            <span className="rx-chip">{RX_HERO.chip}</span>
          </div>
          <h1 className="rx-h1 mt-6" data-rx-hero-item>
            {RX_HERO.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-[30rem] text-lg" data-rx-hero-item>
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
          <div className="relative mt-10 h-7 overflow-hidden" data-rx-hero-item aria-hidden>
            {RX_HERO.ticker.map((t) => (
              <p
                key={t}
                data-rx-tick
                className="absolute font-bold tracking-wide opacity-0"
                style={{ color: "var(--rx-accent)" }}
              >
                {t}
              </p>
            ))}
          </div>
        </div>

        <div data-rx-hero-photo className="relative">
          <div className="rx-photo aspect-[5/4]">
            <Image
              src={RX_HERO.image}
              alt={RX_HERO.imageAlt}
              fill
              priority
              sizes="(min-width: 768px) 46vw, 100vw"
              className="object-cover"
            />
          </div>
          <div
            className="absolute bottom-5 left-5 max-w-[16rem] rounded-xl bg-white/95 px-5 py-4 shadow-lg"
            style={{ backdropFilter: "blur(6px)" }}
          >
            <p className="rx-serif text-lg" style={{ color: "var(--rx-ink)" }}>
              Beyond capital
            </p>
            <p className="text-sm">
              A long-term partner from early-stage through growth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Logo band (home)
   ------------------------------------------------------------------ */

export function RxLogoBand() {
  const logos = PORTFOLIO.companies.filter((c) => c.logo && !c.reversed);
  return (
    <div className="rx-sep relative">
      <div
        className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2"
        style={{ background: "var(--rx-paper)", padding: "0 0.75rem" }}
      >
        <span className="rx-chip">The companies we back</span>
      </div>
      <div className="rx-frame overflow-hidden px-0 py-12">
        <div className="marquee-track items-center" style={{ animationDuration: "50s" }}>
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center">
              {logos.map((c) => (
                <span key={`${copy}-${c.name}`} className="flex items-center">
                  <span className="relative mx-10 inline-block h-9 w-32">
                    <Image
                      src={c.logo!}
                      alt={c.name}
                      fill
                      sizes="10vw"
                      className="object-contain opacity-70 grayscale"
                    />
                  </span>
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ background: "var(--rx-line)" }}
                    aria-hidden
                  />
                </span>
              ))}
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
  return (
    <section className="rx-sep">
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
            <p className="max-w-[26rem] text-lg">{RX_ABOUT.body}</p>
          </FadeUp>
        </div>

        <div className="mt-16 grid items-center gap-12 md:grid-cols-2">
          <FadeUp>
            <div className="rx-photo aspect-[5/4]">
              <Image
                src={RX_ABOUT.image}
                alt={RX_ABOUT.imageAlt}
                fill
                sizes="(min-width: 768px) 46vw, 100vw"
                className="object-cover"
              />
            </div>
          </FadeUp>
          <div>
            <div
              className="grid overflow-hidden rounded-2xl sm:grid-cols-2"
              style={{ background: "var(--rx-grey)" }}
            >
              {RX_ABOUT.highlights.map((item, i) => (
                <div
                  key={item.title}
                  className="flex flex-col gap-2 p-7"
                  style={{
                    borderLeft: i % 2 === 1 ? "1px dashed var(--rx-line)" : undefined,
                    borderTop: i > 1 ? "1px dashed var(--rx-line)" : undefined,
                  }}
                >
                  <Sparkle />
                  <p className="rx-serif text-xl" style={{ color: "var(--rx-ink)" }}>
                    {item.title}
                  </p>
                  <p className="text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              {cta ? (
                <Link href={cta.href} className="rx-btn">
                  {cta.label}
                </Link>
              ) : (
                <a href={RX_MAILTO} className="rx-btn">
                  Send us your deck
                </a>
              )}
              <div style={{ lineHeight: 1.3 }}>
                <p className="text-xs">Write any time</p>
                <a
                  href={RX_MAILTO}
                  className="u-sweep font-bold"
                  style={{ color: "var(--rx-ink)" }}
                >
                  {RX_ABOUT.email}
                </a>
              </div>
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

/** Compact focus cards for the homepage, linking to the Focus page. */
export function RxFocusCards() {
  return (
    <section className="rx-sep">
      <div className="rx-frame px-6 py-16 md:px-10 md:py-20">
        <FadeUp>
          <span className="rx-chip">{RX_FOCUS.chip}</span>
        </FadeUp>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <SlideIn className="rx-h2 max-w-[34rem]">
            {RX_FOCUS.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </SlideIn>
          <FadeUp>
            <Link href="/v2/focus" className="group inline-flex items-center gap-3 font-bold" style={{ color: "var(--rx-ink)" }}>
              <span className="rx-circle group-hover:rotate-45" aria-hidden>
                <Arrow />
              </span>
              Explore our focus
            </Link>
          </FadeUp>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {RX_FOCUS.rows.map((row, i) => (
            <FadeUp key={row.index} delay={i * 0.08}>
              <Link
                href="/v2/focus"
                className="rx-row group block h-full rounded-2xl p-7 transition-transform duration-500 hover:-translate-y-1"
                style={{
                  background: "var(--rx-grey)",
                  transitionTimingFunction: "var(--ease-quint)",
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold" style={{ color: "var(--rx-accent)" }}>
                    {row.index}
                  </span>
                  <span className="rx-circle !h-10 !w-10" aria-hidden>
                    <Arrow />
                  </span>
                </div>
                <h3 className="mt-6 text-2xl">{row.title}</h3>
                <p className="mt-3 text-sm">{row.desc}</p>
              </Link>
            </FadeUp>
          ))}
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
                <h3 className="mt-4 text-xl" style={{ color: "#fff" }}>
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
                <span className="mt-1 block text-xs">{m.source}</span>
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
    <section className="rx-sep" style={{ background: "var(--rx-grey)" }}>
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
  if (featured) companies = PORTFOLIO.companies.filter((c) => c.logo && !c.reversed).slice(0, 8);

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
    <section className="rx-sep">
      <div className="rx-frame px-6 py-16 md:px-10 md:py-20">
        {featured ? (
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <FadeUp>
                <span className="rx-chip">Portfolio</span>
              </FadeUp>
              <SlideIn className="rx-h2 mt-6 max-w-[36rem]">
                {PORTFOLIO.statement.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </SlideIn>
            </div>
            <FadeUp>
              <Link
                href="/v2/portfolio"
                className="group inline-flex items-center gap-3 font-bold"
                style={{ color: "var(--rx-ink)" }}
              >
                <span className="rx-circle group-hover:rotate-45" aria-hidden>
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
                      background: active ? "var(--rx-dark)" : "transparent",
                      color: active ? "#fff" : "var(--rx-ink)",
                      borderColor: active ? "var(--rx-dark)" : "var(--rx-line)",
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
              className="group relative flex aspect-[4/3] flex-col items-center justify-center overflow-hidden rounded-2xl p-6 transition-transform duration-500 hover:-translate-y-1"
              style={{
                background: company.reversed ? "var(--rx-dark)" : "var(--rx-grey)",
                transitionTimingFunction: "var(--ease-quint)",
              }}
            >
              <div className="relative flex h-12 w-full items-center justify-center md:h-14">
                {company.logo ? (
                  <Image
                    src={company.logo}
                    alt={company.name}
                    fill
                    sizes="22vw"
                    className="object-contain opacity-75 grayscale transition-[filter,opacity] duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                ) : (
                  <span
                    className="rx-serif text-2xl opacity-75 transition-opacity duration-500 group-hover:opacity-100"
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
                <p
                  className="text-sm font-bold"
                  style={{ color: company.reversed ? "#fff" : "var(--rx-ink)" }}
                >
                  {company.name}
                </p>
                <p
                  className="text-xs"
                  style={{ color: company.reversed ? "rgba(255,255,255,0.6)" : "var(--rx-body)" }}
                >
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
              style={{ borderTop: "1px dashed var(--rx-line)" }}
            >
              <span className="rx-chip !py-1.5 text-xs">Exited</span>
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

export function RxTeamStrip() {
  const leaders = [...TEAM.leadership];
  return (
    <section className="rx-sep" style={{ background: "var(--rx-grey)" }}>
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
                <RxMonogram name={m.name} dark />
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
        className="flex h-full flex-col gap-5 rounded-2xl p-7 transition-transform duration-500 hover:-translate-y-1"
        style={{
          background: "var(--rx-grey)",
          transitionTimingFunction: "var(--ease-quint)",
        }}
      >
        <RxMonogram name={member.name} dark />
        <div>
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
          <div className="flex items-center justify-between">
            <RxMonogram name={member.name} dark />
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
          <p className="max-w-[44rem] text-lg">{TEAM.intro}</p>
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
