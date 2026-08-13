"use client";

import { useState } from "react";
import Image from "next/image";
import { PORTFOLIO, PORTFOLIO_FILTERS } from "@/lib/amed/content";
import { MONO, SERIF, INK, PALETTES, Reveal, Glass } from "../shared";
import { PageShell, PageHero } from "../PageShell";

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
        chip="03 — Portfolio"
        title={PORTFOLIO.statement}
        lead={PORTFOLIO.body}
        palette="rose"
      />

      <section className="px-6 pb-32 md:px-12 md:pb-44">
        {/* filters */}
        <Reveal>
          <div className="flex flex-wrap gap-2.5">
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
          </div>
        </Reveal>

        {/* grid */}
        <div className="mt-10 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {companies.map((company, i) => (
            <Reveal key={company.name} delay={Math.min(i, 7) * 0.05}>
              <Glass hover innerClassName="flex h-full flex-col p-6">
                <div className="flex h-16 items-center">
                  {company.logo ? (
                    <Image
                      src={company.logo}
                      alt={company.name}
                      width={220}
                      height={64}
                      className="h-9 w-auto max-w-[75%] object-contain object-left"
                    />
                  ) : (
                    <span className="text-xl" style={{ fontFamily: SERIF, fontWeight: 500 }}>
                      {company.name}
                    </span>
                  )}
                </div>
                <p className="mt-4 text-[15px] font-semibold">{company.name}</p>
                <p className="mt-1 text-[13px] leading-[1.5] text-neutral-500">{company.sector}</p>
                <div
                  className="mt-auto flex items-center justify-between pt-5 uppercase text-neutral-400"
                  style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.08em" }}
                >
                  <span>{company.location}</span>
                  <span>Since {company.year}</span>
                </div>
              </Glass>
            </Reveal>
          ))}
        </div>

        {/* exited */}
        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-wrap items-center gap-3">
            <span
              className="uppercase text-neutral-400"
              style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.22em" }}
            >
              Exited
            </span>
            {PORTFOLIO.exited.map((name) => (
              <span
                key={name}
                className="rounded-full px-4 py-2 text-[13px] text-neutral-600"
                style={{
                  border: "1px solid rgba(255,255,255,0.65)",
                  background: "rgba(255,255,255,0.4)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                {name}
              </span>
            ))}
            <span className="h-2 w-2 rounded-full" style={{ background: pal.accent }} />
          </div>
        </Reveal>
      </section>
    </PageShell>
  );
}
