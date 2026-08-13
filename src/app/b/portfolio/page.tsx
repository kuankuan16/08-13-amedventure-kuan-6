import type { Metadata } from "next";
import { PortfolioB } from "@/components/amed/gravity/pages/portfolio";

export const metadata: Metadata = {
  title: "Portfolio — AMED Ventures · Proposal B",
  description:
    "Every company we back represents lives that will be touched. An active MedTech portfolio spanning North America and Asia.",
};

export default function PortfolioBPage() {
  return <PortfolioB />;
}
