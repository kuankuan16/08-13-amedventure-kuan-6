"use client";

import { type FormEvent, type ReactNode, useState } from "react";
import { asset, PORTFOLIO_FILTERS } from "@/lib/amed/content";
import { B_CONTACT } from "@/lib/amed/b-content";
import {
  BODY_TEXT,
  CARD_TITLE,
  FIELD_LABEL,
  LABEL,
  PillActionButton,
  Reveal,
  SUPPORTING_TEXT,
} from "../shared";
import { PageShell, PageHero } from "../PageShell";

const FIELD =
  "mt-3 w-full border-b border-black/20 bg-transparent pb-3 text-[17px] leading-[1.5] text-[#121619] outline-none transition-colors duration-300 placeholder:text-neutral-400 focus:border-black";

function Field({
  label,
  children,
  wide = false,
}: {
  label: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <label className={wide ? "md:col-span-2" : undefined}>
      <span className="block" style={FIELD_LABEL}>
        {label}
      </span>
      {children}
    </label>
  );
}

export function ContactB() {
  const [sent, setSent] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <PageShell palette="rose" active="/b/contact">
      <PageHero
        chip={B_CONTACT.chip}
        title={B_CONTACT.title}
        lead={B_CONTACT.lead}
        palette="rose"
        image={asset("/amed/images/contact-hero-backlit-mauve.png")}
        imageClassName="object-[82%_center] md:object-center"
        word="CONTACT"
        imageAlt="An East Asian venture investor receiving a focused MedTech founder pitch in soft mauve backlight"
      />

      <section id="contact-form" className="rx-frame px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-16 border-t border-black/15 pt-10 lg:grid-cols-[minmax(17rem,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
          <Reveal>
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p style={LABEL}>{B_CONTACT.emailLabel}</p>
              <a
                href={`mailto:${B_CONTACT.email}`}
                className="mt-4 inline-block text-[1.65rem] leading-tight tracking-[-0.025em] underline decoration-black/25 underline-offset-8 transition-colors hover:text-neutral-600 md:text-[2rem]"
                style={CARD_TITLE}
              >
                {B_CONTACT.email}
              </a>

              <dl className="mt-14 space-y-10">
                <div className="border-t border-black/15 pt-5">
                  <dt style={FIELD_LABEL}>
                    {B_CONTACT.officesLabel}
                  </dt>
                  <dd className="mt-4 space-y-1" style={BODY_TEXT}>
                    {B_CONTACT.offices.map((office) => (
                      <span key={office} className="block">
                        {office}
                      </span>
                    ))}
                  </dd>
                </div>

                <div className="border-t border-black/15 pt-5">
                  <dt style={FIELD_LABEL}>
                    {B_CONTACT.industryLabel}
                  </dt>
                  <dd className="mt-4 space-y-1" style={BODY_TEXT}>
                    {B_CONTACT.industry.map((item) => (
                      <span key={item} className="block">
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </aside>
          </Reveal>

          <Reveal delay={0.12}>
            <form className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2" onSubmit={submit}>
              <Field label={B_CONTACT.fields.name}>
                <input className={FIELD} name="name" autoComplete="name" required />
              </Field>
              <Field label={B_CONTACT.fields.company}>
                <input className={FIELD} name="company" autoComplete="organization" required />
              </Field>
              <Field label={B_CONTACT.fields.email}>
                <input className={FIELD} name="email" type="email" autoComplete="email" required />
              </Field>
              <Field label={B_CONTACT.fields.phone}>
                <span className="mt-3 grid grid-cols-[6.5rem_1fr] gap-3">
                  <select
                    className={`${FIELD} mt-0`}
                    name="countryCode"
                    defaultValue="+886"
                    aria-label="Country calling code"
                  >
                    {B_CONTACT.countryCodes.map((code) => (
                      <option key={code}>{code}</option>
                    ))}
                  </select>
                  <input
                    className={`${FIELD} mt-0`}
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    required
                  />
                </span>
              </Field>
              <Field label={B_CONTACT.fields.website}>
                <input
                  className={FIELD}
                  name="link"
                  type="url"
                  inputMode="url"
                  placeholder="https://"
                />
              </Field>
              <Field label={B_CONTACT.fields.headquarters}>
                <input
                  className={FIELD}
                  name="location"
                  autoComplete="address-level2"
                  placeholder="City, country"
                />
              </Field>
              <Field label={B_CONTACT.fields.focus}>
                <select className={FIELD} name="focus" defaultValue="">
                  <option value="" disabled>
                    Select one
                  </option>
                  {PORTFOLIO_FILTERS.filter((item) => item.key !== "all").map((item) => (
                    <option key={item.key}>{item.label}</option>
                  ))}
                  <option>Other</option>
                </select>
              </Field>
              <Field label={B_CONTACT.fields.stage}>
                <select className={FIELD} name="stage" defaultValue="">
                  <option value="" disabled>
                    Select one
                  </option>
                  {B_CONTACT.fundingStages.map((stage) => (
                    <option key={stage}>{stage}</option>
                  ))}
                </select>
              </Field>
              <Field label={B_CONTACT.fields.message} wide>
                <textarea className={`${FIELD} min-h-32 resize-y`} name="message" rows={4} required />
              </Field>

              <div className="flex flex-col items-start gap-5 md:col-span-2 md:flex-row md:items-center">
                <PillActionButton type="submit" label={B_CONTACT.sendLabel} />
                {sent ? (
                  <p className="max-w-md" style={SUPPORTING_TEXT} role="status">
                    {B_CONTACT.success}
                  </p>
                ) : null}
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
