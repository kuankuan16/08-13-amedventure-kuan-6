"use client";

import Link from "next/link";
import { asset } from "@/lib/amed/content";
import { B_ABOUT } from "@/lib/amed/b-content";
import {
  RxGlance,
  RxFocusRows,
  RxProcess,
} from "@/components/amed/rx/sections";
import { MONO, SERIF, INK, BRAND_BLUE, Reveal } from "../shared";
import { PageShell, PageHero } from "../PageShell";
import { PhilosophyStack } from "../PhilosophyStack";

export function AboutB() {
  return (
    <PageShell palette="cyan" active="/b/about">
      <PageHero
        chip={B_ABOUT.chip}
        title={B_ABOUT.title}
        lead={B_ABOUT.lead}
        palette="cyan"
        pageIndex="01"
        image={asset("/amed/images/firm-studio.jpg")}
        word="ABOUT"
        imageAlt="A team around an oak table examining a device prototype"
      />

      {/* founding conviction */}
      <section className="rx-frame px-6 py-24 md:px-10 md:py-32">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
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
                01 — Founding conviction
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <h2
                className="mt-7 text-[2.3rem] leading-[1.02] tracking-tight sm:text-5xl md:text-[62px] md:leading-[0.99]"
                style={{ fontFamily: SERIF, fontWeight: 500, color: "#0a0a0a" }}
              >
                {B_ABOUT.statement.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:pb-3">
            <Reveal delay={0.24}>
              <p className="text-base leading-[1.65] md:text-[17px]">{B_ABOUT.leadRest}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* firm highlights — /v2 spread-from-centre tiles with the masked photo */}
      <RxGlance cards="panel" />

      {/* investment focus — /v2 numbered rows with the hover image panel */}
      <RxFocusRows />

      {/* philosophy — scroll-scrubbed statements */}
      <PhilosophyStack />

      {/* how we partner */}
      <RxProcess />

      {/* onward to the team */}
      <section className="rx-frame px-6 py-24 md:px-10 md:py-32">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
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
                05 — The team
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <h2
                className="mt-7 text-[2.3rem] leading-[1.02] tracking-tight sm:text-5xl md:text-[62px] md:leading-[0.99]"
                style={{ fontFamily: SERIF, fontWeight: 500, color: "#0a0a0a" }}
              >
                {B_ABOUT.teamTitle.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:pb-3">
            <Reveal delay={0.24}>
              <p className="text-base leading-[1.65] md:text-[17px]">{B_ABOUT.teamBody}</p>
              <Link
                href="/b/team"
                className="group mt-8 inline-flex items-center gap-3.5 rounded-full border border-black/10 py-2 pl-6 pr-2 transition-colors hover:border-black/25"
              >
                <span className="text-[15px] font-medium">{B_ABOUT.teamCta}</span>
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
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
