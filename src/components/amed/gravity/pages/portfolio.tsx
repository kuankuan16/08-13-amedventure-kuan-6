"use client";

import { useState } from "react";
import Image from "next/image";
import { PORTFOLIO, PORTFOLIO_FILTERS } from "@/lib/amed/content";
import { B_PORTFOLIO, B_COMPANY_NOTES } from "@/lib/amed/b-content";
import { MONO, SERIF, INK, PALETTES, Reveal, Glass } from "../shared";
import { PageShell, PageHero, SectionHead } from "../PageShell";

const pal = PALETTES.rose;

export function PortfolioB() {
  const [filter, setFilter] = useState<string>("all");
  const companies =
    filter === "all"
      ? PORTFOLIO.companies
      : PORTFOLIO.companies.filter((c) => c.group === filter);

  return (
    <PageShell palette="rose" active="/b/portfolio" count={22}>
      <PageHero
        chip={B_PORTFOLIO.chip}
        title={B_PORTFOLIO.title}
        lead={B_PORTFOLIO.lead}
        palette="rose"
        pageIndex="02"
      />

      <section className="px-6 py-24 md:px-12 md:py-32">
        <SectionHead
          index="01"
          label="Active portfolio"
          title={["The companies", "we back today."]}
          lead={B_PORTFOLIO.leadRest}
          palette="rose"
        />

        {/* filters */}
        <Reveal delay={0.12}>
          <div className="mt-12 flex flex-wrap gap-2.5">
            {PORTFOLIO_FILTERS.map((f) => {
              const isActive = filter === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFilter(f.key)}
                  className="rounded-full px-4 py-2 text-[13px] font-medium transition-colors"
                  style={
                    isActive
                      ? { background: INK, color: "#ffffff" }
                      : {
                          border: "1px solid rgba(255,255,255,0.65)",
                          background: "rgba(255,255,255,0.4)",
                          backdropFilter: "blur(12px)",
                          WebkitBackdropFilter: "blur(12px)",
                          color: "#404040",
                        }
                  }
                >
                  {f.label}
                </button>
              );
            })}
            <span
              className="ml-auto self-center uppercase text-neutral-400"
              style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.2em" }}
            >
              {String(companies.length).padStart(2, "0")} companies
            </span>
          </div>
        </Reveal>

        {/* grid */}
        <div className="mt-8 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((company, i) => (
            <Reveal key={company.name} delay={Math.min(i, 5) * 0.05}>
              <Glass hover innerClassName="flex h-full flex-col p-7">
                <div className="flex h-14 items-center">
                  {company.logo ? (
                    <Image
                      src={company.logo}
                      alt={company.name}
                      width={220}
                      height={64}
                      className="h-8 w-auto max-w-[70%] object-contain object-left"
                    />
                  ) : (
                    <span className="text-xl" style={{ fontFamily: SERIF, fontWeight: 500 }}>
                      {company.name}
                    </span>
                  )}
                </div>
                <p
                  className="mt-6 text-[22px] leading-tight"
                  style={{ fontFamily: SERIF, fontWeight: 500 }}
                >
                  {company.name}
                </p>
                <p className="mt-3 text-[14px] leading-[1.6] text-neutral-600">
                  {B_COMPANY_NOTES[company.name] ?? company.sector}
                </p>
                <div
                  className="mt-auto flex items-center justify-between pt-7 uppercase text-neutral-400"
                  style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.08em" }}
                >
                  <span>{company.location}</span>
                  <span>Founded {company.year}</span>
                </div>
              </Glass>
            </Reveal>
          ))}
        </div>

        {/* realized */}
        <div className="mt-20">
          <Reveal>
            <p
              className="uppercase text-neutral-400"
              style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.22em" }}
            >
              {B_PORTFOLIO.realizedLabel}
            </p>
          </Reveal>
          <div className="mt-5 grid grid-cols-2 gap-3.5 sm:grid-cols-4">
            {[...PORTFOLIO.exited].sort().map((name, i) => (
              <Reveal key={name} delay={i * 0.06}>
                <Glass innerClassName="p-6">
                  <span className="h-2 w-2 rounded-full" style={{ background: pal.accent, display: "block" }} />
                  <p className="mt-5 text-xl" style={{ fontFamily: SERIF, fontWeight: 500 }}>
                    {name}
                  </p>
                  <p className="mt-2 text-[13px] leading-[1.55] text-neutral-500">
                    {B_PORTFOLIO.realizedNote}
                  </p>
                </Glass>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
