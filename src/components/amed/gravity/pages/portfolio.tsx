"use client";

import { useState } from "react";
import Image from "next/image";
import { asset, PORTFOLIO, PORTFOLIO_FILTERS, type PortfolioCompany } from "@/lib/amed/content";
import { B_PORTFOLIO, B_COMPANY_NOTES } from "@/lib/amed/b-content";
import { MONO, SERIF, INK, PALETTES, Reveal } from "../shared";
import { PageShell, PageHero, SectionHead } from "../PageShell";

const pal = PALETTES.rose;

/**
 * Optical size normalization: each mark gets an explicit height and
 * aspect ratio so wordmarks and lockups read as the same visual weight
 * rather than at their raw file proportions. Measured per logo.
 */
const LOGO_SIZE: Record<string, { h: number; r: number }> = {
  "Adona Medical": { h: 30, r: 2.53 },
  "Akura Medical": { h: 27, r: 3.53 },
  "Atia Vision": { h: 28, r: 3.27 },
  "Benthic Genomics": { h: 54, r: 0.6 }, // vertical mark — taller to match optical mass
  "Dynaflex Technologies": { h: 27, r: 3.44 },
  "Imperative Care": { h: 17, r: 8.26 },
  Instylla: { h: 34, r: 2.1 },
  "Kandu Health": { h: 26, r: 3.74 },
  "KT Medical": { h: 15, r: 9.81 },
  Rejoni: { h: 28, r: 3.31 },
  Sealonix: { h: 23, r: 4.77 },
  "Supira Medical": { h: 31, r: 2.65 },
  "Tioga Cardiovascular": { h: 26, r: 3.87 },
  "Tulavi Therapeutics": { h: 30, r: 2.89 },
  "Verge Medical": { h: 30, r: 2.76 },
  Wiltrom: { h: 28, r: 3.23 },
};

function CompanyCard({ company, index }: { company: PortfolioCompany; index: number }) {
  const [hover, setHover] = useState(false);
  const size = LOGO_SIZE[company.name] ?? { h: 28, r: 3.2 };
  const w = Math.min(Math.round(size.h * size.r), 190);

  return (
    <Reveal delay={Math.min(index, 5) * 0.05}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        tabIndex={0}
        className="group relative aspect-[4/3] overflow-hidden rounded-[1.4rem] outline-none"
        style={{
          border: "1px solid rgba(20,19,26,0.08)",
          background: "#ffffff",
          boxShadow: "0 10px 30px -18px rgba(20,19,26,0.35)",
        }}
      >
        {/* full-bleed hover ground */}
        <div
          className="absolute inset-0"
          style={{
            background: pal.soft,
            opacity: hover ? 1 : 0,
            transition: "opacity 0.5s cubic-bezier(0.16,1,0.3,1)",
          }}
        />

        {/* resting state: normalized logo, centered */}
        <div
          className="absolute inset-0 flex items-center justify-center p-8"
          style={{
            opacity: hover ? 0 : 1,
            transform: hover ? "scale(0.96)" : "scale(1)",
            transition:
              "opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {company.logo ? (
            <span className="relative block" style={{ height: size.h, width: w }}>
              <Image
                src={company.logo}
                alt={company.name}
                fill
                sizes="220px"
                className="object-contain"
              />
            </span>
          ) : (
            <span className="text-2xl" style={{ fontFamily: SERIF, fontWeight: 500 }}>
              {company.name}
            </span>
          )}
        </div>

        {/* hover state: centered text information */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center"
          style={{
            opacity: hover ? 1 : 0,
            transform: hover ? "translateY(0)" : "translateY(10px)",
            transition:
              "opacity 0.45s cubic-bezier(0.16,1,0.3,1) 0.06s, transform 0.55s cubic-bezier(0.16,1,0.3,1) 0.06s",
          }}
        >
          <p className="text-[22px] leading-tight" style={{ fontFamily: SERIF, fontWeight: 500 }}>
            {company.name}
          </p>
          <p className="mt-3 max-w-[30ch] text-[13.5px] leading-[1.6] text-neutral-600">
            {B_COMPANY_NOTES[company.name] ?? company.sector}
          </p>
          <p
            className="mt-5 uppercase"
            style={{
              fontFamily: MONO,
              fontSize: 10,
              letterSpacing: "0.16em",
              color: pal.accent,
            }}
          >
            {company.location} — Founded {company.year}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export function PortfolioB() {
  const [filter, setFilter] = useState<string>("all");
  const companies =
    filter === "all"
      ? PORTFOLIO.companies
      : PORTFOLIO.companies.filter((c) => c.group === filter);

  return (
    <PageShell palette="rose" active="/b/portfolio">
      <PageHero
        chip={B_PORTFOLIO.chip}
        title={B_PORTFOLIO.title}
        lead={B_PORTFOLIO.lead}
        palette="rose"
        pageIndex="02"
        image={asset("/amed/images/hero-vc-01.jpg")}
        word="PORTFOLIO"
        imageAlt="A founder presenting a medical device prototype to investors in a bright boardroom"
      />

      <section className="rx-frame px-6 py-24 md:px-10 md:py-32">
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
                          border: "1px solid rgba(20,19,26,0.12)",
                          background: "#ffffff",
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
        <div className="mt-8 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {companies.map((company, i) => (
            <CompanyCard key={company.name} company={company} index={i} />
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
                <div className="rounded-[1.4rem] border border-black/8 bg-white p-6 text-center">
                  <span
                    className="mx-auto block h-2 w-2 rounded-full"
                    style={{ background: pal.accent }}
                  />
                  <p className="mt-5 text-xl" style={{ fontFamily: SERIF, fontWeight: 500 }}>
                    {name}
                  </p>
                  <p className="mt-2 text-[13px] leading-[1.55] text-neutral-500">
                    {B_PORTFOLIO.realizedNote}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
