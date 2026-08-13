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

/** Standard page opening: mono chip, serif display title, optional lead. */
export function PageHero({
  chip,
  title,
  lead,
  palette,
  center = false,
}: {
  chip: string;
  title: readonly string[];
  lead?: string;
  palette: PaletteKey;
  center?: boolean;
}) {
  return (
    <section
      className={`px-6 pb-16 pt-36 md:px-12 md:pb-20 md:pt-48 ${
        center ? "text-center" : ""
      }`}
    >
      <Reveal>
        <p
          className="uppercase"
          style={{
            fontFamily: MONO,
            fontSize: 11,
            letterSpacing: "0.25em",
            color: PALETTES[palette].chip,
          }}
        >
          [ {chip} ]
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <h1
          className={`mt-6 text-[2.6rem] leading-[1.0] tracking-tight sm:text-6xl md:text-[76px] md:leading-[0.97] ${
            center ? "mx-auto" : ""
          }`}
          style={{ fontFamily: SERIF, fontWeight: 500, color: "#0a0a0a" }}
        >
          {title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
      </Reveal>
      {lead ? (
        <Reveal delay={0.2}>
          <p
            className={`mt-8 max-w-xl text-base leading-[1.55] text-neutral-700 md:text-[19px] ${
              center ? "mx-auto" : ""
            }`}
          >
            {lead}
          </p>
        </Reveal>
      ) : null}
    </section>
  );
}
