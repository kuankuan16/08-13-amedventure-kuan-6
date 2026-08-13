"use client";

import { RX_CONTACT_PAGE, RX_CTA, RX_FOOTER, RX_MAILTO } from "@/lib/amed/rx-content";
import { MONO, SERIF, INK, PALETTES, Reveal, Glass } from "../shared";
import { PageShell, PageHero } from "../PageShell";

const pal = PALETTES.rose;

export function ContactB() {
  return (
    <PageShell palette="rose" active="/b/contact" count={30}>
      <PageHero
        chip={`06 — ${RX_CONTACT_PAGE.chip}`}
        title={RX_CONTACT_PAGE.title}
        lead={RX_CONTACT_PAGE.body}
        palette="rose"
        center
      />

      <section className="px-6 pb-32 text-center md:px-12 md:pb-44">
        <Reveal delay={0.1}>
          <a
            href={RX_MAILTO}
            className="group inline-flex items-center gap-4 rounded-full py-2.5 pl-8 pr-2.5"
            style={{
              background: "rgba(255,255,255,0.45)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.75)",
              boxShadow: "0 14px 40px -12px rgba(20,40,80,0.16)",
            }}
          >
            <span className="text-lg font-medium md:text-xl">{RX_CONTACT_PAGE.email}</span>
            <span
              className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-transform group-hover:scale-105"
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
        <Reveal delay={0.2}>
          <p
            className="mt-5 uppercase text-neutral-400"
            style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.22em" }}
          >
            {RX_CONTACT_PAGE.deckLabel}
          </p>
        </Reveal>

        {/* offices */}
        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-3.5 text-left sm:grid-cols-2">
          {[
            { city: RX_CTA.offices[0], address: RX_FOOTER.addressTW },
            { city: RX_CTA.offices[1], address: RX_FOOTER.addressUS },
          ].map((office, i) => (
            <Reveal key={office.city} delay={0.15 + i * 0.08}>
              <Glass hover innerClassName="flex h-full flex-col p-7">
                <div className="flex items-center justify-between">
                  <span
                    className="uppercase text-neutral-400"
                    style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.22em" }}
                  >
                    {RX_CONTACT_PAGE.officesLabel} 0{i + 1}
                  </span>
                  <span className="h-2 w-2 rounded-full" style={{ background: pal.accent }} />
                </div>
                <p className="mt-5 text-2xl" style={{ fontFamily: SERIF, fontWeight: 500 }}>
                  {office.city}
                </p>
                <p className="mt-2 text-[14px] leading-[1.6] text-neutral-600">{office.address}</p>
              </Glass>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
