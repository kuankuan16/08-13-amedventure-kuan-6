"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  MONO,
  SERIF,
  PALETTES,
  RX_WHITE,
  type PaletteKey,
  GravityHeader,
  GravityFooter,
  useSmoothScroll,
  Reveal,
  ChipLabel,
} from "./shared";

/**
 * Page scaffold for /b section pages. The sphere field is exclusive to the
 * home opening (client: 其他頁面不用再出現泡泡) — section pages run on the
 * /v2 system (rx-root) over a white ground, with the B header and footer.
 */
export function PageShell({
  active,
  children,
}: {
  /** kept for per-page accent colour on chips and rules */
  palette: PaletteKey;
  active: string;
  count?: number;
  children: ReactNode;
}) {
  useSmoothScroll();
  return (
    <div className="rx-root" style={RX_WHITE}>
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
          className="mt-6 max-w-[54rem] text-[2.4rem] leading-[1.02] tracking-tight sm:text-5xl md:text-[64px] md:leading-[0.98]"
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
          <p className="mt-7 max-w-[34rem] text-base leading-[1.6] text-neutral-700 md:text-[17px]">
            {lead}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

/**
 * Page opening: the /v2 two-column hero grammar (serif display left, notched
 * photo right revealed by a vertical mask) carrying the B identity — mono
 * chip, page index and scroll cue.
 */
export function PageHero({
  chip,
  title,
  lead,
  palette,
  pageIndex,
  image,
  imageAlt,
}: {
  chip: string;
  title: readonly string[];
  lead: string;
  palette: PaletteKey;
  pageIndex: string;
  image: string;
  imageAlt: string;
}) {
  const pal = PALETTES[palette];
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="rx-frame relative flex min-h-[100svh] flex-col justify-end px-6 pb-12 pt-28 md:px-10 md:pb-16 md:pt-32">
      <div className="grid flex-1 grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-12">
        {/* left: chip + display + lead */}
        <div className="flex flex-col items-start lg:col-span-7">
          <Reveal>
            <p
              className="mb-5 text-xs font-medium uppercase md:mb-7 md:text-[14px]"
              style={{ color: pal.accent, letterSpacing: "0.05em" }}
            >
              [ {chip} ]
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <h1
              className={`tracking-tight text-[2.6rem] leading-[0.98] sm:text-6xl ${
                title.length >= 3 ? "md:text-[68px]" : "md:text-[76px]"
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
          <Reveal delay={0.26}>
            <p className="mt-8 max-w-[30rem] text-[15px] leading-[1.6] md:text-base">{lead}</p>
          </Reveal>
        </div>

        {/* right: notched photo with the vertical mask reveal */}
        <div className="lg:col-span-5">
          <div
            className="rx-clip relative aspect-[7/6] w-full overflow-hidden"
            style={{
              clipPath: shown ? undefined : "inset(100% 0% 0% 0%)",
              transition: "clip-path 1.35s cubic-bezier(0.16,1,0.3,1) 0.15s",
            }}
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
              style={{
                transform: shown ? "scale(1.06)" : "scale(1.25)",
                transition: "transform 1.9s cubic-bezier(0.16,1,0.3,1) 0.15s",
              }}
            />
          </div>
        </div>
      </div>

      {/* baseline: page index + scroll cue */}
      <Reveal delay={0.36}>
        <div className="mt-10 flex items-end justify-between border-t border-black/8 pt-5">
          <p
            className="uppercase"
            style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.18em", color: "#8a8a8a" }}
          >
            Page {pageIndex} / 05 — AMED Ventures © 2026
          </p>
          <ScrollCue />
        </div>
      </Reveal>
    </section>
  );
}
