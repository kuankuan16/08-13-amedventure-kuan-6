import { asset } from "./content";

/**
 * Content for the /v2 (ritovex-style) variant.
 * All copy verbatim from the approved kuan-4 "/c" direction.
 */

export const RX_NAV = [
  { label: "About", href: "/v2/about" },
  { label: "Portfolio", href: "/v2/portfolio" },
  { label: "Story", href: "/v2/story" },
  { label: "Team", href: "/v2/team" },
  { label: "Contact", href: "/v2/contact" },
] as const;

export const RX_MAILTO =
  "mailto:info@amedventures.com?subject=Our%20deck%20for%20AMED%20Ventures";

export const RX_HERO = {
  chip: "MedTech Venture Capital · Taipei & San Francisco",
  title: ["Capital that reaches", "the bedside."],
  support:
    "We back the medical technologies that change what a clinician can actually do — on an ordinary Tuesday morning, in a real hospital.",
  ctaPrimary: "Send us your deck",
  ctaSecondary: "Watch our story",
  image: asset("/amed/images/hero-stage.jpg"),
  imageAlt: "A physician and a young engineer in warm conversation in a bright atrium",
  ticker: ["01 Healthcare", "02 Therapeutics", "03 Applied AI", "04 Partnership"],
  slides: [
    {
      image: asset("/amed/images/hero-vc-01.jpg"),
      alt: "A founder presenting a medical device prototype to investors in a bright boardroom",
      cardTitle: "Partnering from the first cheque",
      cardDesc: "High-conviction, from early-stage through growth.",
    },
    {
      image: asset("/amed/images/hero-vc-02.jpg"),
      alt: "An investor and a young founder shaking hands in a bright studio office",
      cardTitle: "Beyond capital",
      cardDesc: "A long-term partner throughout each company's growth journey.",
    },
    {
      image: asset("/amed/images/hero-vc-03.jpg"),
      alt: "Investors and founders reviewing growth charts in a sunlit conference room",
      cardTitle: "Evidence, execution, endurance",
      cardDesc: "Turning possibility into practice.",
    },
  ],
} as const;

export const RX_ABOUT = {
  chip: "A standard worth building toward",
  title: ["Breakthroughs matter", "when patients feel", "the difference."],
  body: "We invest in the long work between a promising idea and trusted care — where evidence, execution and endurance turn possibility into practice.",
  image: asset("/amed/images/firm-studio.jpg"),
  imageAlt: "A team around an oak table examining a device prototype",
  /** Qualitative firm highlights (client PDF) — numbers deliberately not emphasized. */
  highlights: [
    {
      title: "MedTech-focused",
      desc: "A MedTech & Healthcare-focused venture capital firm.",
    },
    {
      title: "Global portfolio",
      desc: "A global investment portfolio across North America and Asia.",
    },
    {
      title: "Early through growth",
      desc: "Active investments from early-stage through growth-stage companies.",
    },
    {
      title: "Beyond capital",
      desc: "A long-term investment partner providing strategic support beyond capital.",
    },
  ],
  cta: "More about AMED",
  email: "info@amedventures.com",
} as const;

export const RX_FOCUS = {
  chip: "AMED Ventures",
  title: ["Backing the technologies", "that move care forward."],
  body: [
    "From cardiovascular and neurovascular platforms to surgical, vision and connected care, we look for ideas with a clear clinical purpose.",
    "Across Asia and the United States, we support teams turning technical insight into solutions that can earn trust in real care settings.",
  ],
  intro:
    "From cardiovascular and neurovascular platforms to surgical, vision and connected care — we look for ideas with a clear clinical purpose.",
  rows: [
    {
      index: "01",
      title: "Neurovascular Technologies",
      desc: "Stroke and neurovascular platforms across the continuum of care",
      detail:
        "Stroke and neurovascular platforms across the continuum of care — from intervention to recovery. We back teams turning technical insight into solutions that can earn trust in real care settings.",
      image: asset("/amed/images/thesis-01-intervention.jpg"),
    },
    {
      index: "02",
      title: "Cardiovascular Technologies",
      desc: "Structural heart, circulatory support and vascular intervention",
      detail:
        "Structural heart, circulatory support and vascular intervention — innovative solutions with the potential to improve patient outcomes and healthcare delivery.",
      image: asset("/amed/images/thesis-02-founders.jpg"),
    },
    {
      index: "03",
      title: "Surgical Technologies",
      desc: "Biomaterials, implants and devices for the operating room",
      detail:
        "Biomaterials, implants and devices for the operating room — the long work between a promising idea and trusted care, where evidence, execution and endurance turn possibility into practice.",
      image: asset("/amed/images/practice-b-operating.jpg"),
    },
    {
      index: "04",
      title: "Digital Health",
      desc: "Software and connected care that extends treatment beyond the hospital",
      detail:
        "Software and connected care that extends treatment beyond the hospital — supporting patients and clinicians across Asia and the United States.",
      image: asset("/amed/images/thesis-03-outcome.jpg"),
    },
  ],
  areasLabel: "Areas may include",
  areas: [
    "Medical Devices",
    "Digital Health",
    "Cardiovascular Technologies",
    "Neurovascular Technologies",
    "Vision Care",
    "Diagnostics",
    "Surgical Technologies",
    "Healthcare Platforms",
  ],
} as const;

export type RxMilestone = {
  title: string;
  source: string;
  tag: "Financing" | "Clinical" | "Regulatory" | "Commercial";
  company: string;
  date: string;
};

export const RX_STORY = {
  chip: "Story",
  title: ["Milestones from the", "companies we back."],
  filters: ["All", "Financing", "Clinical", "Regulatory", "Commercial"],
  milestones: [
    {
      title:
        "Rejoni Secures $25 Million to Accelerate the Juveena Hydrogel System Toward FDA Approval and Launch",
      source: "businesswire.com",
      tag: "Financing",
      company: "Rejoni",
      date: "16 Jun 2026",
    },
    {
      title:
        "OrthoIndy, Indiana Hand to Shoulder Center First in Indiana to Use New Technology During Combined Amputation and Peripheral Nerve Procedure",
      source: "blog.orthoindy.com",
      tag: "Commercial",
      company: "Tulavi Therapeutics",
      date: "15 Jun 2026",
    },
    {
      title:
        "Benthic Genomics Adds Mako to the Benthic Analysis Platform for High-Resolution Immune-Region Analysis From Short-Read Sequencing Data",
      source: "benthic.bio",
      tag: "Commercial",
      company: "Benthic Genomics",
      date: "15 Apr 2026",
    },
    {
      title: "Supira Gets FDA Green Light to Conduct Ventricular Assist Device Study",
      source: "massdevice.com",
      tag: "Regulatory",
      company: "Supira Medical",
      date: "8 Apr 2026",
    },
    {
      title: "Imperative Care initiates CLEAR-IT clinical study",
      source: "vascularnews.com",
      tag: "Clinical",
      company: "Imperative Care",
      date: "26 Mar 2026",
    },
    {
      title:
        "Randomized Controlled Trial Demonstrated Positive Outcomes for FDA-Cleared Brain-Computer Interface IpsiHand® System in Chronic Stroke Rehabilitation",
      source: "prnewswire.com",
      tag: "Clinical",
      company: "Kandu",
      date: "12 Feb 2026",
    },
    {
      title:
        "Instylla Initiates Commercial Launch with First Use of the Embrace™ Hydrogel Embolic System",
      source: "prnewswire.com",
      tag: "Commercial",
      company: "Instylla",
      date: "28 Jan 2026",
    },
    {
      title:
        "FDA Files Rejoni's Juveena Hydrogel System PMA for the Prevention of Intrauterine Adhesions",
      source: "businesswire.com",
      tag: "Regulatory",
      company: "Rejoni",
      date: "13 Jan 2026",
    },
    {
      title:
        "Tulavi Therapeutics Receives Innovative Technology Contract from Vizient for the allay™ Hydrogel Cap",
      source: "prnewswire.com",
      tag: "Commercial",
      company: "Tulavi Therapeutics",
      date: "13 Jan 2026",
    },
    {
      title:
        "Benthic Genomics Launches Angler Imputation Platform, Making High-Resolution Immunogenomics Accessible to All Researchers",
      source: "benthic.bio",
      tag: "Commercial",
      company: "Benthic Genomics",
      date: "10 Sept 2025",
    },
  ] satisfies RxMilestone[],
} as const;

export const RX_PROCESS = {
  chip: "How we partner",
  title: ["Where possibility", "turns into practice."],
  cta: "Send us your deck",
  steps: [
    {
      index: "01",
      title: "Evidence",
      desc: "Ideas with a clear clinical purpose — technologies that change what a clinician can actually do.",
    },
    {
      index: "02",
      title: "Execution",
      desc: "The long work between a promising idea and trusted care, supported across Asia and the United States.",
    },
    {
      index: "03",
      title: "Endurance",
      desc: "Solutions that earn trust in real care settings — until patients feel the difference.",
    },
  ],
} as const;

export const RX_CTA = {
  chip: "Pitch us",
  title: ["Building something that", "belongs in a hospital?"],
  body: "We read everything. If you are early, technical and serious about the clinical bar, we would like to hear from you.",
  cta: "Send us your deck",
  email: "info@amedventures.com",
  offices: ["Taipei, Taiwan", "San Francisco, USA"],
} as const;

/** Investment philosophy — verbatim pillars from the client PDF. */
export const RX_PHILOSOPHY = {
  chip: "Investment Philosophy",
  title: ["What we believe in."],
  items: [
    {
      index: "01",
      title: "Long-term partnership",
      desc: "We partner closely with founders throughout each company's growth journey — strategic support well beyond capital.",
    },
    {
      index: "02",
      title: "High-conviction investing",
      desc: "Active investments from early-stage through growth-stage companies, across North America and Asia.",
    },
    {
      index: "03",
      title: "Supporting exceptional entrepreneurs",
      desc: "Strategic guidance, industry expertise, operational support, and access to a global network.",
    },
    {
      index: "04",
      title: "Building companies that create meaningful impact",
      desc: "With the right support, today's pioneering idea becomes tomorrow's global impact.",
    },
  ],
} as const;

/** Firm highlights — verbatim from the client PDF. */
export const RX_HIGHLIGHTS = [
  "MedTech & Healthcare-focused venture capital firm",
  "Global investment portfolio across North America and Asia",
  "Active investments from early-stage through growth-stage companies",
  "Long-term investment partner providing strategic support beyond capital",
] as const;

export const RX_CONTACT_PAGE = {
  chip: "Contact",
  title: ["Building something that", "belongs in a hospital?"],
  body: "We read everything. If you are early, technical and serious about the clinical bar, we would like to hear from you.",
  deckLabel: "Send us your deck",
  emailLabel: "Email",
  email: "info@amedventures.com",
  officesLabel: "Offices",
} as const;

export const RX_FOOTER = {
  addressTW: "3F.-1, No. 3, Dunhua S. Rd., Songshan Dist., Taipei City 105, Taiwan (R.O.C.)",
  addressUS: "San Francisco, USA",
  tagline: "Healthcare venture capital",
  copyright: "© 2026 AMED Ventures",
} as const;
