import type { Metadata } from "next";
import { AboutB } from "@/components/amed/gravity/pages/about";

export const metadata: Metadata = {
  title: "About — AMED Ventures · Proposal B",
  description:
    "Breakthroughs matter when patients feel the difference. AMED Ventures invests in the long work between a promising idea and trusted care.",
};

export default function AboutBPage() {
  return <AboutB />;
}
