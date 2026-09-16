export type Severity = "critical" | "high" | "medium" | "low";

export type Doc = {
  id: string;
  name: string;
  folder: string;
  category: string;
  pages: number;
  status: "analyzed" | "processing" | "queued" | "failed";
  confidence: number;
  flags: number;
  updated: string;
};

export type Finding = {
  id: string;
  title: string;
  severity: Severity;
  category: string;
  doc: string;
  excerpt: string;
  owner: string;
};

export const deal = {
  target: "Northwind Analytics, Inc.",
  code: "Project Vantage",
  sector: "B2B SaaS — Data Infrastructure",
  size: "$185M",
  stage: "Confirmatory diligence",
  lead: "M. Okafor",
  opened: "2026-08-24",
  dueDate: "2026-09-30",
};

export const folders = [
  { name: "01 — Corporate", docs: 214, analyzed: 214, flags: 6 },
  { name: "02 — Financials", docs: 486, analyzed: 470, flags: 19 },
  { name: "03 — Commercial", docs: 612, analyzed: 559, flags: 27 },
  { name: "04 — Legal & Litigation", docs: 158, analyzed: 141, flags: 14 },
  { name: "05 — HR & Benefits", docs: 293, analyzed: 288, flags: 8 },
  { name: "06 — Technology & IP", docs: 341, analyzed: 305, flags: 11 },
  { name: "07 — Tax", docs: 176, analyzed: 176, flags: 5 },
  { name: "08 — Insurance", docs: 88, analyzed: 88, flags: 2 },
];

export const categories = [
  { name: "Customer contracts", count: 431, color: "bg-purple-500" },
  { name: "Financial statements", count: 288, color: "bg-sky-500" },
  { name: "Employment agreements", count: 246, color: "bg-teal-500" },
  { name: "Vendor / MSAs", count: 197, color: "bg-amber-500" },
  { name: "IP assignments", count: 152, color: "bg-rose-500" },
  { name: "Board & corporate", count: 141, color: "bg-indigo-500" },
  { name: "Other / unclassified", count: 913, color: "bg-slate-400" },
];

export const throughput = [
  { day: "Sep 08", docs: 118 },
  { day: "Sep 09", docs: 264 },
  { day: "Sep 10", docs: 341 },
  { day: "Sep 11", docs: 297 },
  { day: "Sep 12", docs: 402 },
  { day: "Sep 13", docs: 156 },
  { day: "Sep 14", docs: 89 },
  { day: "Sep 15", docs: 448 },
  { day: "Sep 16", docs: 253 },
];

export const findings: Finding[] = [
  {
    id: "F-1041",
    title: "Change-of-control consent required — top-5 customer",
    severity: "critical",
    category: "Commercial",
    doc: "03 — Commercial/MSA_Halstead_Group_2024.pdf",
    excerpt:
      "\u201cThis Agreement may not be assigned, including by operation of law or in connection with a change of control, without the prior written consent of Customer.\u201d",
    owner: "Legal — R. Vance",
  },
  {
    id: "F-1038",
    title: "Uncapped indemnity for data breach",
    severity: "critical",
    category: "Legal",
    doc: "04 — Legal & Litigation/DPA_Meridian_Bank.pdf",
    excerpt:
      "\u201cSupplier\u2019s liability arising from a Security Incident shall not be subject to the limitation of liability set forth in Section 11.\u201d",
    owner: "Legal — R. Vance",
  },
  {
    id: "F-1033",
    title: "Revenue concentration: 31% from two customers",
    severity: "high",
    category: "Financial",
    doc: "02 — Financials/ARR_Cohorts_FY25.xlsx",
    excerpt:
      "Halstead Group ($18.4M) and Meridian Bank ($11.2M) represent 31.2% of FY25 recognized revenue.",
    owner: "Finance — J. Liu",
  },
  {
    id: "F-1029",
    title: "Open-source GPL-3.0 in shipped codebase",
    severity: "high",
    category: "Technology & IP",
    doc: "06 — Technology & IP/OSS_Inventory_Q2.csv",
    excerpt:
      "3 components under GPL-3.0 identified in the ingestion service; no commercial exception recorded.",
    owner: "Tech DD — S. Bright",
  },
  {
    id: "F-1024",
    title: "Missing IP assignment for 4 early contractors",
    severity: "high",
    category: "Technology & IP",
    doc: "06 — Technology & IP/Contractor_Register.xlsx",
    excerpt:
      "Contractors engaged 2019\u20132020 have no executed IP assignment on file.",
    owner: "Legal — A. Duarte",
  },
  {
    id: "F-1019",
    title: "Auto-renewal with 12-month notice window",
    severity: "medium",
    category: "Commercial",
    doc: "03 — Commercial/MSA_Corvina_Retail.pdf",
    excerpt:
      "\u201cThe Term shall automatically renew unless either party provides notice at least twelve (12) months prior to expiry.\u201d",
    owner: "Commercial — P. Adeyemi",
  },
  {
    id: "F-1015",
    title: "State nexus not filed in 3 jurisdictions",
    severity: "medium",
    category: "Tax",
    doc: "07 — Tax/Nexus_Study_2025.pdf",
    excerpt:
      "Economic nexus thresholds exceeded in TX, WA, and NJ without corresponding registrations.",
    owner: "Tax — K. Sørensen",
  },
  {
    id: "F-1009",
    title: "Severance multiplier triggered on acquisition (2 execs)",
    severity: "medium",
    category: "HR",
    doc: "05 — HR & Benefits/Exec_Agreements_Bundle.pdf",
    excerpt:
      "Double-trigger severance of 18 months base plus accelerated vesting for CFO and CRO.",
    owner: "HR — L. Marsh",
  },
  {
    id: "F-1002",
    title: "Insurance limits below deal threshold",
    severity: "low",
    category: "Insurance",
    doc: "08 — Insurance/Cyber_Policy_2026.pdf",
    excerpt: "Cyber liability limit of $5M vs. $10M policy standard.",
    owner: "Risk — D. Okonjo",
  },
];

export const docs: Doc[] = [
  { id: "D-8841", name: "MSA_Halstead_Group_2024.pdf", folder: "03 — Commercial", category: "Customer contracts", pages: 64, status: "analyzed", confidence: 0.97, flags: 3, updated: "2 h ago" },
  { id: "D-8836", name: "DPA_Meridian_Bank.pdf", folder: "04 — Legal & Litigation", category: "Customer contracts", pages: 28, status: "analyzed", confidence: 0.95, flags: 2, updated: "2 h ago" },
  { id: "D-8830", name: "ARR_Cohorts_FY25.xlsx", folder: "02 — Financials", category: "Financial statements", pages: 12, status: "analyzed", confidence: 0.91, flags: 1, updated: "3 h ago" },
  { id: "D-8829", name: "Audited_FS_FY23_FY25.pdf", folder: "02 — Financials", category: "Financial statements", pages: 142, status: "analyzed", confidence: 0.98, flags: 0, updated: "4 h ago" },
  { id: "D-8821", name: "OSS_Inventory_Q2.csv", folder: "06 — Technology & IP", category: "IP assignments", pages: 5, status: "analyzed", confidence: 0.88, flags: 3, updated: "5 h ago" },
  { id: "D-8818", name: "Contractor_Register.xlsx", folder: "06 — Technology & IP", category: "Employment agreements", pages: 9, status: "analyzed", confidence: 0.84, flags: 1, updated: "5 h ago" },
  { id: "D-8814", name: "MSA_Corvina_Retail.pdf", folder: "03 — Commercial", category: "Customer contracts", pages: 41, status: "analyzed", confidence: 0.93, flags: 1, updated: "6 h ago" },
  { id: "D-8809", name: "Nexus_Study_2025.pdf", folder: "07 — Tax", category: "Other / unclassified", pages: 33, status: "analyzed", confidence: 0.79, flags: 1, updated: "7 h ago" },
  { id: "D-8804", name: "Exec_Agreements_Bundle.pdf", folder: "05 — HR & Benefits", category: "Employment agreements", pages: 87, status: "analyzed", confidence: 0.9, flags: 2, updated: "8 h ago" },
  { id: "D-8798", name: "Cyber_Policy_2026.pdf", folder: "08 — Insurance", category: "Other / unclassified", pages: 22, status: "analyzed", confidence: 0.86, flags: 1, updated: "9 h ago" },
  { id: "D-8795", name: "Vendor_Bundle_2021_2024.zip", folder: "03 — Commercial", category: "Vendor / MSAs", pages: 613, status: "processing", confidence: 0, flags: 0, updated: "now" },
  { id: "D-8794", name: "Litigation_Docket_Export.pdf", folder: "04 — Legal & Litigation", category: "Other / unclassified", pages: 204, status: "processing", confidence: 0, flags: 0, updated: "now" },
  { id: "D-8791", name: "Board_Minutes_2019_2026.pdf", folder: "01 — Corporate", category: "Board & corporate", pages: 318, status: "queued", confidence: 0, flags: 0, updated: "12 m ago" },
  { id: "D-8788", name: "Scanned_Leases_Archive.tif", folder: "01 — Corporate", category: "Other / unclassified", pages: 96, status: "failed", confidence: 0, flags: 0, updated: "1 h ago" },
  { id: "D-8783", name: "Customer_Churn_Detail.xlsx", folder: "02 — Financials", category: "Financial statements", pages: 18, status: "queued", confidence: 0, flags: 0, updated: "20 m ago" },
];

export type Investor = {
  id: string;
  firm: string;
  type: "Growth equity" | "PE buyout" | "Strategic" | "Family office" | "Sovereign";
  aum: string;
  checkSize: string;
  fitScore: number;
  thesisMatch: number;
  sectorDeals: number;
  stage: "Signed NDA" | "Data room access" | "Diligence" | "Passed" | "Sourced";
  lastTouch: string;
  owner: string;
  signals: string[];
  concern: string;
};

export const investors: Investor[] = [
  {
    id: "I-204",
    firm: "Halvorsen Growth Partners",
    type: "Growth equity",
    aum: "$8.4B",
    checkSize: "$75–200M",
    fitScore: 94,
    thesisMatch: 0.91,
    sectorDeals: 11,
    stage: "Diligence",
    lastTouch: "1 d ago",
    owner: "M. Okafor",
    signals: [
      "3 data-infrastructure deals closed in 18 months",
      "Fund IV has $2.1B undeployed",
      "Publicly stated thesis on usage-based data tooling",
    ],
    concern: "Requires 2 board seats in comparable deals",
  },
  {
    id: "I-198",
    firm: "Kestrel Capital",
    type: "PE buyout",
    aum: "$22.0B",
    checkSize: "$150–500M",
    fitScore: 88,
    thesisMatch: 0.84,
    sectorDeals: 7,
    stage: "Data room access",
    lastTouch: "3 d ago",
    owner: "J. Liu",
    signals: [
      "Owns two adjacent ETL platforms — consolidation logic",
      "Prior CEO of portfolio co. is a warm intro path",
    ],
    concern: "History of 60%+ leverage; may stress covenants",
  },
  {
    id: "I-191",
    firm: "Arclight Strategic (corp dev)",
    type: "Strategic",
    aum: "n/a",
    checkSize: "$100M+",
    fitScore: 82,
    thesisMatch: 0.88,
    sectorDeals: 4,
    stage: "Signed NDA",
    lastTouch: "6 d ago",
    owner: "P. Adeyemi",
    signals: [
      "Product overlap in ingestion — clear synergy narrative",
      "Two tuck-in acquisitions announced this year",
    ],
    concern: "Antitrust review likely to extend timeline by 90+ days",
  },
  {
    id: "I-186",
    firm: "Bridgemoor Partners",
    type: "Growth equity",
    aum: "$3.1B",
    checkSize: "$40–90M",
    fitScore: 71,
    thesisMatch: 0.66,
    sectorDeals: 2,
    stage: "Sourced",
    lastTouch: "2 w ago",
    owner: "S. Bright",
    signals: ["Active in vertical SaaS", "Fast historical close cycles"],
    concern: "Max check below required equity quantum",
  },
  {
    id: "I-180",
    firm: "Nordhaven Family Office",
    type: "Family office",
    aum: "$1.6B",
    checkSize: "$20–60M",
    fitScore: 64,
    thesisMatch: 0.58,
    sectorDeals: 1,
    stage: "Sourced",
    lastTouch: "3 w ago",
    owner: "S. Bright",
    signals: ["Patient capital, no fund life pressure"],
    concern: "Limited software diligence capability in-house",
  },
  {
    id: "I-174",
    firm: "Talos Sovereign Fund",
    type: "Sovereign",
    aum: "$61.0B",
    checkSize: "$200M+",
    fitScore: 59,
    thesisMatch: 0.61,
    sectorDeals: 3,
    stage: "Passed",
    lastTouch: "4 w ago",
    owner: "M. Okafor",
    signals: ["Capacity for full cheque without syndication"],
    concern: "Passed — mandate excludes sub-$250M enterprise value",
  },
];

export const investorFunnel = [
  { stage: "Sourced", count: 148 },
  { stage: "Screened", count: 62 },
  { stage: "Signed NDA", count: 31 },
  { stage: "Data room access", count: 17 },
  { stage: "Diligence", count: 6 },
  { stage: "IOI received", count: 2 },
];

export const investorCriteria = [
  { name: "Sector thesis match", weight: 0.3 },
  { name: "Cheque size vs. equity need", weight: 0.25 },
  { name: "Comparable deal history", weight: 0.2 },
  { name: "Dry powder / capacity", weight: 0.15 },
  { name: "Governance & control terms", weight: 0.1 },
];
