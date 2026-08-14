"use client";

import { type ReactNode } from "react";
import {
  MONO,
  SERIF,
  PALETTES,
  type PaletteKey,
  GravityHeader,
  GravityFooter,
  useSmoothScroll,
  Reveal,
  ChipLabel,
} from "./shared";
import { AmbientField } from "./AmbientField";

/** Page scaffold for /b section pages: gradient ground, ambient field,
 *  fixed header, smooth scroll and the shared dark footer. */
export function PageShell({
  palette,
  active,
  count,
  children,
}: {
  palette: PaletteKey;
  active: string;
  count?: number;
  children: ReactNode;
}) {
  useSmoothScroll();
  return (
    <div style={{ color: "#1a1a1a" }}>
      <div
        style={{ position: "fixed", inset: 0, zIndex: -10, background: PALETTES[palette].bg }}
      />
      <AmbientField palette={palette} count={count} />
      <GravityHeader active={active} />
      <main className="relative z-10">{children}</main>
      <GravityFooter />
    </div>
  );
}

/** Animated scroll cue, identical to the home hero. */
export function ScrollCue() {
  return (
    <div className="mt-4 hidden animate-pulse items-center gap-2 text-neutral-500 md:flex">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 5v14m0 0l-6-6m6 6l6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.2em" }}>SCROLL</span>
    </div>
  );
}

/**
 * Section opening used on every /b page: mono index label, serif heading and
 * an optional lead — the same rhythm the home page uses between scenes.
 */
export function SectionHead({
  index,
  label,
  title,
  lead,
  palette,
}: {
  index: string;
  label: string;
  title: readonly string[];
  lead?: string;
  palette: PaletteKey;
}) {
  const pal = PALETTES[palette];
  return (
    <div>
      <Reveal>
        <ChipLabel text={`${index} — ${label}`} color={pal.chip} />
      </Reveal>
      <Reveal delay={0.1}>
        <h2
          className="mt-6 max-w-4xl text-[2.4rem] leading-[1.02] tracking-tight sm:text-5xl md:text-[64px] md:leading-[0.98]"
          style={{ fontFamily: SERIF, fontWeight: 500, color: "#0a0a0a" }}
        >
          {title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
      </Reveal>
      {lead ? (
        <Reveal delay={0.18}>
          <p className="mt-7 max-w-xl text-base leading-[1.6] text-neutral-700 md:text-[17px]">
            {lead}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

/**
 * Full-viewport page opening in the home hero's grammar: sans chip and
 * bottom-anchored serif display on the left, a 280px support column on the
 * right with the lead paragraph, a mono page-index line and the scroll cue.
 */
export function PageHero({
  chip,
  title,
  lead,
  palette,
  pageIndex,
}: {
  chip: string;
  title: readonly string[];
  lead: string;
  palette: PaletteKey;
  pageIndex: string;
}) {
  const pal = PALETTES[palette];
  return (
    <section className="relative flex min-h-[100svh] items-end">
      <div className="flex w-full flex-col justify-between gap-8 px-6 pb-12 md:flex-row md:items-end md:px-12 md:pb-14">
        <div className="flex flex-col items-start gap-3.5">
          <Reveal>
            <p
              className="mb-4 text-xs font-medium uppercase md:mb-6 md:text-[14px]"
              style={{ color: pal.accent, letterSpacing: "0.05em" }}
            >
              [ {chip} ]
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <h1
              className={`tracking-tight text-[2.6rem] leading-[0.98] sm:text-6xl ${
                title.length >= 3 ? "md:text-[76px]" : "md:text-[86px]"
              } md:leading-[0.97]`}
              style={{ fontFamily: SERIF, fontWeight: 500, color: "#0a0a0a" }}
            >
              {title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
          </Reveal>
        </div>
        <Reveal delay={0.28} className="md:w-[280px] md:shrink-0">
          <p className="text-[15px] font-medium leading-[1.4]">{lead}</p>
          <p
            className="mt-5 uppercase"
            style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.18em", color: "#737373" }}
          >
            Page {pageIndex} / 05 — © 2026
          </p>
          <ScrollCue />
        </Reveal>
      </div>
    </section>
  );
}
