/* ── CPQ data types ── */

export interface OnceOffItem {
  id: string;
  name: string;
  fee: number;
  qty: number;
  mandatory: boolean;
  notes: string;
}

export interface Bundle {
  code: string;
  name: string;
  incl: number;
  fee: number;
  oob: number;
  due: "ADV" | "ARR";
  notes: string;
  isPct?: boolean;
}

export interface TPVTier {
  mcf: number;
  from: number;
  to: number;
  rate: number;
}

export interface SLATier {
  id: string;
  name: string;
  retainer: number;
  hours: number;
  oob: number;
  p1: string;
  uptime: string;
  desc: string;
}

export interface ComplianceItem {
  name: string;
  fee: string;
  notes: string;
}

export interface Corridor {
  region: string;
  country: string;
  method: string;
  currency: string;
  cls: "Standard" | "Complex" | "Restricted";
  variable: string;
  fixed: string;
  spread: string;
  retail: string;
  notes: string;
}

export interface ZeamData {
  onceOff: { BA: OnceOffItem[]; INFRA: OnceOffItem[] };
  bundles: {
    payout: Bundle[];
    collections: Bundle[];
    bulk: Bundle[];
    fx: Bundle[];
  };
  tpvTiers: TPVTier[];
  slaTiers: { BA: SLATier[]; INFRA: SLATier[] };
  compliance: ComplianceItem[];
  corridors: Corridor[];
}

/* ── Proposal state ── */

export type ProductLine = "BA" | "INFRA" | "BOTH";
export type ComplianceModel = "A" | "B" | "C";
export type BundleCategory = "payout" | "collections" | "bulk" | "fx";

export interface OnceOffStateItem extends OnceOffItem {
  discount: number;
  _lineLabel: string;
}

export interface ProposalState {
  // Cover
  clientName: string;
  clientContact: string;
  clientLogo: string;
  year: string;
  coverNote: string;
  salesRep: string;

  // Deal
  productLine: ProductLine;
  includeBA: boolean;
  includeINFRA: boolean;
  soReference: string;
  msaReference: string;
  effectiveDate: string;
  quoteValidUntil: string;
  contractDuration: number;
  noticePeriod: number;
  paymentTerms: string;

  // Once-off
  onceOffItems: OnceOffStateItem[];

  // BA bundles
  bundles: Record<BundleCategory, string>;

  // INFRA TPV
  expectedTPV: number;

  // SLA
  includeSLA: boolean;
  slaBA: string;
  slaINFRA: string;

  // Compliance
  complianceModel: ComplianceModel;

  // Corridors
  region: string;

  // Reliance model (JR — unlicensed entities)
  includeReliance: boolean;
  relianceSelfManaged: boolean; // true = client manages own compliance (triggers quarterly cert)

  // Corridor rates website
  corridorUrl: string;
}
