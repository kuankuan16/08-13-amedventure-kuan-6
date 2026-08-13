import type { Metadata } from "next";
import { RxFocusRows } from "@/components/amed/rx/sections";
import { RxPageHeader, RxCta } from "@/components/amed/rx/ui";

export const metadata: Metadata = {
  title: "Investment Focus — AMED Ventures",
  description:
    "From cardiovascular and neurovascular platforms to surgical, vision and connected care, we look for ideas with a clear clinical purpose.",
};

export default function FocusPage() {
  return (
    <>
      <RxPageHeader
        chip="Investment Focus"
        title={["Backing the technologies", "that move care forward."]}
        lead="From cardiovascular and neurovascular platforms to surgical, vision and connected care, we look for ideas with a clear clinical purpose."
      />
      <RxFocusRows withIntro={false} />
      <RxCta />
    </>
  );
}
