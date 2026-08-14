"use client";

import { asset } from "@/lib/amed/content";
import { B_ABOUT } from "@/lib/amed/b-content";
import { RxFocusRows } from "@/components/amed/rx/sections";
import { SERIF, LABEL, Reveal } from "../shared";
import { PageShell, PageHero, MaskedPhoto } from "../PageShell";
import { PrinciplesRow } from "../PrinciplesRow";

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
              <p style={LABEL}>01 — Founding conviction</p>
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

      <PrinciplesRow />

      {/* investment focus — /v2 numbered rows with the hover image panel */}
      <RxFocusRows tone="sky" />

    </PageShell>
  );
}
