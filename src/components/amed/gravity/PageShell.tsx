"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  MONO,
  SERIF,
  SANS,
  PALETTES,
  RX_WHITE,
  type PaletteKey,
  GravityHeader,
  GravityFooter,
  useSmoothScroll,
  Reveal,
  ChipLabel,
  BRAND_BLUE,
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

/** Category word split into per-letter masks — each letter rises into an
 *  overflow-clipped box, staggered (the Jores /about grammar). */
function MaskedWord({ text, shown }: { text: string; shown: boolean }) {
  return (
    <span aria-label={text} className="inline-flex">
      {[...text].map((ch, i) => (
        <span
          key={`${ch}-${i}`}
          aria-hidden
          className="inline-block"
          style={{ overflow: "clip", verticalAlign: "bottom" }}
        >
          <span
            className="inline-block"
            style={{
              transform: shown ? "translateY(0)" : "translateY(105%)",
              transition: `transform 0.95s cubic-bezier(0.16,1,0.3,1) ${0.28 + i * 0.045}s`,
            }}
          >
            {ch}
          </span>
        </span>
      ))}
    </span>
  );
}

/**
 * Page opening (Jores /about grammar): a photo panel slides up from far
 * below, the section's category word grows in over it, and the copy arrives
 * on white below the fold.
 */
export function PageHero({
  chip,
  title,
  lead,
  palette,
  pageIndex,
  image,
  imageAlt,
  word,
}: {
  chip: string;
  title: readonly string[];
  lead: string;
  palette: PaletteKey;
  pageIndex: string;
  image: string;
  imageAlt: string;
  /** the big category word, e.g. ABOUT */
  word: string;
}) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 90);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* 01 — the panel rises, then the category word grows over it */}
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
        <div
          className="relative flex flex-1 items-center justify-center px-6 pb-16 pt-28 md:px-10 md:pb-20 md:pt-32"
          style={{
            transform: shown ? "translateY(0)" : "translateY(54vh)",
            transition: "transform 1.15s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* photo panel */}
          <div
            className="absolute inset-x-6 bottom-16 top-28 md:inset-x-[18%] md:bottom-20 md:top-32"
            style={{
              transform: shown ? "translateY(0)" : "translateY(26%)",
              transition: "transform 1.4s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <div className="relative h-full w-full overflow-hidden rounded-[1.6rem]">
              <Image
                src={image}
                alt={imageAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 64vw"
                className="object-cover"
                style={{
                  transform: shown ? "scale(1.04)" : "scale(1.18)",
                  transition: "transform 2.1s cubic-bezier(0.16,1,0.3,1)",
                }}
              />
              {/* scrim so the category word reads over any photo */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(10,12,14,0.28) 0%, rgba(10,12,14,0.42) 55%, rgba(10,12,14,0.3) 100%)",
                }}
              />
            </div>
          </div>

          {/* category word */}
          <h1
            className="relative z-10 whitespace-nowrap text-center"
            style={{
              fontFamily: SANS,
              fontWeight: 900,
              fontSize: "clamp(3rem, 15vw, 15rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.035em",
              color: "#ffffff",
            }}
          >
            <MaskedWord text={word} shown={shown} />
          </h1>
        </div>

        <div className="rx-frame w-full px-6 pb-10 md:px-10 md:pb-12">
          <div className="flex items-end justify-between">
            <p
              className="uppercase"
              style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.18em", color: "#8a8a8a" }}
            >
              Page {pageIndex} / 05 — AMED Ventures © 2026
            </p>
            <ScrollCue />
          </div>
        </div>
      </section>

      {/* 02 — the copy lands on white */}
      <section className="rx-frame px-6 py-24 md:px-10 md:py-32">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <p
                className="text-xs font-medium uppercase md:text-[14px]"
                style={{ color: BRAND_BLUE, letterSpacing: "0.05em" }}
              >
                {chip}
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <h2
                className={`mt-7 tracking-tight text-[2.4rem] leading-[1.0] sm:text-5xl ${
                  title.length >= 3 ? "md:text-[62px]" : "md:text-[70px]"
                } md:leading-[0.98]`}
                style={{ fontFamily: SERIF, fontWeight: 500, color: "#0a0a0a" }}
              >
                {title.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:pb-3">
            <Reveal delay={0.24}>
              <p className="max-w-[30rem] text-base leading-[1.65] md:text-[17px]">{lead}</p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
