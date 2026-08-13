/** Prefix public assets with the basePath so static exports resolve correctly. */
export const asset = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export const NAV = [
  { label: "Focus", href: "#thesis" },
  { label: "Practice", href: "#practice" },
  { label: "Team", href: "#team" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Philosophy", href: "#approach" },
  { label: "Contact", href: "#contact" },
] as const;

export const CONTACT_MAILTO =
  "mailto:info@amedventures.com?subject=Introduction%20to%20AMED%20Ventures";

export const HERO_SLIDES = [
  {
    eyebrow: "San Francisco Bay Area · Taipei · MedTech Venture & Growth Capital",
    display: ["Bold ideas into", "impact that changes", "how people live,", "heal, and thrive."],
    support:
      "Founded in the San Francisco Bay Area and Taipei, AMED Ventures is a venture and growth capital investment firm dedicated to the MedTech sector.",
  },
  {
    display: ["The right capital,", "paired with the", "right partnership."],
    support:
      "We were built on a simple conviction: that the right capital, paired with the right partnership, can turn a bold idea into lasting impact.",
  },
  {
    display: ["Every company", "we back represents", "lives that will", "be touched."],
    support:
      "From medical devices to medical device contract manufacturing, we transform promising innovation into lasting growth.",
  },
] as const;

export const THESIS = {
  eyebrow: "( Investment Focus ) 01",
  statement: ["Innovation with the", "potential to improve", "patient outcomes."],
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
  steps: [
    {
      index: "01",
      title: "High-conviction investing",
      body: "AMED Ventures invests primarily in medical technology and healthcare companies developing innovative solutions with the potential to improve patient outcomes and healthcare delivery.",
      image: asset("/amed/images/thesis-01-intervention.jpg"),
      alt: "A fine microcatheter coiled on an oak table in soft morning light",
    },
    {
      index: "02",
      title: "Long-term partnership",
      body: "We take a high-conviction, long-term investment approach, partnering closely with founders throughout each company's growth journey.",
      image: asset("/amed/images/thesis-02-founders.jpg"),
      alt: "Hands of an engineer assembling a delicate stent at a sunlit workbench",
    },
    {
      index: "03",
      title: "Beyond capital",
      body: "Strategic guidance, industry expertise, operational support, and access to a global network — from the first cheque through every stage of growth.",
      image: asset("/amed/images/thesis-03-outcome.jpg"),
      alt: "A patient walking out of a bright clinic lobby in morning light",
    },
  ],
} as const;

export const FIRM = {
  eyebrow: "( The Firm ) 02",
  statement: ["From the Bay Area", "and Taipei, we turn", "promising innovation", "into lasting growth."],
  body: [
    "Founded in the San Francisco Bay Area, USA, and Taipei, Taiwan, AMED Ventures is a venture and growth capital investment firm dedicated to the MedTech sector. We were built on a simple conviction: that the right capital, paired with the right partnership, can turn a bold idea into an impact that changes how people live, heal, and thrive.",
    "We take an ecosystem approach to seeking value-added investments in MedTech, from medical devices to medical device contract manufacturing. By facilitating industry partnerships and value chain collaboration, we serve as a trusted partner to our portfolio companies, transforming promising innovation into lasting growth.",
  ],
  highlights: [
    "MedTech & Healthcare-focused venture capital firm",
    "Global investment portfolio across North America and Asia",
    "Active investments from early-stage through growth-stage companies",
    "Long-term investment partner providing strategic support beyond capital",
  ],
  video: asset("/amed/video/firm-studio.mp4"),
  poster: asset("/amed/images/firm-studio.jpg"),
} as const;

export const PRACTICE = {
  eyebrow: "( Practice ) 03",
  title: "Beyond capital.",
  cards: [
    {
      index: "A",
      title: "Venture & growth capital",
      body: "A high-conviction, long-term investment approach — active investments from early-stage through growth-stage companies, across North America and Asia.",
      points: [
        "Early-stage through growth-stage",
        "Global portfolio across North America and Asia",
        "Long-term investment partner",
      ],
      image: asset("/amed/images/practice-a-capital.jpg"),
      alt: "Two partners in quiet conversation at a table by a tall window",
      tone: "light" as const,
    },
    {
      index: "B",
      title: "Strategic & operational support",
      body: "We partner closely with founders by providing strategic guidance, industry expertise, operational support, and access to a global network throughout each company's growth journey.",
      points: [
        "Strategic guidance and industry expertise",
        "Operational support",
        "Access to a global network",
      ],
      image: asset("/amed/images/practice-b-operating.jpg"),
      alt: "A technician assembling a precise device behind glass in warm daylight",
      tone: "tint" as const,
    },
    {
      index: "C",
      title: "An ecosystem approach",
      body: "From medical devices to medical device contract manufacturing — by facilitating industry partnerships and value chain collaboration, we serve as a trusted partner to our portfolio companies.",
      points: [
        "Industry partnerships",
        "Value chain collaboration",
        "A trusted partner to portfolio companies",
      ],
      image: asset("/amed/images/practice-c-network.jpg"),
      alt: "Clinicians and founders in relaxed conversation in a bright gallery space",
      tone: "dark" as const,
    },
  ],
} as const;

export type TeamMember = {
  name: string;
  role: string;
  bio?: string[];
};

export const TEAM = {
  eyebrow: "( Team ) 04",
  title: "The people behind the capital.",
  intro:
    "Our team brings decades of combined experience across investment, business development, and operational management, from large public companies to early-stage startups. We believe that with the right support, today's pioneering idea becomes tomorrow's global impact.",
  leadership: [
    { name: "Michael Wang", role: "Chairman, Managing Partner" },
    { name: "William Tai", role: "Managing Partner" },
    { name: "Joe Liu", role: "Managing Partner" },
  ] satisfies TeamMember[],
  advisors: [
    { name: "Dr. TJ Liu", role: "Venture Advisor" },
    { name: "Dr. Kuan Chen", role: "Venture Advisor" },
    { name: "Fred Shen", role: "Venture Advisor" },
  ] satisfies TeamMember[],
  investment: [
    {
      name: "Michelle Tsai",
      role: "Senior Investment Manager",
      bio: [
        "Michelle Tsai is a Senior Investment Manager at AMED Ventures, evaluating opportunities across interventional technologies and the growing intersection of hardware and AI in healthcare. She focuses on first-in-class innovations with strong clinical differentiation and has contributed to investments that attracted global medtech strategics and sovereign fund participation.",
        "Prior to joining AMED, she spent nearly a decade at Zuellig Pharma, a leading healthcare solutions provider in Asia. There, she grew a client base spanning global MNCs and biotech firms, doubling regional revenue through consistent double-digit annual growth.",
        "She holds an M.S. in Biomedical Engineering from National Taiwan University, a B.S. in Mechanical Engineering from National Chung Hsing University, and a PMP certification — an engineering foundation that complements her commercial acumen in assessing medtech opportunities.",
      ],
    },
    {
      name: "Jeremy Tseng, CFA",
      role: "Senior Investment Manager",
      bio: [
        "At AMED Ventures, Jeremy evaluates investment and M&A opportunities across the medical device and MedTech CDMO sectors, and leads post-investment management for a portfolio of companies with a combined market valuation exceeding $2 billion.",
        "Prior to AMED, he drove M&A evaluation and strategic partnerships at Catcher Technology (TWSE: 2474), supporting the company's initiatives across the MedTech, semiconductor, and aerospace industries. Earlier, at Deloitte Financial Advisory, he advised on cross-border M&A and deal structuring.",
        "Jeremy holds an M.S. in Finance from the University of Illinois Urbana-Champaign and a B.B.A. in Finance from National Chengchi University, and is a CFA Charterholder.",
      ],
    },
    {
      name: "Bin Chou, Ph.D.",
      role: "Investment Manager",
      bio: [
        "Bin is an engineer-turned-investor, focusing on healthcare innovations including AI diagnostics, next-generation testing platforms, medical devices, and frontier biotech.",
        "Before investing, Bin spent over 15 years in diagnostics and medical devices, holding senior R&D and executive roles across POCT, IVD development, manufacturing, and global regulatory approvals including FDA, NMPA, and CE.",
        "He holds a Ph.D. in Mechanical Engineering from National Taiwan University and an M.S. in Molecular Medicine from National Cheng Kung University, combining engineering and life-science expertise in technical diligence.",
      ],
    },
    {
      name: "Jonathan Feng",
      role: "Investment Manager",
      bio: [
        "Jonathan is an Investment Manager at AMED Ventures, evaluating MedTech investments across cardiovascular, orthopedics, urology, nerve repair, and other therapeutic areas. He focuses on clinically differentiated technologies addressing meaningful unmet needs and improving standards of care.",
        "Prior to AMED, Jonathan worked in corporate banking and later founded and scaled a consumer healthcare business, bringing experience across financial analysis, commercialization, and business growth.",
        "He holds an MBA in healthcare from University College London and a B.S. in Biochemical Science and Technology from National Taiwan University.",
      ],
    },
  ] satisfies TeamMember[],
  operations: [
    { name: "Hank Huang", role: "Finance & Portfolio Management Manager" },
    { name: "Michelle Wang", role: "Portfolio Strategy & Operations" },
  ] satisfies TeamMember[],
} as const;

export type PortfolioCompany = {
  name: string;
  logo?: string;
  /** white/reversed marks need a dark chip */
  reversed?: boolean;
  sector: string;
  location: string;
  year: string;
  group: string;
};

export const PORTFOLIO_FILTERS = [
  { key: "all", label: "All" },
  { key: "cardio", label: "Cardiovascular" },
  { key: "neuro", label: "Neuro & Stroke" },
  { key: "surgical", label: "Surgical & Biomaterials" },
  { key: "vision", label: "Vision & Diagnostics" },
  { key: "mfg", label: "Manufacturing" },
] as const;

export const PORTFOLIO = {
  eyebrow: "( Portfolio ) 05",
  statement: ["Every company we", "back represents lives", "that will be touched."],
  title: "The current portfolio.",
  body: "An active portfolio spanning North America and Asia — from interventional devices and digital health to diagnostics and the manufacturing that brings them to the world.",
  companies: [
    {
      name: "Adona Medical",
      logo: asset("/amed/logos/adona-medical.svg"),
      sector: "Heart failure · Structural heart",
      location: "Los Gatos, CA",
      year: "2017",
      group: "cardio",
    },
    {
      name: "Akura Medical",
      logo: asset("/amed/logos/akura-medical.svg"),
      sector: "Vascular · VTE",
      location: "Los Gatos, CA",
      year: "2019",
      group: "cardio",
    },
    {
      name: "Atia Vision",
      logo: asset("/amed/logos/atia-vision.svg"),
      sector: "Ophthalmology",
      location: "Campbell, CA",
      year: "2014",
      group: "vision",
    },
    {
      name: "Benthic Genomics",
      logo: asset("/amed/logos/benthic-genomics.png"),
      sector: "Genomic analysis",
      location: "Mountain View, CA",
      year: "2018",
      group: "vision",
    },
    {
      name: "Dynaflex Technologies",
      logo: asset("/amed/logos/dynaflex-technologies.png"),
      sector: "CDMO",
      location: "California & Taiwan",
      year: "2016",
      group: "mfg",
    },
    {
      name: "Imperative Care",
      logo: asset("/amed/logos/imperative-care.svg"),
      sector: "Neurovascular · Stroke",
      location: "Campbell, CA",
      year: "2016",
      group: "neuro",
    },
    {
      name: "Instylla",
      logo: asset("/amed/logos/instylla.svg"),
      sector: "Embolization · IR",
      location: "Bedford, MA",
      year: "2017",
      group: "surgical",
    },
    {
      name: "Kandu Health",
      logo: asset("/amed/logos/kandu.svg"),
      sector: "Digital health · Stroke recovery",
      location: "Campbell, CA",
      year: "2025",
      group: "neuro",
    },
    {
      name: "KT Medical",
      logo: asset("/amed/logos/kt-medical.png"),
      sector: "Clinical-grade wires · OEM",
      location: "Kaohsiung, Taiwan",
      year: "2017",
      group: "mfg",
    },
    {
      name: "Rejoni",
      logo: asset("/amed/logos/rejoni.png"),
      sector: "Women's health",
      location: "Bedford, MA",
      year: "2020",
      group: "surgical",
    },
    {
      name: "Sealonix",
      logo: asset("/amed/logos/sealonix.png"),
      sector: "Surgical sealants · Biomaterials",
      location: "Bedford, MA",
      year: "2023",
      group: "surgical",
    },
    {
      name: "Supira Medical",
      logo: asset("/amed/logos/supira-medical.svg"),
      sector: "Mechanical circulatory support",
      location: "Los Gatos, CA",
      year: "2017",
      group: "cardio",
    },
    {
      name: "Tioga Cardiovascular",
      logo: asset("/amed/logos/tioga-medical.png"),
      sector: "Structural heart · Valve",
      location: "Campbell, CA",
      year: "2018",
      group: "cardio",
    },
    {
      name: "Tulavi Therapeutics",
      logo: asset("/amed/logos/tulavi-therapeutics.svg"),
      sector: "Peripheral nerve surgery",
      location: "Los Gatos, CA",
      year: "2018",
      group: "surgical",
    },
    {
      name: "Verge Medical",
      logo: asset("/amed/logos/verge-medical.png"),
      sector: "Coronary · Peripheral vascular",
      location: "Campbell, CA",
      year: "2025",
      group: "cardio",
    },
    {
      name: "Wiltrom",
      logo: asset("/amed/logos/wiltrom.png"),
      sector: "Spine implants",
      location: "Zhubei, Taiwan",
      year: "2009",
      group: "surgical",
    },
  ] as PortfolioCompany[],
  exited: ["Neuvera", "Truvic", "Crossfire", "LightningCath"],
} as const;

export const APPROACH = {
  eyebrow: "( Philosophy ) 06",
  title: "How we partner.",
  items: [
    {
      q: "Long-term partnership",
      a: "We partner closely with founders throughout each company's growth journey — a long-term investment partner providing strategic support well beyond capital.",
    },
    {
      q: "High-conviction investing",
      a: "A high-conviction, long-term investment approach: active investments from early-stage through growth-stage companies, across a global portfolio spanning North America and Asia.",
    },
    {
      q: "Supporting exceptional entrepreneurs",
      a: "Founders get strategic guidance, industry expertise, operational support, and access to a global network throughout each company's growth journey.",
    },
    {
      q: "Building companies that create meaningful impact",
      a: "We back innovative solutions with the potential to improve patient outcomes and healthcare delivery. With the right support, today's pioneering idea becomes tomorrow's global impact.",
    },
  ],
  image: asset("/amed/images/approach-sketch.jpg"),
  alt: "A founder sketching a device concept on a glass wall while a partner listens",
} as const;

export const CLOSE = {
  display: ["Today's pioneering", "idea becomes", "tomorrow's", "global impact."],
  location: "AMED Ventures · San Francisco Bay Area, USA · Taipei, Taiwan",
  cta: "Get in touch",
  image: asset("/amed/images/close-clouds.jpg"),
  footer: "© 2026 AMED Ventures. All rights reserved.",
} as const;
