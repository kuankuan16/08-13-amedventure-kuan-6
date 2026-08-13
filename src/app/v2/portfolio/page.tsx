import type { Metadata } from "next";
import { RxPortfolioGrid, RxStoryList } from "@/components/amed/rx/sections";
import { RxPageHeader, RxCta } from "@/components/amed/rx/ui";

export const metadata: Metadata = {
  title: "Portfolio — AMED Ventures",
  description:
    "Every company we back represents lives that will be touched — an active portfolio spanning North America and Asia.",
};

export default function PortfolioPage() {
  return (
    <>
      <RxPageHeader
        chip="Portfolio"
        title={["Every company we back", "represents lives that", "will be touched."]}
        lead="An active portfolio spanning North America and Asia — from interventional devices and digital health to diagnostics and manufacturing."
      />
      <RxPortfolioGrid />
      <RxStoryList limit={3} />
      <RxCta />
    </>
  );
}
