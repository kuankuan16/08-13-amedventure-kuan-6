"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { asset, PORTFOLIO } from "@/lib/amed/content";
import {
  RX_NAV,
  RX_MAILTO,
  RX_HERO,
  RX_ABOUT,
  RX_FOCUS,
  RX_STORY,
  RX_PROCESS,
  RX_CTA,
  RX_FOOTER,
  type RxMilestone,
} from "@/lib/amed/rx-content";
import {
  SmoothScroll,
  FadeUp,
  gsap,
  ScrollTrigger,
  useIsomorphicLayoutEffect,
} from "./motion";

/* ------------------------------------------------------------------
   Shared bits
   ------------------------------------------------------------------ */

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 13L13 3M13 3H5M13 3v8" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function Sparkle() {
  return (
    <span aria-hidden style={{ color: "var(--rx-accent)", fontSize: "1.1rem" }}>
      ✦
    </span>
  );
}

/** Number that counts up when it enters the viewport. */
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { n: 0 };
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 92%",
      once: true,
      onEnter: () =>
        gsap.to(obj, {
          n: value,
          duration: 1.6,
          ease: "quint.out",
          onUpdate: () => {
            el.textContent = `${Math.round(obj.n)}${suffix}`;
          },
        }),
    });
    return () => trigger.kill();
  }, [value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

/** Slide-in-from-left heading, ritovex style. */
function SlideIn({
  children,
  as: Tag = "h2",
  className = "",
}: {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.set(el, { autoAlpha: 0, x: -60 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () =>
          gsap.to(el, { autoAlpha: 1, x: 0, duration: 1, ease: "quint.out" }),
      });
    }, el);
    return () => ctx.revert();
  }, []);
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className}>
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------
   Nav
   ------------------------------------------------------------------ */

function RxNav() {
  return (
    <header
      className="sticky top-0 z-[100]"
      style={{
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderBottom: "1px dashed var(--rx-line)",
      }}
    >
      <div className="rx-frame flex items-center justify-between gap-6 px-6 py-4 md:px-10">
        <a href="#rx-top" className="shrink-0">
          <Image
            src={asset("/amed/brand/amed-logo-light.png")}
            alt="AMED Ventures"
            width={1999}
            height={452}
            priority
            className="h-6 w-auto md:h-7"
          />
        </a>
        <nav
          className="hidden items-center gap-8 md:flex"
          style={{ color: "var(--rx-ink)", fontWeight: 500 }}
        >
          {RX_NAV.map((item) => (
            <a key={item.href} href={item.href} className="u-sweep">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <span
            className="rx-chip"
            style={{ background: "var(--rx-grey)" }}
            aria-hidden
          >
            ✆
          </span>
          <div style={{ lineHeight: 1.25 }}>
            <p className="text-xs" style={{ color: "var(--rx-body)" }}>
              Write any time
            </p>
            <a
              href={RX_MAILTO}
              className="u-sweep text-sm font-bold"
              style={{ color: "var(--rx-ink)" }}
            >
              info@amedventures.com
            </a>
          </div>
        </div>
        <a href={RX_MAILTO} className="rx-btn !py-2.5 !px-4 text-sm lg:hidden">
          Pitch us
        </a>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------
   Hero
   ------------------------------------------------------------------ */

function RxHero() {
  const root = useRef<HTMLDivElement | null>(null);
  const tickerRef = useRef<HTMLDivElement | null>(null);

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
      // focus-area ticker: cycle items vertically
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
            <a
              href="#rx-about"
              className="group inline-flex items-center gap-3 font-bold"
              style={{ color: "var(--rx-ink)" }}
            >
              <span className="rx-circle group-hover:rotate-45" aria-hidden>
                <Arrow />
              </span>
              {RX_HERO.ctaSecondary}
            </a>
          </div>
          <div
            ref={tickerRef}
            className="relative mt-10 h-7 overflow-hidden"
            data-rx-hero-item
            aria-hidden
          >
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
            className="absolute bottom-5 left-5 rounded-xl bg-white/95 px-5 py-4 shadow-lg"
            style={{ backdropFilter: "blur(6px)" }}
          >
            <p className="text-2xl font-black" style={{ color: "var(--rx-ink)" }}>
              <Counter value={16} suffix="" />
            </p>
            <p className="text-sm">Active portfolio companies</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Logo band
   ------------------------------------------------------------------ */

function RxLogoBand() {
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
   About / stats
   ------------------------------------------------------------------ */

function RxAbout() {
  return (
    <section id="rx-about" className="rx-sep">
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
              className="grid grid-cols-2 overflow-hidden rounded-2xl"
              style={{ background: "var(--rx-grey)" }}
            >
              {RX_ABOUT.stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="flex flex-col gap-2 p-7"
                  style={{
                    borderLeft: i % 2 === 1 ? "1px dashed var(--rx-line)" : undefined,
                    borderTop: i > 1 ? "1px dashed var(--rx-line)" : undefined,
                  }}
                >
                  <p className="text-4xl font-black" style={{ color: "var(--rx-ink)" }}>
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <a href="#rx-focus" className="rx-btn">
                {RX_ABOUT.cta}
              </a>
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
   Focus (dark) — numbered rows + areas pill marquee
   ------------------------------------------------------------------ */

function RxFocus() {
  const [active, setActive] = useState(0);
  return (
    <section
      id="rx-focus"
      style={{ background: "var(--rx-dark)", color: "rgba(255,255,255,0.72)" }}
    >
      <div
        className="rx-frame px-6 py-16 md:px-10 md:py-24"
        style={{ borderColor: "var(--rx-dark-line)" }}
      >
        <FadeUp>
          <span
            className="rx-chip"
            style={{ background: "rgba(255,255,255,0.08)", color: "#fff" }}
          >
            {RX_FOCUS.chip}
          </span>
        </FadeUp>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-8">
          <SlideIn className="rx-h2 max-w-[38rem]" >
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

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_minmax(0,24rem)]">
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
                      className="block text-2xl font-black md:text-4xl"
                      style={{ color: "#fff", letterSpacing: "-0.02em" }}
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
                <Image
                  src={row.image}
                  alt={row.title}
                  fill
                  sizes="24rem"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* areas pill marquee */}
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

/* ------------------------------------------------------------------
   Story — filterable milestones
   ------------------------------------------------------------------ */

function RxStory() {
  const [filter, setFilter] = useState("All");
  const listRef = useRef<HTMLDivElement | null>(null);

  const items: RxMilestone[] =
    filter === "All"
      ? [...RX_STORY.milestones]
      : RX_STORY.milestones.filter((m) => m.tag === filter);

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
    <section id="rx-story" className="rx-sep">
      <div className="rx-frame px-6 py-16 md:px-10 md:py-24">
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
        </div>

        <div ref={listRef} className="mt-12">
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
   Process — sticky title + stacked step cards
   ------------------------------------------------------------------ */

function RxProcess() {
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
                <h3 className="mt-2 text-2xl font-black">{step.title}</h3>
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
   CTA + footer (dark)
   ------------------------------------------------------------------ */

function RxCtaFooter() {
  return (
    <section
      id="rx-contact"
      style={{ background: "var(--rx-dark)", color: "rgba(255,255,255,0.72)" }}
    >
      <div
        className="rx-frame px-6 py-16 md:px-10 md:py-24"
        style={{ borderColor: "var(--rx-dark-line)" }}
      >
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <FadeUp>
              <span
                className="rx-chip"
                style={{ background: "rgba(255,255,255,0.08)", color: "#fff" }}
              >
                {RX_CTA.chip}
              </span>
            </FadeUp>
            <SlideIn className="rx-h1 mt-6">
              <span style={{ color: "#fff" }}>
                {RX_CTA.title.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </SlideIn>
            <FadeUp delay={0.1}>
              <p className="mt-6 max-w-[30rem]">{RX_CTA.body}</p>
            </FadeUp>
          </div>
          <FadeUp delay={0.2}>
            <div className="flex flex-col gap-5">
              <a href={RX_MAILTO} className="rx-btn rx-btn--light">
                {RX_CTA.cta}
              </a>
              <div>
                <p className="text-xs">Email</p>
                <a href={RX_MAILTO} className="u-sweep font-bold" style={{ color: "#fff" }}>
                  {RX_CTA.email}
                </a>
              </div>
              <div>
                <p className="text-xs">Offices</p>
                {RX_CTA.offices.map((o) => (
                  <p key={o} className="font-bold" style={{ color: "#fff" }}>
                    {o}
                  </p>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>

        <footer
          className="mt-20 grid gap-10 pt-10 md:grid-cols-[auto_1fr_auto]"
          style={{ borderTop: "1px solid var(--rx-dark-line)" }}
        >
          <div className="max-w-[20rem]">
            <Image
              src={asset("/amed/brand/amed-logo-dark.png")}
              alt="AMED Ventures"
              width={1999}
              height={452}
              className="h-7 w-auto"
            />
            <p className="mt-4 text-sm">{RX_FOOTER.tagline}</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="mb-3 font-bold" style={{ color: "#fff" }}>
                Taiwan
              </p>
              <p className="text-sm">{RX_FOOTER.addressTW}</p>
            </div>
            <div>
              <p className="mb-3 font-bold" style={{ color: "#fff" }}>
                United States
              </p>
              <p className="text-sm">{RX_FOOTER.addressUS}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 md:text-right">
            <nav className="flex flex-wrap gap-5 md:justify-end">
              {RX_NAV.map((item) => (
                <a key={item.href} href={item.href} className="u-sweep text-sm" style={{ color: "#fff" }}>
                  {item.label}
                </a>
              ))}
            </nav>
            <p className="text-sm">{RX_FOOTER.copyright}</p>
          </div>
        </footer>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   Page assembly
   ------------------------------------------------------------------ */

export function RxSite() {
  return (
    <SmoothScroll>
      {/* Satoshi via Fontshare; React hoists the tags */}
      <link rel="preconnect" href="https://api.fontshare.com" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://api.fontshare.com/v2/css?f[]=satoshi@500,700,900&display=swap"
      />
      <div className="rx-root">
        <RxNav />
        <main>
          <RxHero />
          <RxLogoBand />
          <RxAbout />
          <RxFocus />
          <RxStory />
          <RxProcess />
          <RxCtaFooter />
        </main>
      </div>
    </SmoothScroll>
  );
}
