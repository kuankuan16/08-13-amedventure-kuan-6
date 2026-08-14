"use client";

import { asset } from "@/lib/amed/content";
import { RX_FOOTER, RX_MAILTO } from "@/lib/amed/rx-content";
import { B_CONTACT } from "@/lib/amed/b-content";
import { MONO, SERIF, INK, PALETTES, Reveal } from "../shared";
import { PageShell, PageHero, SectionHead } from "../PageShell";

const pal = PALETTES.rose;

const DETAILS = [
  {
    label: B_CONTACT.officesLabel,
    lines: [
      { title: B_CONTACT.offices[0], sub: RX_FOOTER.addressTW },
      { title: B_CONTACT.offices[1], sub: RX_FOOTER.addressUS },
    ],
  },
  {
    label: B_CONTACT.industryLabel,
    lines: [
      { title: B_CONTACT.industry[0], sub: "" },
      { title: B_CONTACT.industry[1], sub: "" },
    ],
  },
];

export function ContactB() {
  return (
    <PageShell palette="rose" active="/b/contact">
      <PageHero
        chip={B_CONTACT.chip}
        title={B_CONTACT.title}
        lead={B_CONTACT.lead}
        palette="rose"
        pageIndex="05"
        image={asset("/amed/images/close-clouds.jpg")}
        word="CONTACT"
        imageAlt="Soft morning clouds over an open horizon"
      />

      <section className="rx-frame px-6 py-24 md:px-10 md:py-32">
        <SectionHead
          index="01"
          label={B_CONTACT.pitchTitle}
          title={["Send us your deck."]}
          palette="rose"
        />

        <Reveal delay={0.16}>
          <a
            href={RX_MAILTO}
            className="group mt-12 inline-flex items-center gap-4 rounded-full border border-black/10 py-2.5 pl-8 pr-2.5 transition-colors hover:border-black/25"
          >
            <span className="text-lg font-medium md:text-xl">{B_CONTACT.email}</span>
            <span
              className="flex h-11 w-11 items-center justify-center rounded-full text-white"
              style={{ background: INK }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="transition-transform duration-300 group-hover:rotate-45"
                aria-hidden
              >
                <path
                  d="M7 17L17 7M17 7H9M17 7v8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </Reveal>

        {/* offices + industry */}
        <div className="mt-20 grid grid-cols-1 gap-3.5 lg:grid-cols-2">
          {DETAILS.map((block, bi) => (
            <Reveal key={block.label} delay={bi * 0.08}>
              <div
                className="flex h-full flex-col rounded-[1.4rem] border p-8 md:p-10"
                style={{ borderColor: "rgba(20,19,26,0.08)", background: "#ffffff" }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="uppercase text-neutral-400"
                    style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.22em" }}
                  >
                    {block.label}
                  </span>
                  <span className="h-2 w-2 rounded-full" style={{ background: pal.accent }} />
                </div>
                <div className="mt-9 space-y-8">
                  {block.lines.map((line) => (
                    <div key={line.title}>
                      <p
                        className="text-2xl md:text-[30px]"
                        style={{ fontFamily: SERIF, fontWeight: 500 }}
                      >
                        {line.title}
                      </p>
                      {line.sub ? (
                        <p className="mt-2.5 max-w-sm text-[14px] leading-[1.65] text-neutral-600">
                          {line.sub}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
