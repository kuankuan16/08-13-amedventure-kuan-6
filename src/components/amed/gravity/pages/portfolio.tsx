"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { asset, PORTFOLIO, type PortfolioCompany } from "@/lib/amed/content";
import { B_PORTFOLIO, B_COMPANY_NOTES } from "@/lib/amed/b-content";
import { SERIF, INK, LABEL, META, PALETTES, Reveal } from "../shared";
import { PageShell, PageHero, SectionHead } from "../PageShell";

const pal = PALETTES.rose;
const GROUND = "#f4f4f5";
const HOVER = "#c5d7f1";

/**
 * Optical size normalization: each mark gets an explicit height and
 * aspect ratio so wordmarks and lockups read as the same visual weight
 * rather than at their raw file proportions. Measured per logo.
 */
const LOGO_SIZE: Record<string, { h: number; r: number }> = {
  "Adona Medical": { h: 30, r: 2.53 },
  "Akura Medical": { h: 27, r: 3.53 },
  "Atia Vision": { h: 28, r: 3.27 },
  "Benthic Genomics": { h: 54, r: 0.6 },
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

/** Marks with a baked coloured plate — shown as a wordmark instead. */
const PLATED = new Set(["Dynaflex Technologies"]);

/* ---------------- filter model (mirrors the source portfolio) ------- */

const FOCUS = [
  { key: "all", label: "All focus areas" },
  { key: "cardio", label: "Cardiovascular" },
  { key: "neuro", label: "Neuro & stroke" },
  { key: "surgical", label: "Surgical & biomaterials" },
  { key: "vision", label: "Vision & diagnostics" },
  { key: "mfg", label: "Manufacturing" },
];
const REGIONS = [
  { key: "all", label: "All regions" },
  { key: "us", label: "United States" },
  { key: "tw", label: "Taiwan" },
];
const STATUS = [
  { key: "all", label: "All companies" },
  { key: "active", label: "Active" },
  { key: "realized", label: "Realized" },
];
const SORTS = [
  { key: "recent", label: "Recent" },
  { key: "oldest", label: "Oldest" },
  { key: "az", label: "A–Z" },
];

const regionOf = (c: PortfolioCompany) => (/taiwan/i.test(c.location) ? "tw" : "us");

function Dropdown({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { key: string; label: string }[];
  value: string;
  onChange: (k: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const current = options.find((o) => o.key === value) ?? options[0];
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => window.setTimeout(() => setOpen(false), 140)}
        className="flex items-center gap-3 rounded-full bg-white px-5 py-2.5 text-[13px] font-medium"
        style={{ border: "1px solid rgba(20,19,26,0.12)", color: INK }}
      >
        <span style={{ ...META, color: "#8a8a93" }}>{label}</span>
        <span>{current.label}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open ? (
        <div
          className="absolute left-0 top-[calc(100%+8px)] z-20 min-w-[13rem] overflow-hidden rounded-2xl bg-white py-1.5"
          style={{
            border: "1px solid rgba(20,19,26,0.1)",
            boxShadow: "0 18px 40px -22px rgba(20,19,26,0.4)",
          }}
        >
          {options.map((o) => (
            <button
              key={o.key}
              type="button"
              onMouseDown={() => {
                onChange(o.key);
                setOpen(false);
              }}
              className="block w-full px-5 py-2.5 text-left text-[13.5px] transition-colors hover:bg-black/5"
              style={{
                color: o.key === value ? INK : "#52525b",
                fontWeight: o.key === value ? 600 : 400,
              }}
            >
              {o.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function CompanyCard({
  company,
  index,
  realized = false,
}: {
  company: PortfolioCompany;
  index: number;
  realized?: boolean;
}) {
  const [hover, setHover] = useState(false);
  const size = LOGO_SIZE[company.name] ?? { h: 28, r: 3.2 };
  const w = Math.min(Math.round(size.h * size.r), 190);

  const body = (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: HOVER,
          opacity: hover ? 1 : 0,
          transition: "opacity 0.45s cubic-bezier(0.16,1,0.3,1)",
        }}
      />

      {/* resting: the mark alone */}
      <div
        className="absolute inset-0 flex items-center justify-center p-8"
        style={{
          opacity: hover ? 0 : 1,
          transform: hover ? "scale(0.96)" : "scale(1)",
          transition:
            "opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {company.logo && !PLATED.has(company.name) ? (
          <span className="relative block" style={{ height: size.h, width: w }}>
            <Image
              src={company.logo}
              alt={company.name}
              fill
              sizes="220px"
              className="object-contain"
              style={{ mixBlendMode: "multiply" }}
            />
          </span>
        ) : (
          <span className="text-2xl" style={{ fontFamily: SERIF, fontWeight: 500 }}>
            {company.name.replace(" Technologies", "")}
          </span>
        )}
      </div>

      {/* hover: the detail */}
      <div
        className="absolute inset-0 flex flex-col p-7 md:p-8"
        style={{
          opacity: hover ? 1 : 0,
          transform: hover ? "translateY(0)" : "translateY(10px)",
          transition:
            "opacity 0.4s cubic-bezier(0.16,1,0.3,1) 0.05s, transform 0.55s cubic-bezier(0.16,1,0.3,1) 0.05s",
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <p className="text-[1.3rem] leading-tight" style={{ fontFamily: SERIF, fontWeight: 500 }}>
            {company.name}
          </p>
          {company.url ? (
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
              style={{ background: INK, color: "#fff" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M7 17L17 7M17 7H9M17 7v8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          ) : null}
        </div>
        <p className="mt-3 text-[13.5px] leading-[1.55] text-neutral-700">
          {B_COMPANY_NOTES[company.name] ?? company.sector}
        </p>
        <p className="mt-auto pt-5" style={{ ...META, color: "rgba(20,19,26,0.6)" }}>
          {realized ? "Realized" : `${company.location} — ${company.year}`}
        </p>
      </div>
    </>
  );

  const shell = {
    className: "group relative block aspect-[4/3] overflow-hidden rounded-[1.4rem] outline-none",
    style: {
      border: "1px solid rgba(20,19,26,0.08)",
      background: "#ffffff",
      transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
      transform: hover ? "translateY(-3px)" : "none",
    } as React.CSSProperties,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onFocus: () => setHover(true),
    onBlur: () => setHover(false),
    tabIndex: 0,
  };

  return (
    <Reveal delay={Math.min(index, 5) * 0.05}>
      {company.url ? (
        <a href={company.url} target="_blank" rel="noreferrer" {...shell}>
          {body}
        </a>
      ) : (
        <div {...shell}>{body}</div>
      )}
    </Reveal>
  );
}

export function PortfolioB() {
  const [focus, setFocus] = useState("all");
  const [region, setRegion] = useState("all");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("recent");

  const companies = useMemo(() => {
    let list = [...PORTFOLIO.companies];
    if (focus !== "all") list = list.filter((c) => c.group === focus);
    if (region !== "all") list = list.filter((c) => regionOf(c) === region);
    if (sort === "recent") list.sort((a, b) => Number(b.year) - Number(a.year));
    if (sort === "oldest") list.sort((a, b) => Number(a.year) - Number(b.year));
    if (sort === "az") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [focus, region, sort]);

  const showActive = status !== "realized";
  const showRealized = status !== "active" && focus === "all" && region === "all";

  return (
    <PageShell palette="rose" active="/b/portfolio">
      <PageHero
        chip={B_PORTFOLIO.chip}
        title={B_PORTFOLIO.title}
        lead={B_PORTFOLIO.lead}
        palette="rose"
        image={asset("/amed/images/page-portfolio.jpg")}
        word="PORTFOLIO"
        imageAlt="A founding team examining a device prototype at a workbench"
      />

      <div style={{ background: GROUND }}>
        <section className="rx-frame px-6 py-24 md:px-10 md:py-32">
          <SectionHead
            index="01"
            label="Active portfolio"
            title={["The companies", "we back today."]}
            lead={B_PORTFOLIO.leadRest}
            palette="rose"
          />

          {/* filters */}
          <Reveal delay={0.12} className="relative z-30">
            <div className="mt-12 flex flex-wrap items-center gap-3">
              <Dropdown label="Focus area" options={FOCUS} value={focus} onChange={setFocus} />
              <Dropdown label="Region" options={REGIONS} value={region} onChange={setRegion} />
              <Dropdown label="Status" options={STATUS} value={status} onChange={setStatus} />
              <Dropdown label="Sort" options={SORTS} value={sort} onChange={setSort} />
              <span className="ml-auto" style={{ ...META, color: "#8a8a93" }}>
                {String(showActive ? companies.length : 0).padStart(2, "0")} companies
              </span>
            </div>
          </Reveal>

          {/* grid */}
          {showActive ? (
            <div className="mt-8 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {companies.map((company, i) => (
                <CompanyCard key={company.name} company={company} index={i} />
              ))}
            </div>
          ) : null}

          {/* realized */}
          {showRealized ? (
            <div className="mt-20">
              <Reveal>
                <p style={LABEL}>{B_PORTFOLIO.realizedLabel}</p>
              </Reveal>
              <div className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
                {[...PORTFOLIO.exited].sort().map((name, i) => (
                  <CompanyCard
                    key={name}
                    index={i}
                    realized
                    company={{
                      name,
                      sector: B_PORTFOLIO.realizedNote,
                      location: "",
                      year: "",
                      group: "",
                    }}
                  />
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-16 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full" style={{ background: pal.accent }} />
            <span style={{ ...META, color: "#8a8a93" }}>Cards link to each company&apos;s site</span>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
