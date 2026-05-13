import type { ZeamData } from "../types";

export const ZEAM_DATA: ZeamData = {
  onceOff: {
    BA: [
      { id: "po_int", name: "Platform Onboarding & Integration Setup", fee: 5000, qty: 1, mandatory: true, notes: "Standard integration; API credential provisioning, sandbox, go-live checklist" },
      { id: "po_complex", name: "Complex / Enterprise Integration (per 10h block)", fee: 3500, qty: 0, mandatory: false, notes: "Additional hours at senior engineer rate; scoped separately" },
      { id: "kyb_auto", name: "KYB — Business Entity Onboarding (per entity)", fee: 50, qty: 1, mandatory: true, notes: "Automated registry + AML check; manual uplift quoted separately" },
      { id: "kyb_man", name: "KYB — Manual Review Uplift (per entity)", fee: 100, qty: 0, mandatory: false, notes: "High-risk / complex ownership structures; EDD-required entities" },
      { id: "iban", name: "IBAN Provisioning Setup (per entity)", fee: 25, qty: 1, mandatory: false, notes: "One-off provisioning of virtual IBAN infrastructure" },
      { id: "sandbox", name: "Sandbox Environment Setup", fee: 500, qty: 1, mandatory: false, notes: "Dedicated sandbox; waived on Scale plan and above" },
      { id: "cert", name: "Compliance Certification (for API / Infra access)", fee: 2500, qty: 0, mandatory: false, notes: "Required before go-live on Infrastructure plan; annual renewal" },
    ],
    INFRA: [
      { id: "po_int", name: "Platform Integration & Onboarding Fee", fee: 5000, qty: 1, mandatory: true, notes: "API credential provisioning, webhook setup, go-live certification" },
      { id: "kyb_edd", name: "KYB — Enhanced Due Diligence", fee: 5000, qty: 1, mandatory: true, notes: "One-time setup for onboarding" },
      { id: "cert", name: "Compliance Certification & Partner Review", fee: 2500, qty: 1, mandatory: true, notes: "Required pre-go-live; covers Model A/B determination + corridor audit" },
      { id: "sandbox", name: "Dedicated Sandbox Environment", fee: 500, qty: 1, mandatory: false, notes: "Isolated sandbox tenancy; included in Growth and Enterprise plans" },
      { id: "po_complex", name: "Complex / Enterprise Integration (per 10h block)", fee: 3500, qty: 0, mandatory: false, notes: "Additional scoped hours at senior engineer rate; SOW attached" },
      { id: "recert", name: "Annual Compliance Re-Certification", fee: 2500, qty: 0, mandatory: false, notes: "Required for Model B (partner-managed) partners; annual cadence" },
    ],
  },

  bundles: {
    payout: [
      { code: "PAY-PAYG", name: "Payout PAYG", incl: 0, fee: 0, oob: 0.65, due: "ARR", notes: "No monthly minimum; pure per-transaction at OOB rate" },
      { code: "PAY-500", name: "Payout 500", incl: 500, fee: 895, oob: 0.55, due: "ADV", notes: "Approx $1.79/txn blended" },
      { code: "PAY-1K", name: "Payout 1K", incl: 1000, fee: 1500, oob: 0.48, due: "ADV", notes: "Approx $1.50/txn blended" },
      { code: "PAY-5K", name: "Payout 5K", incl: 5000, fee: 5500, oob: 0.38, due: "ADV", notes: "Approx $1.10/txn blended" },
      { code: "PAY-10K", name: "Payout 10K", incl: 10000, fee: 9000, oob: 0.32, due: "ADV", notes: "Approx $0.90/txn blended" },
      { code: "PAY-50K", name: "Payout 50K", incl: 50000, fee: 32500, oob: 0.24, due: "ADV", notes: "Approx $0.65/txn blended" },
      { code: "PAY-100K", name: "Payout 100K", incl: 100000, fee: 55000, oob: 0.20, due: "ADV", notes: "Approx $0.55/txn blended" },
      { code: "PAY-250K", name: "Payout 250K", incl: 250000, fee: 112500, oob: 0.17, due: "ADV", notes: "Enterprise; 12-mo commit" },
      { code: "PAY-500K", name: "Payout 500K", incl: 500000, fee: 187500, oob: 0.14, due: "ADV", notes: "Custom contract" },
      { code: "PAY-1M", name: "Payout 1M", incl: 1000000, fee: 300000, oob: 0.12, due: "ADV", notes: "Enterprise only" },
    ],
    collections: [
      { code: "COL-PAYG", name: "Collections PAYG", incl: 0, fee: 0, oob: 0.80, due: "ARR", notes: "No monthly minimum" },
      { code: "COL-500", name: "Collections 500", incl: 500, fee: 1050, oob: 0.65, due: "ADV", notes: "Approx $2.10/txn blended" },
      { code: "COL-5K", name: "Collections 5K", incl: 5000, fee: 6500, oob: 0.48, due: "ADV", notes: "Approx $1.30/txn blended" },
      { code: "COL-50K", name: "Collections 50K", incl: 50000, fee: 42500, oob: 0.32, due: "ADV", notes: "Enterprise tier" },
    ],
    bulk: [
      { code: "BULK-PAYG", name: "Bulk Payout PAYG", incl: 0, fee: 250, oob: 0.35, due: "ADV", notes: "Platform fee $250/mo; items at OOB" },
      { code: "BULK-5K", name: "Bulk 5K items", incl: 5000, fee: 1750, oob: 0.25, due: "ADV", notes: "Approx $0.35/item blended" },
      { code: "BULK-50K", name: "Bulk 50K items", incl: 50000, fee: 9500, oob: 0.18, due: "ADV", notes: "High-volume payroll" },
      { code: "BULK-250K", name: "Bulk 250K items", incl: 250000, fee: 32500, oob: 0.12, due: "ADV", notes: "Enterprise / payroll" },
    ],
    fx: [
      { code: "FX-PAYG", name: "FX PAYG", incl: 0, fee: 0, oob: 0.0075, due: "ARR", notes: "0.75% of notional", isPct: true },
      { code: "FX-500K", name: "FX $500K/mo", incl: 500000, fee: 3250, oob: 0.0060, due: "ADV", notes: "0.65% blended", isPct: true },
      { code: "FX-2M", name: "FX $2M/mo", incl: 2000000, fee: 9000, oob: 0.0050, due: "ADV", notes: "0.45% blended", isPct: true },
      { code: "FX-10M", name: "FX $10M/mo", incl: 10000000, fee: 37500, oob: 0.0040, due: "ADV", notes: "Enterprise", isPct: true },
    ],
  },

  tpvTiers: [
    { mcf: 3000, from: 0, to: 200000, rate: 0.015 },
    { mcf: 5000, from: 200001, to: 1000000, rate: 0.0125 },
    { mcf: 15000, from: 1000001, to: 5000000, rate: 0.01 },
    { mcf: 50000, from: 5000001, to: 25000000, rate: 0.0075 },
    { mcf: 125000, from: 25000001, to: 100000000, rate: 0.005 },
    { mcf: 180000, from: 100000001, to: Infinity, rate: 0.0035 },
  ],

  slaTiers: {
    BA: [
      { id: "std", name: "Standard", retainer: 750, hours: 0, oob: 110, p1: "4 business hours", uptime: "99.0%", desc: "Business hours support (08h00–17h00 Mon–Fri). Shared support pool. Ticket + email only." },
      { id: "pri", name: "Priority", retainer: 2500, hours: 10, oob: 130, p1: "1 hour (any time)", uptime: "99.5%", desc: "Extended support (07h00–22h00, 7 days). Named contact. Quarterly service review." },
      { id: "mc", name: "Mission-Critical", retainer: 8500, hours: 20, oob: 150, p1: "15 min (any time)", uptime: "99.9%", desc: "24/7/365 coverage. Dedicated TAM. Monthly ops review. Contractual credit model." },
    ],
    INFRA: [
      { id: "std", name: "Standard", retainer: 750, hours: 0, oob: 110, p1: "24 business hours", uptime: "99.0%", desc: "Business hours support (08h00–17h00 Mon–Fri). Shared support pool. Ticket + email only." },
      { id: "pri", name: "Priority", retainer: 4500, hours: 20, oob: 130, p1: "1 hour", uptime: "99.5%", desc: "Extended support (07h00–22h00, 7 days). Named contact. Quarterly service review." },
      { id: "mc", name: "Mission-Critical", retainer: 17500, hours: 20, oob: 150, p1: "15 min (any time)", uptime: "99.9%", desc: "24/7/365 coverage. Dedicated TAM. Monthly ops review. Contractual credit model." },
    ],
  },

  compliance: [
    { name: "KYB — Business Entity (automated)", fee: "$50/entity", notes: "One-off per entity; registry + AML check" },
    { name: "KYB — Manual Review Uplift", fee: "$100/entity", notes: "High-risk entities; EDD threshold triggered" },
    { name: "KYC — Individual (automated IDV)", fee: "$8/person", notes: "Per individual; liveness + document check" },
    { name: "Sanctions Screening", fee: "$0.50/screen", notes: "Per transaction; bundled above 1,000/mo on Priority+" },
    { name: "Ongoing Monitoring", fee: "$8/entity/mo", notes: "Continuous transaction monitoring" },
    { name: "EDD — Enhanced Due Diligence", fee: "$350/case", notes: "Analyst-led; min 2-hr charge" },
    { name: "Manual Review (compliance analyst)", fee: "$110/hr", notes: "Min 1-hr charge per case" },
    { name: "Exception / Investigation Handling", fee: "$200/case", notes: "Includes escalation, evidence, filing support" },
  ],

  corridors: [
    { region: "Africa", country: "South Africa", method: "EFT (Pay-in & Pay-out)", currency: "ZAR", cls: "Standard", variable: "2.00%", fixed: "$0", spread: "0.25%", retail: "~3.25%", notes: "Real-time pay-in; T+1 pay-out" },
    { region: "Africa", country: "Kenya", method: "Bank Transfer", currency: "KES", cls: "Standard", variable: "1.30%", fixed: "$0", spread: "0.50%", retail: "~2.55%", notes: "T+1–T+3 settlement" },
    { region: "Africa", country: "Kenya", method: "Mobile Money (M-Pesa / Airtel)", currency: "KES", cls: "Standard", variable: "1.80%", fixed: "$0", spread: "0.50%", retail: "~3.05%", notes: "Real-time; $1.80 flat + 0.5% spread" },
    { region: "Africa", country: "Ghana", method: "Bank Transfer", currency: "GHS", cls: "Standard", variable: "1.50%", fixed: "$0", spread: "0.50%", retail: "~2.75%", notes: "T+1" },
    { region: "Africa", country: "Ghana", method: "Mobile Money (MTN/Airtel/Vodafone)", currency: "GHS", cls: "Standard", variable: "1.50%", fixed: "$0", spread: "0.50%", retail: "~2.75%", notes: "Real-time. Limits: GHS 25,000/txn" },
    { region: "Africa", country: "Nigeria", method: "Bank Transfer", currency: "NGN", cls: "Standard", variable: "0.50%", fixed: "$0", spread: "1.50%", retail: "~2.75%", notes: "Instant (NIP). Daily limits apply" },
    { region: "Africa", country: "Tanzania", method: "Bank Transfer", currency: "TZS", cls: "Standard", variable: "1.30%", fixed: "$0", spread: "0.50%", retail: "~2.55%", notes: "T+2. Min TZS 1,000" },
    { region: "Africa", country: "Tanzania", method: "Mobile Money (Airtel / M-Pesa)", currency: "TZS", cls: "Standard", variable: "1.80%", fixed: "$0", spread: "0.50%", retail: "~3.05%", notes: "Real-time" },
    { region: "Africa", country: "Uganda", method: "Bank Transfer", currency: "UGX", cls: "Complex", variable: "1.30%", fixed: "$0", spread: "0.50%", retail: "~3.30%", notes: "T+3. FX constraints" },
    { region: "Africa", country: "Uganda", method: "Mobile Money (Airtel / MTN)", currency: "UGX", cls: "Standard", variable: "1.80%", fixed: "$0", spread: "0.50%", retail: "~3.05%", notes: "Real-time. Max UGX 5,000,000" },
    { region: "Africa", country: "Zambia", method: "Mobile Money (MTN / Airtel / Zamtel)", currency: "ZMW", cls: "Standard", variable: "2.00%", fixed: "$0", spread: "0.50%", retail: "~3.25%", notes: "Real-time. Max ZMW 20,000" },
    { region: "Africa", country: "Malawi", method: "Bank Transfer", currency: "MWK", cls: "Complex", variable: "1.00%", fixed: "$0", spread: "0.50%", retail: "~3.05%", notes: "T+1. Min MWK 750" },
    { region: "Africa", country: "Malawi", method: "Mobile Money (Airtel)", currency: "MWK", cls: "Complex", variable: "2.00%", fixed: "$0", spread: "0.50%", retail: "~4.05%", notes: "Real-time. Max MWK 750,000" },
    { region: "Africa", country: "Mozambique", method: "Mobile Money (M-Pesa MZ)", currency: "MZN", cls: "Complex", variable: "2.20%", fixed: "$0", spread: "0.50%", retail: "~4.20%", notes: "Max MZN 25,000" },
    { region: "Africa", country: "Zimbabwe", method: "Mobile Money (Ecocash USD)", currency: "USD", cls: "Restricted", variable: "2.90%", fixed: "$0", spread: "0%", retail: "~5.40%", notes: "QUOTE ONLY. FX constrained" },
    { region: "Africa", country: "Benin", method: "Mobile Money", currency: "XOF", cls: "Standard", variable: "2.50%", fixed: "$0", spread: "1.00%", retail: "~4.25%", notes: "XOF zone" },
    { region: "Africa", country: "Côte d\u2019Ivoire", method: "Mobile Money", currency: "XOF", cls: "Standard", variable: "2.00%", fixed: "$0", spread: "1.00%", retail: "~3.75%", notes: "" },
    { region: "Africa", country: "Cameroon", method: "Mobile Money", currency: "XAF", cls: "Standard", variable: "1.75%", fixed: "$0", spread: "1.00%", retail: "~3.50%", notes: "" },
    { region: "Africa", country: "Senegal", method: "Mobile Money", currency: "XOF", cls: "Standard", variable: "1.50%", fixed: "$0", spread: "1.00%", retail: "~3.25%", notes: "" },
    { region: "Africa", country: "Rwanda", method: "Bank Transfer", currency: "RWF", cls: "Standard", variable: "1.00%", fixed: "$0", spread: "0.50%", retail: "~2.25%", notes: "Min 1 RWF" },
    { region: "LATAM", country: "Brazil", method: "Bank Transfer (PIX)", currency: "BRL", cls: "Standard", variable: "1.30%", fixed: "$1.50", spread: "1.30%", retail: "~3.35% + $1.50", notes: "Instant settlement" },
    { region: "LATAM", country: "Mexico", method: "Bank Transfer (SPEI)", currency: "MXN", cls: "Standard", variable: "1.00%", fixed: "$1.50", spread: "1.00%", retail: "~3.00% + $1.50", notes: "Instant settlement" },
    { region: "LATAM", country: "Colombia", method: "Bank Transfer", currency: "COP", cls: "Standard", variable: "1.30%", fixed: "$1.50", spread: "1.80%", retail: "~3.85% + $1.50", notes: "Within 24hrs" },
    { region: "LATAM", country: "Peru", method: "Bank Transfer", currency: "PEN", cls: "Standard", variable: "1.80%", fixed: "$2.00", spread: "1.80%", retail: "~4.35% + $2.00", notes: "" },
    { region: "LATAM", country: "Argentina", method: "Bank Account", currency: "ARS", cls: "Restricted", variable: "1.50%", fixed: "$1.50", spread: "4.30%", retail: "~7.55%", notes: "QUOTE ONLY. FX controls" },
    { region: "APAC", country: "Singapore", method: "Bank Transfer", currency: "SGD", cls: "Standard", variable: "0.60%", fixed: "$0.50", spread: "0.60%", retail: "~2.20% + $0.50", notes: "Instant" },
    { region: "APAC", country: "India", method: "Bank Transfer (NEFT/RTGS)", currency: "INR", cls: "Standard", variable: "0.60%", fixed: "$2.00", spread: "0.60%", retail: "~2.45% + $2.00", notes: "INR 1.5M limit/txn" },
    { region: "APAC", country: "Philippines", method: "Bank Transfer", currency: "PHP", cls: "Standard", variable: "0.90%", fixed: "$2.00", spread: "0.90%", retail: "~2.80% + $2.00", notes: "" },
    { region: "APAC", country: "Vietnam", method: "Bank Transfer", currency: "VND", cls: "Standard", variable: "0.60%", fixed: "$2.00", spread: "0.60%", retail: "~2.45% + $2.00", notes: "Max 299,999,999 VND" },
    { region: "Global", country: "USD Wire", method: "SWIFT", currency: "USD", cls: "Complex", variable: "0%", fixed: "$20 direct", spread: "0%", retail: "$45 flat", notes: "Flat fee pricing" },
    { region: "Global", country: "USD Virtual Account", method: "ACH (US)", currency: "USD", cls: "Standard", variable: "0%", fixed: "$2 direct", spread: "0%", retail: "$4 flat", notes: "Inbound + outbound" },
    { region: "Global", country: "EUR Zone", method: "SEPA", currency: "EUR", cls: "Standard", variable: "0%", fixed: "$0", spread: "0%", retail: "$1 flat", notes: "Near-zero rail cost" },
    { region: "Global", country: "USD ↔ USDC/T", method: "Stablecoin Bridge", currency: "USD/USDC", cls: "Complex", variable: "0.75%", fixed: "$0", spread: "Native", retail: "~0.75% + spread", notes: "Network spread applies" },
  ],
};

export const REGIONS = ["Africa", "LATAM", "APAC", "Global", "ALL"] as const;
