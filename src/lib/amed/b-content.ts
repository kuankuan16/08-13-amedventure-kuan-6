/**
 * Copy for the /b ("Gravity", Proposal B) pages.
 * Verbatim from the approved source site https://08-06-amedventure-kuan-4.vercel.app/c
 * — /c (home), /c/about, /c/companies, /c/team, /c/contact.
 */

export const B_ABOUT = {
  chip: "Founding conviction",
  title: ["Built for the founders", "building what medicine", "becomes."],
  /** Split at the sentence boundary: the hero support column holds the first
   *  sentence, section 01 carries the rest. Both verbatim from the source. */
  lead: "AMED Ventures is a dedicated MedTech venture firm investing across the United States and Taiwan.",
  leadRest:
    "We pair operating experience with clinical judgment and manufacturing depth, so a device can cross the long distance between first sketch and standard of care.",
  statement: [
    "The right capital and",
    "the right partnership",
    "change how people live,",
    "heal and thrive.",
  ],
  principles: [
    {
      index: "01",
      title: ["Long-term", "partnership"],
      desc: "We stay with founders for the long run, from first clinical evidence through global scale.",
    },
    {
      index: "02",
      title: ["High-conviction", "investing"],
      desc: "Fewer, deeper positions in medical technology where the clinical case and team convince us.",
    },
    {
      index: "03",
      title: ["Exceptional", "entrepreneurs"],
      desc: "Strategic guidance, deep industry expertise and hands-on support for the teams building it.",
    },
    {
      index: "04",
      title: ["Meaningful", "impact"],
      desc: "What we build is finally measured in outcomes for the patients on the other end of it.",
    },
  ],
  focusTitle: ["Backing the technologies", "that move care forward."],
  focusBody: [
    "From cardiovascular and neurovascular platforms to surgical, vision and connected care, we look for ideas with a clear clinical purpose.",
    "Across Asia and the United States, we support teams turning technical insight into solutions that can earn trust in real care settings.",
  ],
  teamTitle: ["Decades of building,", "investing and operating."],
  teamBody:
    "Our partners and advisors span device engineering, clinical practice and global manufacturing — operators across the whole MedTech value chain.",
  teamCta: "Meet the team",
} as const;

export const B_PORTFOLIO = {
  chip: "Selected investments",
  title: ["Every company we back represents", "lives that will be touched."],
  lead: "AMED Ventures invests in medical technology and healthcare companies across cardiovascular, neurovascular, surgical, vision, diagnostics and manufacturing.",
  leadRest:
    "Backing teams in Taiwan and the United States developing solutions with the potential to improve patient outcomes and healthcare delivery.",
  realizedLabel: "Realized",
  realizedNote: "A realized AMED Ventures investment.",
} as const;

/** Company descriptions, verbatim from /c/companies. Keyed by company name. */
export const B_COMPANY_NOTES: Record<string, string> = {
  Kandu:
    "Stroke-recovery platform combining the IpsiHand brain-computer interface with AI-supported remote care.",
  "Kandu Health":
    "Stroke-recovery platform combining the IpsiHand brain-computer interface with AI-supported remote care.",
  "Verge Medical":
    "Physician-founded developer of coronary and peripheral vascular technologies, including the commercial-stage FLASH system for aorto-ostial intervention.",
  Sealonix:
    "Bioresorbable sealant and hemostatic biomaterials improving tissue closure and surgical healing.",
  Rejoni:
    "The Juveena Hydrogel System, a bioresorbable hydrogel preventing intrauterine adhesions after gynecologic procedures.",
  "Akura Medical":
    "Catheter-based technologies treating peripheral arterial disease through minimally invasive vascular intervention.",
  "Benthic Genomics":
    "Genomic analysis platform turning complex regions such as HLA and KIR into high-confidence calls from microarray and sequencing data.",
  "Tioga Cardiovascular":
    "Transseptal, low-profile transcatheter valve replacement for mitral and tricuspid disease.",
  "Tulavi Therapeutics":
    "The allay Hydrogel Cap, an in-situ forming hydrogel protecting transected peripheral nerves and reducing symptomatic neuroma.",
  "Adona Medical":
    "Clinical-stage heart-failure company: adjustable interatrial shunting with integrated bi-atrial remote pressure monitoring.",
  Instylla:
    "Next-generation liquid embolics — the Embrace Hydrogel Embolic System — for interventional oncology and peripheral hemostasis.",
  "KT Medical":
    "Clinical-grade metallic wires and specialized devices, supplying guide wires, wire forms and OEM components worldwide.",
  "Supira Medical":
    "A next-generation 10F percutaneous ventricular assist device for high-risk PCI and cardiogenic shock.",
  "Dynaflex Technologies":
    "Full-service partner specializing in catheter design, polymer innovation and smart manufacturing equipment.",
  "Imperative Care":
    "End-to-end stroke and vascular platform across the continuum of neurovascular disease, including the Telos endovascular robotics platform.",
  "Atia Vision":
    "OmniVu, a modular accommodating intraocular lens restoring dynamic range of vision after cataract surgery.",
  Wiltrom:
    "Minimally invasive spine implants spanning fixation, interbody fusion, bone-graft substitutes, vertebral augmentation and bone cement.",
};

export const B_STORY = {
  chip: "Story",
  title: ["Milestones from the", "companies we back."],
  lead: "Financing, clinical, regulatory and commercial milestones from across the portfolio — the record of progress behind each investment.",
  tableHeads: ["Story", "Milestone", "Company"],
} as const;

export const B_TEAM = {
  chip: "Investment & operating team",
  title: ["Decades of building,", "investing and operating."],
  lead: "Our team brings decades of combined experience across investment, business development, and operational management, from large public companies to early-stage startups.",
  groups: {
    leadership: "Managing Partners",
    advisors: "Venture Advisors",
    investment: "Investment Team",
    operations: "Portfolio Strategy & Operations",
  },
} as const;

export const B_CONTACT = {
  chip: "Contact",
  title: ["Tell us what", "you are building."],
  lead: "We read everything. If you are early, technical and serious about the clinical bar, we would like to hear from you.",
  officesLabel: "Offices",
  offices: ["Taipei, Taiwan", "San Francisco, USA"],
  industryLabel: "Industry",
  industry: ["MedTech venture capital", "Healthcare innovation"],
  emailLabel: "Email",
  email: "info@amedventures.com",
  pitchTitle: "Pitch your company",
} as const;
