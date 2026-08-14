"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { asset } from "@/lib/amed/content";
import { RX_HERO, RX_MAILTO, RX_PHILOSOPHY } from "@/lib/amed/rx-content";
import {
  RxLogoBand,
  RxGlance,
  RxFocusCards,
  RxStoryList,
} from "@/components/amed/rx/sections";
import {
  MONO,
  SERIF,
  WHITE_BG,
  RX_WHITE,
  INK,
  SANS,
  Reveal,
  GravityHeader,
  GravityFooter,
  useSmoothScroll,
  BRAND_BLUE,
} from "./shared";
import { PhilosophyStack } from "./PhilosophyStack";

/* ------------------------------------------------------------------
   Version B — "Gravity" proposal.
   Same content architecture as /v2, rebuilt around a scroll-driven
   Three.js gravity field (float → drop → heart → release) with an
   AMED palette morph: cyan → royal blue → rose.
   ------------------------------------------------------------------ */

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

const GRID_GAP = "22px";
/** Three rows of medical-venture frames; the centre of row 2 is the hero. */
const HERO_GRID = [
  ["/amed/images/hero-vc-01.jpg", "/amed/images/focus-03.jpg"],
  ["/amed/images/philosophy-01.jpg", "/amed/images/hero-b-01.jpg", "/amed/images/hero-b-02.jpg"],
  ["/amed/images/practice-b-operating.jpg", "/amed/images/focus-04.jpg"],
];

/* ---------------- main component ---------------------------------- */

export function GravityB() {
  const controlRef = useRef({ progress: 0, started: false });
  const wordLeftRef = useRef<HTMLHeadingElement>(null);
  const wordRightRef = useRef<HTMLSpanElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [bgStage, setBgStage] = useState(0);
  const [loaderValue, setLoaderValue] = useState(0);
  const [loaderLeaving, setLoaderLeaving] = useState(false);
  const [loaderGone, setLoaderGone] = useState(false);
  const [pageIn, setPageIn] = useState(false);

  /* ---- smooth scroll + progress ---- */
  const onScrollFrame = useCallback((progress: number) => {
    controlRef.current.progress = progress;
    setBgStage(progress > 1.55 ? 2 : progress > 0.7 ? 1 : 0);
    // wordmark contracts 1.3 -> 1 across the first ~0.56 of a screen
    const k = clamp01(progress / 0.56);
    const s = 1.3 - 0.3 * k;
    const t = `scale(${s.toFixed(4)})`;
    if (wordLeftRef.current) wordLeftRef.current.style.transform = t;
    if (wordRightRef.current) wordRightRef.current.style.transform = t;
    // the frame grid contracts around the viewport centre, revealing its neighbours
    if (gridRef.current) {
      const g = 1 - 0.34 * clamp01(progress / 0.9);
      gridRef.current.style.transform = `translate(-50%, -50%) scale(${g.toFixed(4)})`;
    }
  }, []);
  useSmoothScroll(onScrollFrame);

  /* ---- loader progress ---- */
  useEffect(() => {
    let value = 0;
    let last = performance.now();
    let raf = 0;
    let leaveTimer: ReturnType<typeof setTimeout> | null = null;
    let doneTimer: ReturnType<typeof setTimeout> | null = null;
    let finished = false;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const ready = true;
      if (!ready) {
        value += (92 - value) * 1.7 * dt;
      } else {
        value += (100 - value) * 6 * dt;
        if (value >= 99.4) value = 100;
      }
      setLoaderValue(value);
      if (value >= 99.9 && ready && !finished) {
        finished = true;
        leaveTimer = setTimeout(() => setLoaderLeaving(true), 140);
        doneTimer = setTimeout(() => {
          controlRef.current.started = true;
          setLoaderGone(true);
          setPageIn(true);
        }, 140 + 520);
        cancelAnimationFrame(raf);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      if (leaveTimer) clearTimeout(leaveTimer);
      if (doneTimer) clearTimeout(doneTimer);
    };
  }, []);

  /* ---- background: white throughout; the spheres carry the colour ---- */
  const gradients = [WHITE_BG, WHITE_BG, WHITE_BG];

  const heroIn = (delay: number) =>
    ({
      opacity: pageIn ? 1 : 0,
      transform: pageIn ? "translateY(0)" : "translateY(22px)",
      transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }) as const;

  return (
    <div style={{ color: "#1a1a1a" }}>
      {/* background gradient */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -10,
          background: gradients[bgStage],
          transition: "background 1.2s cubic-bezier(0.65,0,0.35,1)",
        }}
      />

      {/* loader — dark ground, centred wordmark, then a curtain wipes up */}
      {!loaderGone && (
        <div className="fixed inset-0 z-[100] overflow-hidden" style={{ pointerEvents: loaderLeaving ? "none" : "auto" }}>
          {/* dark stage */}
          <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ background: "#0b0c0e" }}>
            <div
              style={{
                opacity: loaderLeaving ? 0 : 1,
                transform: loaderLeaving ? "translateY(-10px)" : "translateY(0)",
                transition:
                  "opacity 0.42s cubic-bezier(0.65,0,0.35,1), transform 0.42s cubic-bezier(0.65,0,0.35,1)",
              }}
            >
              <Image
                src={asset("/amed/brand/amed-logo-dark.png")}
                alt="AMED Ventures"
                width={1999}
                height={452}
                priority
                style={{ height: "clamp(28px, 4.2vw, 52px)", width: "auto" }}
              />
            </div>
            <p
              className="absolute"
              style={{
                bottom: "clamp(28px, 6vh, 56px)",
                fontFamily: MONO,
                fontSize: 11,
                letterSpacing: "0.28em",
                color: "rgba(255,255,255,0.5)",
                fontVariantNumeric: "tabular-nums",
                opacity: loaderLeaving ? 0 : 1,
                transition: "opacity 0.3s ease",
              }}
            >
              {String(Math.floor(loaderValue)).padStart(3, "0")}
            </p>
          </div>
          {/* curtain: wipes up over the dark stage and hands off to the white site */}
          <div
            className="absolute inset-x-0 bottom-0"
            style={{
              height: "100%",
              background: "#ffffff",
              transform: loaderLeaving ? "translateY(0)" : "translateY(100%)",
              transition: "transform 0.95s cubic-bezier(0.76,0,0.24,1) 0.18s",
            }}
          />
        </div>
      )}

      {/* header */}
      <GravityHeader visible={pageIn} onMedia />

      {/* 01 — HERO: a grid of medical-venture frames, sized so the centre
          frame fills the viewport, then scaled down on scroll to reveal its
          neighbours (Studio Aton). */}
      <section className="relative z-10 h-[200svh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <div
            ref={gridRef}
            className="absolute left-1/2 top-1/2 flex flex-col items-center"
            style={{
              gap: GRID_GAP,
              transform: "translate(-50%, -50%) scale(1)",
              willChange: "transform",
            }}
          >
            {HERO_GRID.map((row, r) => (
              <div key={r} className="flex" style={{ gap: GRID_GAP }}>
                {row.map((src, c) => (
                  <div
                    key={src}
                    className="relative overflow-hidden rounded-[1.4rem]"
                    style={{
                      width: r === 1 ? "100vw" : "152vw",
                      height: "100svh",
                    }}
                  >
                    <Image
                      src={asset(src)}
                      alt=""
                      fill
                      priority={r === 1 && c === 1}
                      sizes="100vw"
                      className="object-cover"
                    />
                    {r === 1 && c === 1 ? (
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(12,14,17,0.16) 0%, rgba(12,14,17,0.32) 60%, rgba(12,14,17,0.24) 100%)",
                        }}
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* wordmark, seated low */}
          <div
            className="pointer-events-none absolute inset-x-0 flex items-baseline justify-between px-4 md:px-6"
            style={{ top: "58%", ...heroIn(0.2) }}
          >
            <h1
              ref={wordLeftRef}
              className="whitespace-nowrap"
              style={{
                fontFamily: SANS,
                fontWeight: 900,
                fontSize: "clamp(2.2rem, 9.4vw, 13rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.035em",
                color: "#ffffff",
                transformOrigin: "left center",
                transform: "scale(1.3)",
                willChange: "transform",
              }}
            >
              AMED
            </h1>
            <span
              ref={wordRightRef}
              aria-hidden
              className="whitespace-nowrap"
              style={{
                fontFamily: SANS,
                fontWeight: 900,
                fontSize: "clamp(2.2rem, 9.4vw, 13rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.035em",
                color: "#ffffff",
                transformOrigin: "right center",
                transform: "scale(1.3)",
                willChange: "transform",
              }}
            >
              Ventures
            </span>
          </div>

          <p
            className="pointer-events-none absolute inset-x-0 text-center"
            style={{
              bottom: "clamp(28px, 5vh, 56px)",
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.78)",
              ...heroIn(0.5),
            }}
          >
            ( Scroll down )
          </p>
        </div>
      </section>

      {/* 02 — DROP / the studio statement */}
      <section className="rx-frame pointer-events-none relative z-10 flex min-h-[100svh] items-center px-6 py-32 md:px-10 md:py-40">
        <div className="pointer-events-auto w-full">
          <Reveal>
            <p
              className="uppercase"
              style={{
                fontFamily: MONO,
                fontSize: 11,
                letterSpacing: "0.25em",
                color: BRAND_BLUE,
              }}
            >
              AMED Ventures ®
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              className="mt-8 text-[2.4rem] leading-[1.0] tracking-tight sm:text-5xl md:text-[64px] md:leading-[0.98]"
              style={{ fontFamily: SERIF, fontWeight: 500, color: "#0a0a0a" }}
            >
              {RX_HERO.title[0]}
              <br />
              {RX_HERO.title[1]}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p
              className="mt-9 max-w-[52rem] text-[1.15rem] leading-[1.45] sm:text-[1.35rem] md:text-[1.6rem] md:leading-[1.42]"
              style={{ color: "#3a3a3e" }}
            >
              AMED Ventures ® — a MedTech venture firm investing across the United States and
              Taiwan. Backing the medical technologies that change what a clinician can actually
              do, on an ordinary Tuesday morning, in a real hospital.
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <div className="mt-12 flex flex-wrap items-end justify-between gap-8">
              <a
                href={RX_MAILTO}
                className="group inline-flex items-center gap-3.5 rounded-full border border-black/10 py-2 pl-6 pr-2 transition-colors hover:border-black/25"
              >
                <span className="text-[15px] font-medium">Let&apos;s talk</span>
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-transform group-hover:translate-x-0.5"
                  style={{ background: INK }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M9 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
              <p
                className="uppercase"
                style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  color: "#8a8a8a",
                }}
              >
                ( 26© ) — {RX_HERO.chip}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 03 — SHAPE / heart. Taller than a screen so the heart holds, then the
          field flies through the lens as the section exits. */}
      <section className="pointer-events-none relative z-10 min-h-[170svh]">
        <div className="rx-frame sticky top-0 flex h-[100svh] flex-col justify-between px-6 py-32 md:px-10 md:py-36">
        <div className="pointer-events-auto">
          <Reveal>
            <p
              className="uppercase"
              style={{
                fontFamily: MONO,
                fontSize: 11,
                letterSpacing: "0.25em",
                color: BRAND_BLUE,
              }}
            >
              03 — Portfolio
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              className="mt-6 max-w-[54rem] text-[2.6rem] leading-[1.0] tracking-tight sm:text-6xl md:text-[80px] md:leading-[0.95]"
              style={{ fontFamily: SERIF, fontWeight: 500, color: "#0a0a0a" }}
            >
              Every company we back represents lives that will be touched.
            </h2>
          </Reveal>
        </div>
        <div className="pointer-events-auto max-w-sm self-end text-left md:text-right">
          <Reveal delay={0.15}>
            <p className="text-base leading-[1.55] text-neutral-700 md:text-[19px]">
              {RX_PHILOSOPHY.items[3].desc}
            </p>
          </Reveal>
          <Reveal delay={0.28}>
            <span
              className="mt-7 inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-neutral-700"
              style={{
                border: "1px solid rgba(255,255,255,0.55)",
                background: "rgba(255,255,255,0.35)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M4 4l7 16 2-7 7-2L4 4z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>
              <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.2em" }}>
                MOVE THROUGH IT
              </span>
            </span>
          </Reveal>
        </div>
        </div>
      </section>

      {/* handoff — the field flies through the lens and the /v2 content arrives */}
      <div
        className="relative z-10 rx-root"
        style={{ ...RX_WHITE, background: "transparent" }}
      >
        <div style={{ background: "#ffffff" }}>
          <RxLogoBand fullBleed />
          <RxGlance cards="panel" cta={{ label: "More about AMED", href: "/b/about" }} />
          <RxFocusCards />
          <PhilosophyStack />
          <RxStoryList limit={3} serifTitles roomBelow />
        </div>
      </div>

      <GravityFooter />
    </div>
  );
}
