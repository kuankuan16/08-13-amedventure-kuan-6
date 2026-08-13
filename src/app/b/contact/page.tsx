import type { Metadata } from "next";
import { ContactB } from "@/components/amed/gravity/pages/contact";

export const metadata: Metadata = {
  title: "Contact — AMED Ventures · Proposal B",
  description:
    "Building something that belongs in a hospital? We read everything — send us your deck at info@amedventures.com.",
};

export default function ContactBPage() {
  return <ContactB />;
}
