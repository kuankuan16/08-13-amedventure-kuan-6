import type { Metadata } from "next";
import Link from "next/link";
import { RX_CONTACT_PAGE, RX_MAILTO, RX_FOOTER } from "@/lib/amed/rx-content";
import { RxPageHeader } from "@/components/amed/rx/ui";

export const metadata: Metadata = {
  title: "Contact — AMED Ventures",
  description:
    "We read everything. If you are early, technical and serious about the clinical bar, we would like to hear from you.",
};

export default function ContactPage() {
  return (
    <>
      <RxPageHeader
        chip={RX_CONTACT_PAGE.chip}
        title={RX_CONTACT_PAGE.title}
        lead={RX_CONTACT_PAGE.body}
      />
      <div className="rx-frame px-6 pb-20 pt-6 md:px-10">
        <a href={RX_MAILTO} className="rx-btn">
          {RX_CONTACT_PAGE.deckLabel}
        </a>

        <div
          className="mt-14 grid gap-px overflow-hidden rounded-2xl sm:grid-cols-3"
          style={{ background: "var(--rx-line)" }}
        >
          <div className="p-8" style={{ background: "var(--rx-grey)" }}>
            <p className="text-xs">{RX_CONTACT_PAGE.emailLabel}</p>
            <a
              href={RX_MAILTO}
              className="u-sweep mt-2 inline-block font-bold"
              style={{ color: "var(--rx-ink)" }}
            >
              {RX_CONTACT_PAGE.email}
            </a>
          </div>
          <div className="p-8" style={{ background: "var(--rx-grey)" }}>
            <p className="text-xs">Taiwan</p>
            <p className="mt-2 text-sm font-bold" style={{ color: "var(--rx-ink)" }}>
              {RX_FOOTER.addressTW}
            </p>
          </div>
          <div className="p-8" style={{ background: "var(--rx-grey)" }}>
            <p className="text-xs">United States</p>
            <p className="mt-2 text-sm font-bold" style={{ color: "var(--rx-ink)" }}>
              {RX_FOOTER.addressUS}
            </p>
          </div>
        </div>

        <p className="mt-10 text-sm">
          Looking for portfolio updates? See our{" "}
          <Link href="/v2/story" className="u-sweep font-bold" style={{ color: "var(--rx-ink)" }}>
            latest milestones
          </Link>
          .
        </p>
      </div>
    </>
  );
}
