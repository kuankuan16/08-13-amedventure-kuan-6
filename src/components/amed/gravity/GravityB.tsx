"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { asset } from "@/lib/amed/content";
import {
  RxLogoBand,
  RxGlance,
} from "@/components/amed/rx/sections";
import {
  MONO,
  SERIF,
  WHITE_BG,
  RX_WHITE,
  SANS,
  LABEL,
  Reveal,
  ScrollDial,
  GravityHeader,
  B_NAV_ALL,
  CARD_TITLE,
  useSmoothScroll,
} from "./shared";
import { RxCta, RxFooter } from "@/components/amed/rx/ui";
import { StoryFeature } from "./StoryFeature";
import { PhilosophyStack } from "./PhilosophyStack";

/* ------------------------------------------------------------------
   Version B — "Gravity" proposal.
   Same content architecture as /v2, rebuilt around a scroll-driven
   Three.js gravity field (float → drop → heart → release) with an
   AMED palette morph: cyan → royal blue → rose.
   ------------------------------------------------------------------ */

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/** Per-frame crop overrides where the default centre crop misses the subject. */
const FRAME_POS: Record<string, string> = {
  "/amed/images/home-studio-vc-01-stone.png": "50% 50%",
  "/amed/images/home-biomedical-mesh-detail-wide.png": "50% 50%",
  "/amed/images/home-studio-vc-boardroom-asian-editorial.png": "50% 50%",
  "/amed/images/home-center-vc-biomedical-strategy.png": "46% 50%",
  "/amed/images/home-center-vc-clinical-profile.png": "50% 50%",
  "/amed/images/home-center-vc-diligence-sunlight.png": "52% 50%",
  "/amed/images/home-center-vc-sunlit-team-diligence.png": "50% 50%",
  "/amed/images/home-center-vc-investor-profile-sunlit.png": "50% 50%",
  "/amed/images/home-studio-medical-lavender.png": "50% 50%",
  "/amed/images/home-studio-biomedical-mint-wide.png": "50% 50%",
  "/amed/images/home-studio-neurovascular-brain-left-wide.png": "18% 50%",
  "/amed/images/home-studio-device-lab.png": "52% 50%",
  "/amed/images/home-studio-cardio.png": "50% 50%",
  "/amed/images/home-studio-biomedical-blush.png": "50% 50%",
};

/** Keep faces below the rounded top edge in the compact crop. */
const MOBILE_FRAME_POS: Record<string, string> = {
  "/amed/images/home-studio-vc-01-stone.png": "50% 8%",
  "/amed/images/home-studio-vc-01.png": "50% 8%",
  "/amed/images/home-studio-vc-boardroom-asian-editorial.png": "50% 12%",
  "/amed/images/home-center-vc-biomedical-strategy.png": "44% 18%",
  "/amed/images/home-center-vc-clinical-profile.png": "44% 12%",
  "/amed/images/home-center-vc-diligence-sunlight.png": "52% 10%",
  "/amed/images/home-center-vc-sunlit-team-diligence.png": "46% 8%",
  "/amed/images/home-center-vc-investor-profile-sunlit.png": "75% 8%",
  "/amed/images/home-studio-medical-lavender.png": "50% 10%",
  "/amed/images/home-studio-cardio.png": "50% 10%",
  "/amed/images/home-studio-neurovascular-brain-left-wide.png": "18% 50%",
};

/** Local colour correction for the microscopy frame only. */
const FRAME_FILTER: Record<string, string> = {
  "/amed/images/home-studio-biomedical-mint-wide.png":
    "saturate(0.58) contrast(0.96)",
};

const GRID_GAP = "35px";
/** measured from the reference: centre frames 1465x820, outer frames 2216x820 */
const FRAME_H = "101.2svh";
const RATIO_CENTRE = "1465 / 820";
const RATIO_OUTER = "2216 / 820";
/**
 * Seven frames share one editorial system while keeping distinct background
 * colours: venture capital ×2, medical ×1, neural macro ×1, surgery ×1,
 * cardiovascular ×1 and biomedical macro ×1. The centre of row 2 is the VC hero.
 */
const HERO_GRID = [
  [
    "/amed/images/home-biomedical-mesh-detail-wide.png",
    "/amed/images/home-studio-neurovascular-brain-left-wide.png",
  ],
  [
    "/amed/images/home-studio-device-lab.png",
    "/amed/images/home-center-vc-investor-profile-sunlit.png",
    "/amed/images/home-studio-cardio.png",
  ],
  [
    "/amed/images/home-studio-biomedical-blush.png",
    "/amed/images/home-studio-medical-lavender.png",
  ],
];

/* ---------------- main component ---------------------------------- */

export function GravityB() {
  const controlRef = useRef({ progress: 0, started: false });
  const wordLeftRef = useRef<HTMLHeadingElement>(null);
  const wordRightRef = useRef<HTMLSpanElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wordBoxRef = useRef<HTMLDivElement>(null);

  const [bgStage, setBgStage] = useState(0);
  const [loaderValue, setLoaderValue] = useState(0);
  const [loaderLeaving, setLoaderLeaving] = useState(false);
  const [loaderGone, setLoaderGone] = useState(false);
  const [pageIn, setPageIn] = useState(false);
  const [compact, setCompact] = useState(false);

  /* ---- compact layout below md, per the reference's phone/tablet build ---- */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /* ---- smooth scroll + progress ---- */
  const onScrollFrame = useCallback((progress: number) => {
    controlRef.current.progress = progress;
    setBgStage(progress > 1.55 ? 2 : progress > 0.7 ? 1 : 0);
    // wordmark contracts 1.3 -> 1 across the first ~0.56 of a screen
    const k = clamp01(progress / 0.9);
    const t = window.innerWidth < 1024 ? "none" : `scale(${(1.28 - 0.28 * k).toFixed(4)})`;
    if (wordLeftRef.current) wordLeftRef.current.style.transform = t;
    if (wordRightRef.current) wordRightRef.current.style.transform = t;
    // the frame grid contracts around the viewport centre, revealing its neighbours
    const g = 1 - 0.3765 * Math.min(progress, 1.448);
    if (gridRef.current) {
      gridRef.current.style.transform = `translate(-50%, -50%) scale(${g.toFixed(4)})`;
    }
    // once the scale settles the rows counter-drift: outer right, centre left
    // at twice the rate. Divide by g so the travel reads 1:1 on screen.
    const drift = Math.max(0, progress - 1.47) / g;
    if (wordBoxRef.current) {
      // descends while the field contracts, holds, then releases with the page
      const release = Math.max(0, progress - 2.04) * 100;
      if (window.innerWidth < 1024) {
        wordBoxRef.current.style.transform = `translateY(${(-release).toFixed(2)}vh)`;
      } else {
        const descend = 54 + 18 * clamp01(progress / 1.48);
        wordBoxRef.current.style.transform = `translateY(${(descend - release).toFixed(2)}vh)`;
      }
    }
    rowRefs.current.forEach((row, r) => {
      if (!row) return;
      const dx = r === 1 ? -drift * 280 : drift * 140;
      row.style.transform = `translateX(${dx.toFixed(1)}px)`;
    });
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
    <div className="rx-root overflow-x-clip" style={{ ...RX_WHITE, color: "#1a1a1a" }}>
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
      <GravityHeader visible={pageIn} onMedia largeLogo />

      {/* 01 — HERO: a grid of medical-venture frames, sized so the centre
          frame fills the viewport, then scaled down on scroll to reveal its
          neighbours (Studio Aton). */}
      <section className="relative z-10 h-[300svh]" style={{ background: "#0d0e10" }}>
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
              <div
                key={r}
                ref={(el) => {
                  rowRefs.current[r] = el;
                }}
                className="flex"
                style={{ gap: GRID_GAP, willChange: "transform" }}
              >
                {row.map((src, c) => (
                  <div
                    key={src}
                    className="relative overflow-hidden rounded-[1.4rem]"
                    style={{
                      height: compact ? "72svh" : FRAME_H,
                      aspectRatio: compact
                        ? r === 1
                          ? "1.15"
                          : "1.71"
                        : r === 1
                          ? RATIO_CENTRE
                          : RATIO_OUTER,
                    }}
                  >
                    <Image
                      src={asset(src)}
                      alt=""
                      fill
                      priority={r === 1 && c === 1}
                      sizes="100vw"
                      className="object-cover"
                      style={{
                        objectPosition:
                          (compact ? MOBILE_FRAME_POS[src] : undefined) ??
                          FRAME_POS[src] ??
                          "50% 50%",
                        filter: FRAME_FILTER[src],
                      }}
                    />

                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* A neutral contrast veil keeps the bright studio series coherent
              while preserving legibility for the reversed header and wordmark. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(30,36,40,0.52) 0%, rgba(35,41,45,0.38) 48%, rgba(26,32,36,0.46) 100%)",
            }}
          />

          {/* wordmark: one full-width line on desktop; stacked top and
              bottom, left-aligned and unscaled on compact (reference build) */}
          <div
            className={
              compact
                ? "pointer-events-none absolute inset-0 flex flex-col items-start justify-center gap-2 px-5"
                : "pointer-events-none absolute inset-x-0 flex items-baseline justify-between px-4 md:px-6"
            }
            ref={wordBoxRef}
            style={compact ? heroIn(0.2) : { top: 0, ...heroIn(0.2) }}
          >
            <h1
              ref={wordLeftRef}
              className="whitespace-nowrap"
              style={{
                fontFamily: SANS,
                fontWeight: 900,
                fontSize: compact ? "clamp(3rem, 15vw, 5.5rem)" : "clamp(1.9rem, 9.2vw, 12.5rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.035em",
                color: "#ffffff",
                transformOrigin: "left center",
                transform: compact ? "none" : "scale(1.28)",
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
                fontSize: compact ? "clamp(3rem, 15vw, 5.5rem)" : "clamp(1.9rem, 9.2vw, 12.5rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.035em",
                color: "#ffffff",
                transformOrigin: compact ? "left center" : "right center",
                transform: compact ? "none" : "scale(1.28)",
                willChange: "transform",
              }}
            >
              VENTURES
            </span>
          </div>

          <div
            className="pointer-events-none absolute inset-x-0 flex justify-center px-6"
            style={{ bottom: "clamp(56px, 10vh, 120px)", ...heroIn(0.5) }}
          >
            <ScrollDial light targetId="home-first-content" />
          </div>
        </div>
      </section>

      {/* 02 — the studio statement, centred (Studio Aton layout) */}
      <section id="home-first-content" className="rx-frame relative z-10 flex items-center px-6 py-28 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-[78rem] text-center">
          <Reveal>
            <p style={LABEL}>AMED Ventures ®</p>
          </Reveal>
          <Reveal delay={0.12}>
            <p
              className="mt-5 text-[1.5rem] leading-[1.26] tracking-tight sm:text-[2rem] md:text-[2.7rem] md:leading-[1.22]"
              style={{ ...CARD_TITLE, color: "#0a0a0a" }}
            >
              AMED Ventures ® — a MedTech venture firm investing across the United States and
              Taiwan. Backing the medical technologies that change what a clinician can actually
              do, on an ordinary Tuesday morning, in a real hospital.
            </p>
          </Reveal>
          
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
          <PhilosophyStack />
          <StoryFeature />
        </div>
      </div>

      <RxCta />
      <RxFooter nav={B_NAV_ALL} />
    </div>
  );
}
