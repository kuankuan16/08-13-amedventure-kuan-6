"use client";

import Link from "next/link";
import { asset } from "@/lib/amed/content";
import { B_ABOUT } from "@/lib/amed/b-content";
import { RxFocusRows } from "@/components/amed/rx/sections";
import { MONO, SERIF, INK, BRAND_BLUE, Reveal } from "../shared";
import { PageShell, PageHero, MaskedPhoto } from "../PageShell";

export function AboutB() {
  return (
    <PageShell palette="cyan" active="/b/about">
      <PageHero
        chip={B_ABOUT.chip}
        title={B_ABOUT.title}
        lead={B_ABOUT.lead}
        palette="cyan"
        image={asset("/amed/images/page-about.jpg")}
        secondary={asset("/amed/images/hero-b-02.jpg")}
        word="ABOUT"
        imageAlt="Two partners in conversation beside a bright studio window"
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
            <MaskedPhoto
              className="mt-10"
              src={asset("/amed/images/philosophy-01.jpg")}
              alt="Partners in conversation in a bright studio"
            />
          </div>
        </div>
      </section>

      {/* the four convictions — Jores staircase: each card steps right and
          down, and rises into place as it enters the viewport */}
      <section className="rx-frame px-6 pb-16 md:px-10 md:pb-24">
        <div className="border-t border-black/10 pt-14">
          <div className="flex flex-col md:block">
            {B_ABOUT.principles.map((item, i) => (
              <Reveal key={item.index} delay={i * 0.14}>
                <div
                  className="mb-4 flex h-[19rem] flex-col justify-between rounded-2xl p-7 md:mb-[-3.5rem] md:h-[21rem] md:w-[24rem] md:p-8"
                  style={{
                    background: "#f4f4f5",
                    marginLeft: `min(${i * 18}%, ${i * 15}rem)`,
                  }}
                >
                  <div className="flex items-start justify-between gap-6">
                    <h3
                      className="text-[1.35rem] font-bold tracking-tight"
                      style={{ color: "#0a0a0a" }}
                    >
                      {item.title.join(" ")}
                    </h3>
                    <span
                      className="shrink-0 italic text-neutral-400"
                      style={{ fontFamily: SERIF, fontSize: 15 }}
                    >
                      ({item.index})
                    </span>
                  </div>
                  <p className="text-[14.5px] leading-[1.6] text-neutral-600">{item.desc}</p>
                </div>
              </Reveal>
            ))}
            <div className="hidden h-[3.5rem] md:block" />
          </div>
        </div>
      </section>

      {/* investment focus — /v2 numbered rows with the hover image panel */}
      <RxFocusRows tone="sky" />

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
