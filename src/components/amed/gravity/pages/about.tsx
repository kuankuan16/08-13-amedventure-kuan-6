"use client";

import Image from "next/image";
import Link from "next/link";
import { RX_FOCUS } from "@/lib/amed/rx-content";
import { B_ABOUT } from "@/lib/amed/b-content";
import { MONO, SERIF, INK, PALETTES, Reveal, Glass, ChipLabel } from "../shared";
import { PageShell, PageHero, SectionHead } from "../PageShell";

const pal = PALETTES.cyan;

export function AboutB() {
  return (
    <PageShell palette="cyan" active="/b/about">
      <PageHero
        chip={B_ABOUT.chip}
        title={B_ABOUT.title}
        lead={B_ABOUT.lead}
        palette="cyan"
        pageIndex="01"
      />

      {/* 01 — founding conviction statement */}
      <section className="flex min-h-[80svh] items-center px-6 py-28 md:px-12 md:py-36">
        <div className="grid w-full grid-cols-1 items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <ChipLabel text="01 — Founding conviction" color={pal.chip} />
            </Reveal>
            <Reveal delay={0.12}>
              <h2
                className="mt-6 text-[2.4rem] leading-[1.0] tracking-tight sm:text-5xl md:text-[68px] md:leading-[0.98]"
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
              <p className="text-base leading-[1.6] text-neutral-700 md:text-[17px]">
                {B_ABOUT.leadRest}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 02 — principles */}
      <section className="px-6 py-24 md:px-12 md:py-32">
        <SectionHead index="02" label="What we believe in" title={["Four convictions,", "one standard."]} palette="cyan" />
        <div className="mt-14 grid grid-cols-1 gap-3.5 md:grid-cols-2">
          {B_ABOUT.principles.map((item, i) => (
            <Reveal key={item.index} delay={i * 0.07}>
              <Glass hover innerClassName="flex h-full flex-col p-7 md:p-9">
                <div className="flex items-center justify-between">
                  <span style={{ fontFamily: MONO, fontSize: 11, color: pal.accent }}>
                    {item.index}
                  </span>
                  <span className="h-2 w-2 rounded-full" style={{ background: pal.accent }} />
                </div>
                <h3
                  className="mt-8 text-[26px] leading-[1.12] md:text-[32px]"
                  style={{ fontFamily: SERIF, fontWeight: 500 }}
                >
                  {item.title.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h3>
                <p className="mt-4 text-[15px] leading-[1.65] text-neutral-600">{item.desc}</p>
              </Glass>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 03 — investment focus */}
      <section className="px-6 py-24 md:px-12 md:py-32">
        <SectionHead
          index="03"
          label="Investment focus"
          title={B_ABOUT.focusTitle}
          lead={B_ABOUT.focusBody[0]}
          palette="cyan"
        />
        <div className="mt-14 flex flex-col gap-3.5">
          {RX_FOCUS.rows.map((row, i) => (
            <Reveal key={row.index} delay={i * 0.06}>
              <Glass hover innerClassName="flex flex-col gap-6 p-6 md:flex-row md:items-center md:gap-10 md:p-7">
                <span
                  className="shrink-0"
                  style={{ fontFamily: MONO, fontSize: 12, color: pal.accent }}
                >
                  {row.index}
                </span>
                <div className="relative hidden h-24 w-36 shrink-0 overflow-hidden rounded-2xl md:block">
                  <Image
                    src={row.image}
                    alt={row.title}
                    fill
                    sizes="144px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h3
                    className="text-2xl md:text-[30px]"
                    style={{ fontFamily: SERIF, fontWeight: 400 }}
                  >
                    {row.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-[15px] leading-[1.6] text-neutral-600">
                    {row.desc}
                  </p>
                </div>
              </Glass>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="mt-12">
            <p
              className="uppercase text-neutral-400"
              style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.22em" }}
            >
              {RX_FOCUS.areasLabel}
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {RX_FOCUS.areas.map((area) => (
                <span
                  key={area}
                  className="rounded-full px-4 py-2 text-[13px] text-neutral-700"
                  style={{
                    border: "1px solid rgba(255,255,255,0.65)",
                    background: "rgba(255,255,255,0.4)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                  }}
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* 04 — the team, pointing onward */}
      <section className="flex min-h-[70svh] items-center px-6 py-24 md:px-12 md:py-32">
        <div className="grid w-full grid-cols-1 items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <ChipLabel text="04 — The team" color={pal.chip} />
            </Reveal>
            <Reveal delay={0.12}>
              <h2
                className="mt-6 text-[2.4rem] leading-[1.0] tracking-tight sm:text-5xl md:text-[68px] md:leading-[0.98]"
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
              <p className="text-base leading-[1.55] text-neutral-700 md:text-[17px]">
                {B_ABOUT.teamBody}
              </p>
              <Link
                href="/b/team"
                className="group mt-8 inline-flex items-center gap-3.5 rounded-full py-2 pl-6 pr-2"
                style={{
                  border: "1px solid rgba(255,255,255,0.7)",
                  background: "rgba(255,255,255,0.42)",
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                }}
              >
                <span className="text-[15px] font-medium">{B_ABOUT.teamCta}</span>
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-transform group-hover:scale-105"
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
