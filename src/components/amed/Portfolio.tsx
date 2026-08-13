"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { PORTFOLIO, PORTFOLIO_FILTERS } from "@/lib/amed/content";
import { Lines, FadeUp, gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "./motion";

/**
 * Portfolio as exhibition: a unified light gallery (client preference),
 * filterable by sector (client requirement), tiles staggering into view,
 * grayscale-to-color on hover with sector/location/year metadata.
 */
export function Portfolio() {
  const root = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLUListElement | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const entered = useRef(false);

  // initial staggered entrance
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tiles = gsap.utils.toArray<HTMLElement>("[data-portfolio-tile]");
      gsap.set(tiles, { autoAlpha: 0, y: 36 });
      ScrollTrigger.batch(tiles, {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "quint.out",
            stagger: 0.07,
            onComplete: () => {
              entered.current = true;
            },
          }),
      });
    }, root);
    return () => ctx.revert();
  }, []);

  // filter transition: fade the grid, swap visibility, fade back in
  const applyFilter = (key: string) => {
    if (key === filter) return;
    const grid = gridRef.current;
    if (!grid) {
      setFilter(key);
      return;
    }
    gsap.to(grid, {
      autoAlpha: 0,
      y: 14,
      duration: 0.3,
      ease: "quint.out",
      onComplete: () => {
        setFilter(key);
        requestAnimationFrame(() => {
          const visible = grid.querySelectorAll<HTMLElement>("[data-portfolio-tile]");
          gsap.set(visible, { clearProps: "opacity,visibility,transform" });
          gsap.fromTo(
            grid,
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, duration: 0.55, ease: "quint.out" }
          );
          ScrollTrigger.refresh();
        });
      },
    });
  };

  const companies =
    filter === "all"
      ? PORTFOLIO.companies
      : PORTFOLIO.companies.filter((c) => c.group === filter);

  return (
    <section
      id="portfolio"
      ref={root}
      style={{ backgroundColor: "var(--chalk)", color: "var(--ink)" }}
    >
      <div style={{ paddingInline: "var(--pad)", paddingBlock: "clamp(6rem, 14vh, 11rem)" }}>
        <FadeUp>
          <p className="t-eyebrow" style={{ color: "var(--cyan)" }}>
            {PORTFOLIO.eyebrow}
          </p>
        </FadeUp>
        <Lines as="h2" className="t-display-l mt-8 max-w-[64rem]">
          {PORTFOLIO.statement.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </Lines>
        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <FadeUp>
            <p className="t-title">{PORTFOLIO.title}</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="t-body max-w-[28rem]" style={{ color: "var(--ink-60)" }}>
              {PORTFOLIO.body}
            </p>
          </FadeUp>
        </div>

        {/* filters */}
        <FadeUp delay={0.15} className="mt-12">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter portfolio by sector">
            {PORTFOLIO_FILTERS.map((f) => {
              const active = filter === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => applyFilter(f.key)}
                  className="t-small rounded-full border px-5 py-2 font-medium transition-colors duration-300"
                  style={{
                    backgroundColor: active ? "var(--navy-950)" : "transparent",
                    color: active ? "var(--chalk)" : "var(--ink)",
                    borderColor: active ? "var(--navy-950)" : "rgba(7,16,34,0.2)",
                    transitionTimingFunction: "var(--ease-quint)",
                  }}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </FadeUp>

        <ul
          ref={gridRef}
          className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4"
        >
          {companies.map((company) => (
            <li
              key={company.name}
              data-portfolio-tile
              className="group relative flex aspect-[4/3] flex-col items-center justify-center overflow-hidden rounded-2xl border p-6 transition-[box-shadow,transform] duration-500 hover:-translate-y-1"
              style={{
                borderColor: "rgba(7,16,34,0.08)",
                backgroundColor: company.reversed ? "var(--navy-900)" : "var(--ice)",
                transitionTimingFunction: "var(--ease-quint)",
              }}
            >
              <div className="relative flex h-12 w-full items-center justify-center md:h-14">
                {company.logo ? (
                  <Image
                    src={company.logo}
                    alt={company.name}
                    fill
                    sizes="22vw"
                    className="object-contain opacity-75 grayscale transition-[filter,opacity] duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                ) : (
                  <span
                    className="t-title tracking-wide opacity-75 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ color: "var(--indigo)", fontWeight: 600 }}
                  >
                    {company.name.split(" ")[0].toUpperCase()}
                  </span>
                )}
              </div>
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-4 text-center opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                style={{ transitionTimingFunction: "var(--ease-quint)" }}
              >
                <p
                  className="t-small font-medium"
                  style={{ color: company.reversed ? "var(--chalk)" : "var(--ink)" }}
                >
                  {company.name}
                </p>
                <p
                  className="t-small"
                  style={{ color: company.reversed ? "var(--chalk-60)" : "var(--ink-60)" }}
                >
                  {company.sector} · {company.location} · {company.year}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* exited */}
        <FadeUp className="mt-14">
          <div
            className="flex flex-wrap items-baseline gap-x-8 gap-y-2 border-t pt-8"
            style={{ borderColor: "rgba(7,16,34,0.1)" }}
          >
            <p className="t-eyebrow" style={{ color: "var(--ink-60)" }}>
              Exited
            </p>
            {PORTFOLIO.exited.map((name) => (
              <span key={name} className="t-body" style={{ color: "var(--ink-60)" }}>
                {name}
              </span>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
