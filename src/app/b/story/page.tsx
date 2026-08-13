import type { Metadata } from "next";
import { StoryB } from "@/components/amed/gravity/pages/story";

export const metadata: Metadata = {
  title: "Story — AMED Ventures · Proposal B",
  description:
    "Milestones from the companies we back — financing, clinical, regulatory and commercial progress across the AMED Ventures portfolio.",
};

export default function StoryBPage() {
  return <StoryB />;
}
