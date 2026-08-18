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
  image: asset("/amed/images/about-vc-operating-partnership-warm-user.png"),
  imageAlt: "An East Asian venture partner and a medical-device founder reviewing a cardiovascular prototype in warm sunlight",
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
      image: asset("/amed/images/focus-neurovascular-bluewhite.png"),
    },
    {
      index: "02",
      title: "Cardiovascular Technologies",
      desc: "Structural heart, circulatory support and vascular intervention",
      detail:
        "Structural heart, circulatory support and vascular intervention — innovative solutions with the potential to improve patient outcomes and healthcare delivery.",
      image: asset("/amed/images/focus-cardiovascular-bluewhite.png"),
    },
    {
      index: "03",
      title: "Surgical Technologies",
      desc: "Biomaterials, implants and devices for the operating room",
      detail:
        "Biomaterials, implants and devices for the operating room — the long work between a promising idea and trusted care, where evidence, execution and endurance turn possibility into practice.",
      image: asset("/amed/images/focus-surgical-bluewhite.png"),
    },
    {
      index: "04",
      title: "Digital Health",
      desc: "Software and connected care that extends treatment beyond the hospital",
      detail:
        "Software and connected care that extends treatment beyond the hospital — supporting patients and clinicians across Asia and the United States.",
      image: asset("/amed/images/focus-digital-health-bluewhite.png"),
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
  /** the published article this milestone points at */
  url?: string;
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
      url: "https://www.businesswire.com/news/home/20260616503636/en/Rejoni-Inc.-Secures-%2425-Million-in-Financing-to-Accelerate-the-Juveena-Hydrogel-System-Toward-FDA-Approval-and-Launch",
    },
    {
      title:
        "OrthoIndy, Indiana Hand to Shoulder Center First in Indiana to Use New Technology During Combined Amputation and Peripheral Nerve Procedure",
      source: "blog.orthoindy.com",
      tag: "Commercial",
      company: "Tulavi Therapeutics",
      date: "15 Jun 2026",
      url: "https://blog.orthoindy.com/2026/06/15/orthoindy-indiana-hand-to-shoulder-center-first-in-indiana-to-use-new-technology-during-combined-amputation-and-peripheral-nerve-procedure/",
    },
    {
      title:
        "Benthic Genomics Adds Mako to the Benthic Analysis Platform for High-Resolution Immune-Region Analysis From Short-Read Sequencing Data",
      source: "benthic.bio",
      tag: "Commercial",
      company: "Benthic Genomics",
      date: "15 Apr 2026",
      url: "https://www.benthic.bio/post/benthic-genomics-adds-mako-to-the-benthic-analysis-platform-for-high-resolution-immune-region-analys",
    },
    {
      title: "Supira Gets FDA Green Light to Conduct Ventricular Assist Device Study",
      source: "massdevice.com",
      tag: "Regulatory",
      company: "Supira Medical",
      date: "8 Apr 2026",
      url: "https://www.massdevice.com/supira-fda-nod-ventricular-assist-study/",
    },
    {
      title: "Imperative Care initiates CLEAR-IT clinical study",
      source: "vascularnews.com",
      tag: "Clinical",
      company: "Imperative Care",
      date: "26 Mar 2026",
      url: "https://vascularnews.com/imperative-care-initiates-clear-it-clinical-study/",
    },
    {
      title:
        "Randomized Controlled Trial Demonstrated Positive Outcomes for FDA-Cleared Brain-Computer Interface IpsiHand® System in Chronic Stroke Rehabilitation",
      source: "prnewswire.com",
      tag: "Clinical",
      company: "Kandu",
      date: "12 Feb 2026",
      url: "https://www.prnewswire.com/news-releases/randomized-controlled-trial-demonstrated-positive-outcomes-for-fda-cleared-brain-computer-interface-ipsihand-system-in-chronic-stroke-rehabilitation-302685764.html",
    },
    {
      title:
        "Instylla Initiates Commercial Launch with First Use of the Embrace™ Hydrogel Embolic System",
      source: "prnewswire.com",
      tag: "Commercial",
      company: "Instylla",
      date: "28 Jan 2026",
      url: "https://www.prnewswire.com/news-releases/instylla-initiates-commercial-launch-with-first-use-of-the-embrace-hydrogel-embolic-system-302671903.html",
    },
    {
      title:
        "FDA Files Rejoni's Juveena Hydrogel System PMA for the Prevention of Intrauterine Adhesions",
      source: "businesswire.com",
      tag: "Regulatory",
      company: "Rejoni",
      date: "13 Jan 2026",
      url: "https://www.businesswire.com/news/home/20260113722822/en/FDA-Files-Rejonis-Juveena-Hydrogel-System-PMA-for-the-Prevention-of-Intrauterine-Adhesions",
    },
    {
      title:
        "Tulavi Therapeutics Receives Innovative Technology Contract from Vizient for the allay™ Hydrogel Cap",
      source: "prnewswire.com",
      tag: "Commercial",
      company: "Tulavi Therapeutics",
      date: "13 Jan 2026",
      url: "https://www.prnewswire.com/news-releases/tulavi-therapeutics-receives-innovative-technology-contract-from-vizient-for-the-allay-hydrogel-cap-302659243.html",
    },
    {
      title:
        "Benthic Genomics Launches Angler Imputation Platform, Making High-Resolution Immunogenomics Accessible to All Researchers",
      source: "benthic.bio",
      tag: "Commercial",
      company: "Benthic Genomics",
      date: "10 Sept 2025",
      url: "https://www.benthic.bio/post/anglerlaunch",
    },
    {
      title: "Adona Medical Completes Enrollment in First-in-Human Interatrial Shunt Trial",
      source: "massdevice.com",
      tag: "Clinical",
      company: "Adona Medical",
      date: "17 Jun 2025",
      url: "https://www.massdevice.com/adona-completes-enrollment-interatrial-shunt-trial/",
    },
    {
      title:
        "FDA Grants Atia Vision Approval to Begin US Clinical Trial of OmniVu Lens System in Patients with Cataracts",
      source: "businesswire.com",
      tag: "Regulatory",
      company: "Atia Vision",
      date: "20 May 2025",
      url: "https://www.businesswire.com/news/home/20250520015920/en/FDA-Grants-Atia-Vision-Approval-to-Begin-US-Clinical-Trial-of-OmniVu-Lens-System-in-Patients-with-Cataracts",
    },
    {
      title: "Kandu Health, Neurolutions Merge Into BCI Company Targeting Stroke Care",
      source: "massdevice.com",
      tag: "Commercial",
      company: "Kandu",
      date: "8 Apr 2025",
      url: "https://www.massdevice.com/kandu-health-neurolutions-merge-bci-stroke/",
    },
    {
      title: "Ostial Corp. Rebrands as Verge Medical, Acquires New Technology",
      source: "dicardiology.com",
      tag: "Commercial",
      company: "Verge Medical",
      date: "18 Mar 2025",
      url: "https://www.dicardiology.com/content/ostial-corp-rebrands-verge-medical-acquires-new-technology",
    },
    {
      title:
        "Instylla Completes Submission of Premarket Approval Application for Embrace™ Hydrogel Embolic System",
      source: "prnewswire.com",
      tag: "Regulatory",
      company: "Instylla",
      date: "11 Mar 2025",
      url: "https://www.prnewswire.com/news-releases/instylla-completes-submission-of-premarket-approval-application-for-embrace-hydrogel-embolic-system-302397602.html",
    },
    {
      title:
        "Rejoni Completes Patient Enrollment in Pivotal Clinical Study of the Juveena Hydrogel System",
      source: "businesswire.com",
      tag: "Clinical",
      company: "Rejoni",
      date: "4 Feb 2025",
      url: "https://www.businesswire.com/news/home/20250204916499/en/Rejoni-completes-patient-enrollment-in-pivotal-clinical-study-of-a-Novel-Treatment-for-the-Prevention-of-Intrauterine-Adhesions-the-Juveena-Hydrogel-System",
    },
    {
      title: "Tioga Cardiovascular Completes First-in-Human Mitral Valve Replacement Cases",
      source: "massdevice.com",
      tag: "Clinical",
      company: "Tioga Cardiovascular",
      date: "23 Oct 2024",
      url: "https://www.massdevice.com/shifameds-tioga-cardiovascular-has-first-human-cases-with-mitral-valve-replacement/",
    },
    {
      title:
        "Adona Medical, a Shifamed Portfolio Company, Raises $33.5 Million in Series C Financing",
      source: "prnewswire.com",
      tag: "Financing",
      company: "Adona Medical",
      date: "10 Jul 2024",
      url: "https://www.prnewswire.com/news-releases/adona-medical-a-shifamed-portfolio-company-raises-33-5-million-in-series-c-financing-302192673.html",
    },
    {
      title: "Akura Medical Secures $35M to Pursue FDA Clearance for Thrombectomy Device",
      source: "medtechdive.com",
      tag: "Financing",
      company: "Akura Medical",
      date: "4 Oct 2023",
      url: "https://www.medtechdive.com/news/akura-medical-35m-510k-thrombectomy/695609/",
    },
    {
      title:
        "Sealonix, Inc. Closes $20 Million Financing to Develop Sealant Products for Abdominopelvic and Orthopedic Procedures",
      source: "prnewswire.com",
      tag: "Financing",
      company: "Sealonix",
      date: "12 May 2023",
      url: "https://www.prnewswire.com/news-releases/sealonix-inc-closes-20-million-financing-to-develop-sealant-products-for-abdominopelvic-and-orthopedic-procedures-301822963.html",
    },
    {
      title: "康聚醫學科技 全臺唯一醫療級金屬線材廠",
      source: "news.gbimonthly.com",
      tag: "Commercial",
      company: "KT Medical",
      date: "30 Sept 2022",
      url: "https://news.gbimonthly.com/tw/magazine/article_show.php?num=53410",
    },
    {
      title: "康聚醫學科技進軍心導管醫材",
      source: "ctee.com.tw",
      tag: "Commercial",
      company: "KT Medical",
      date: "9 Nov 2021",
      url: "https://www.ctee.com.tw/news/20211110701337-439901",
    },
    {
      title:
        "Adjustable Interatrial Shunt for Heart Failure Shows Promise in First-in-Human Trial",
      source: "cardiovascularbusiness.com",
      tag: "Clinical",
      company: "Adona Medical",
      date: "",
      url: "https://cardiovascularbusiness.com/topics/clinical/heart-failure/adjustable-interatrial-shunt-heart-failure-shows-promise-first-human-trial",
    },
    {
      title: "Akura Begins Pivotal Trial of Katana Thrombectomy System in Pulmonary Embolism",
      source: "evtoday.com",
      tag: "Clinical",
      company: "Akura Medical",
      date: "",
      url: "https://evtoday.com/news/akura-begins-pivotal-trial-of-katana-thrombectomy-system-in-pulmonary-embolism",
    },
    {
      title: "Akura Raises Financing for Thrombectomy System and Quantification Software",
      source: "evtoday.com",
      tag: "Financing",
      company: "Akura Medical",
      date: "",
      url: "https://evtoday.com/news/akura-raises-financing-for-thrombectomy-system-and-quantification-software-1",
    },
    {
      title: "Imperative Care Launches Ikon 24",
      source: "finance.yahoo.com",
      tag: "Commercial",
      company: "Imperative Care",
      date: "",
      url: "https://finance.yahoo.com/healthcare/articles/imperative-care-launches-ikon-24-201500656.html",
    },
    {
      title: "Imperative Care Nets $100M Financing",
      source: "fiercebiotech.com",
      tag: "Financing",
      company: "Imperative Care",
      date: "",
      url: "https://www.fiercebiotech.com/medtech/stroke-tech-developer-imperative-care-nets-100m-financing",
    },
    {
      title:
        "Novo Holdings co-leads $120 million Series E Financing of Supira Medical to Advance Percutaneous Ventricular Assist Device Technology",
      source: "novoholdings.dk",
      tag: "Financing",
      company: "Supira Medical",
      date: "",
      url: "https://novoholdings.dk/news/novo-holdings-co-leads-120-million-series-e-financing-of-supira-medical-to-advance-percutaneous-ventricular-assist-device-technology",
    },
    {
      title: "EuroPCR 2026 Presentation",
      source: "europcr2026.europa-inviteo.com",
      tag: "Clinical",
      company: "Tioga Cardiovascular",
      date: "",
      url: "https://europcr2026.europa-inviteo.com/gws/index.php?langue=en&onglet=33&paramProjet=102151",
    },
    {
      title: "FDA Clears Surgical Hydrogel Nerve Cap for Preventing Phantom Limb Pain",
      source: "fiercebiotech.com",
      tag: "Regulatory",
      company: "Tulavi Therapeutics",
      date: "",
      url: "https://www.fiercebiotech.com/medtech/fda-clears-surgical-hydrogel-nerve-cap-preventing-phantom-limb-pain-amputees",
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
