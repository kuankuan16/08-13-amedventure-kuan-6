"use client";

import { useEffect, useRef, useState } from "react";
import { B_ABOUT } from "@/lib/amed/b-content";
import { BRAND_BLUE, LABEL, MONO, SANS, SERIF } from "./shared";

const POINTS = [
  { year: "2009", x: 40, y: 310 },
  { year: "2014", x: 390, y: 293 },
  { year: "2016", x: 530, y: 260 },
  { year: "2017", x: 600, y: 193 },
  { year: "2018", x: 670, y: 143 },
  { year: "2019", x: 740, y: 126 },
  { year: "2020", x: 810, y: 110 },
  { year: "2023", x: 1020, y: 93 },
  { year: "2025", x: 1160, y: 60 },
] as const;

const TREND_PATH =
  "M40 310 C175 309 300 301 390 293 S480 273 530 260 S565 217 600 193 S630 154 670 143 S710 130 740 126 S780 115 810 110 S930 101 1020 93 S1100 72 1160 60";

function useAnimatedCount(target: number, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(target);
      return;
    }

    let raf = 0;
    const started = performance.now();
    const duration = 1450;
    const frame = (now: number) => {
      const progress = Math.min(1, (now - started) / duration);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);

  return count;
}

export function AboutPortfolioIndex() {
  const root = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(false);
  const focusAreaCount = useAnimatedCount(8, active);
  const copy = B_ABOUT.portfolioIndex;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={root}
      id="portfolio-index"
      className="relative overflow-hidden bg-[#071a28] text-white"
    >
      <div className="rx-frame px-6 py-16 md:px-10 md:py-24 lg:py-28">
        <div className="flex items-center justify-between gap-5 border-b border-white/15 pb-5">
          <span style={{ ...LABEL, color: "rgba(255,255,255,0.58)" }}>
            + {copy.chip}
          </span>
          <span
            className="text-[11px] uppercase tracking-[0.16em] text-white/45"
            style={{ fontFamily: MONO }}
          >
            ©2026
          </span>
        </div>

        <div className="grid gap-10 py-14 md:grid-cols-[minmax(0,1fr)_minmax(15rem,0.38fr)] md:items-start md:py-20">
          <h2
            className="max-w-[42rem] text-[clamp(2.75rem,11vw,3.875rem)] leading-[0.98] tracking-[-0.045em] md:text-[62px]"
            style={{
              fontFamily: SERIF,
              fontWeight: 500,
              color: "#ffffff",
              opacity: active ? 1 : 0,
              transform: active ? "translateY(0)" : "translateY(42px)",
              transition: "opacity .8s ease .08s, transform 1s cubic-bezier(0.22,1,0.36,1) .08s",
            }}
          >
            {copy.title}
          </h2>
          <div className="md:justify-self-end md:min-w-[20rem]">
            <p className="text-[11px] uppercase tracking-[0.14em] text-white/48" style={{ fontFamily: MONO }}>
              {copy.stageLabel}
            </p>
            <div
              className="mt-4 whitespace-nowrap text-[clamp(2rem,3.8vw,3.75rem)] leading-[0.92] tracking-[-0.045em]"
              style={{
                fontFamily: SANS,
                fontWeight: 500,
                color: "#ffffff",
                clipPath: active ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
                transition: "clip-path 1s cubic-bezier(0.22,1,0.36,1) .22s",
              }}
            >
              {copy.stage}
            </div>
            <div className="mt-9 grid grid-cols-[0.72fr_1.28fr] border-t border-white/15 pt-5">
              <div>
                <span className="block text-[2.8rem] leading-none text-white" style={{ fontFamily: SANS }}>
                  {focusAreaCount}
                </span>
                <span className="mt-2 block text-[11px] uppercase tracking-[0.1em] text-white/48" style={{ fontFamily: MONO }}>
                  {copy.focusCount}
                </span>
              </div>
              <div className="border-l border-white/15 pl-5">
                <span className="block text-[18px] leading-tight text-white" style={{ fontFamily: SANS }}>
                  {copy.scope}
                </span>
                <span className="mt-2 block text-[11px] uppercase tracking-[0.1em] text-white/48" style={{ fontFamily: MONO }}>
                  {copy.scopeLabel}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/15 pt-5">
          <div
            className="grid grid-cols-5 text-[10px] uppercase tracking-[0.12em] text-white/42 md:text-[11px]"
            style={{ fontFamily: MONO }}
            aria-hidden
          >
            {['2009', '2014', '2018', '2021', '2025'].map((year, index) => (
              <span key={year} className={index === 4 ? "text-right" : ""}>
                {year}
              </span>
            ))}
          </div>

          <div className="relative mt-4 aspect-[1.45/1] min-h-[18rem] w-full md:aspect-[3.25/1] md:min-h-0">
            <svg
              viewBox="0 0 1200 350"
              className="absolute inset-0 h-full w-full overflow-visible"
              preserveAspectRatio="none"
              role="img"
              aria-label="Cumulative timeline of the sixteen active portfolio companies shown on this website"
            >
              <defs>
                <linearGradient id="amed-index-line" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="rgba(255,255,255,0.3)" />
                  <stop offset="0.55" stopColor="#ffffff" />
                  <stop offset="1" stopColor={BRAND_BLUE} />
                </linearGradient>
              </defs>

              {POINTS.map((point, index) => (
                <g key={point.year}>
                  <line
                    x1={point.x}
                    y1={point.y}
                    x2={point.x}
                    y2="330"
                    stroke="rgba(255,255,255,0.54)"
                    strokeWidth="1.1"
                    vectorEffect="non-scaling-stroke"
                    style={{
                      opacity: active ? 1 : 0,
                      transform: active ? "scaleY(1)" : "scaleY(0)",
                      transformBox: "fill-box",
                      transformOrigin: "center bottom",
                      transition: `transform 1s cubic-bezier(0.22,1,0.36,1) ${0.1 + index * 0.08}s, opacity .35s ease ${0.1 + index * 0.08}s`,
                    }}
                  />
                  <rect
                    x={point.x - 2.25}
                    y={point.y - 2.25}
                    width="4.5"
                    height="4.5"
                    fill="#fff"
                    style={{
                      opacity: active ? 1 : 0,
                      transition: `opacity .35s ease ${0.62 + index * 0.08}s`,
                    }}
                  />
                  <rect
                    x={point.x - 2.25}
                    y="327.75"
                    width="4.5"
                    height="4.5"
                    fill="#fff"
                    style={{
                      opacity: active ? 0.72 : 0,
                      transition: `opacity .35s ease ${0.5 + index * 0.08}s`,
                    }}
                  />
                </g>
              ))}

              <path
                d={TREND_PATH}
                fill="none"
                stroke="url(#amed-index-line)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset={active ? 0 : 1}
                style={{
                  transition: "stroke-dashoffset 2.25s cubic-bezier(0.22,1,0.36,1) .4s",
                }}
              />
            </svg>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-6 border-t border-white/15 pt-6 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.1em]" style={{ fontFamily: MONO }}>
            <span className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 bg-white" /> {copy.timelineLabel}
            </span>
            <span className="flex items-center gap-2.5 text-white/52">
              <span className="h-2.5 w-2.5 border border-white/50" /> {copy.trajectoryLabel}
            </span>
          </div>
          <div className="max-w-[34rem] space-y-1 text-[11px] leading-[1.5] text-white/40" style={{ fontFamily: SANS }}>
            {copy.notes.map((note, index) => (
              <p key={note}>{index + 1} — {note}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
