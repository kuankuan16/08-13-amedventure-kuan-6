import type { Metadata } from "next";
import { RxGlance, RxProcess, RxPhilosophy } from "@/components/amed/rx/sections";
import { RxPageHeader, RxCta } from "@/components/amed/rx/ui";

export const metadata: Metadata = {
  title: "About — AMED Ventures",
  description:
    "We invest in the long work between a promising idea and trusted care — where evidence, execution and endurance turn possibility into practice.",
};

export default function AboutPage() {
  return (
    <>
      <RxPageHeader
        chip="About AMED"
        title={["A standard worth", "building toward."]}
        lead="We invest in the long work between a promising idea and trusted care."
      />
      <RxGlance />
      <RxProcess />
      <RxPhilosophy />
      <RxCta />
    </>
  );
}
