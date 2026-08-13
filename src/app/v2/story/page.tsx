import type { Metadata } from "next";
import { RxStoryList } from "@/components/amed/rx/sections";
import { RxPageHeader, RxCta } from "@/components/amed/rx/ui";

export const metadata: Metadata = {
  title: "Story — AMED Ventures",
  description: "Milestones from the companies we back.",
};

export default function StoryPage() {
  return (
    <>
      <RxPageHeader
        chip="Story"
        title={["Milestones from the", "companies we back."]}
        lead="Financing, clinical, regulatory and commercial progress across the portfolio."
      />
      <RxStoryList showFilters showHeader={false} />
      <RxCta />
    </>
  );
}
