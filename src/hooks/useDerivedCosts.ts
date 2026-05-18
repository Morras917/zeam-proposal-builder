import { useMemo } from "react";
import type { ProposalState, Bundle, TPVTier, SLATier } from "../types";
import { ZEAM_DATA } from "../data/cpq";

export interface BundleLine extends Bundle {
  cat: string;
}

export interface RelianceCosts {
  monthlyFee: number;        // $3,000 flat
  processingFee: number;     // 0.15% × TPV estimate
  quarterlyReviewFee: number; // $1,500/qtr if self-managed, else 0
  totalMonthly: number;      // monthlyFee + processingFee + quarterlyReviewFee/3
  totalAnnual: number;       // totalMonthly * 12 + (selfManaged ? 0 : already included)
}

export interface DerivedCosts {
  onceOffTotal: number;
  onceOffItems: ProposalState["onceOffItems"];
  baBundleLines: BundleLine[];
  baBundleMonthly: number;
  infraTier: (TPVTier & { tpv: number }) | null;
  slaTierBA: SLATier | null;
  slaTierINFRA: SLATier | null;
  reliance: RelianceCosts | null;
  monthlyTotal: number;
  annualEstimate: number;
  corridors: typeof ZEAM_DATA.corridors;
}

export function useDerivedCosts(state: ProposalState): DerivedCosts {
  const onceOffFiltered = useMemo(
    () => state.onceOffItems.filter((i) => i.qty > 0),
    [state.onceOffItems],
  );

  const onceOffTotal = useMemo(
    () =>
      onceOffFiltered.reduce(
        (s, i) => s + i.fee * i.qty * (1 - (i.discount || 0) / 100),
        0,
      ),
    [onceOffFiltered],
  );

  const baBundleLines = useMemo(() => {
    if (!state.includeBA) return [];
    const cats = ["payout", "collections", "bulk", "fx"] as const;
    const lines: BundleLine[] = [];
    for (const cat of cats) {
      const code = state.bundles[cat];
      if (!code) continue;
      const b = ZEAM_DATA.bundles[cat].find((x) => x.code === code);
      if (b) lines.push({ cat, ...b });
    }
    return lines;
  }, [state.bundles, state.includeBA]);

  const baBundleMonthly = useMemo(
    () => baBundleLines.reduce((s, b) => s + (b.fee || 0), 0),
    [baBundleLines],
  );

  const infraTier = useMemo(() => {
    if (!state.includeINFRA) return null;
    const tpv = Number(state.expectedTPV) || 0;
    const chosen =
      ZEAM_DATA.tpvTiers.find((t) => tpv >= t.from && tpv <= t.to) ||
      ZEAM_DATA.tpvTiers[0];
    return { ...chosen, tpv };
  }, [state.expectedTPV, state.includeINFRA]);

  const slaTierBA = state.includeSLA && state.includeBA
    ? ZEAM_DATA.slaTiers.BA.find((t) => t.id === state.slaBA) ?? null
    : null;

  const slaTierINFRA = state.includeSLA && state.includeINFRA
    ? ZEAM_DATA.slaTiers.INFRA.find((t) => t.id === state.slaINFRA) ?? null
    : null;

  // ── Reliance model costs ──
  const reliance = useMemo((): RelianceCosts | null => {
    if (!state.includeReliance) return null;
    const MONTHLY_FEE = 3000;
    const PROCESSING_RATE = 0.0015; // 0.15%
    const QUARTERLY_CERT = 1500;
    const tpv = Number(state.expectedTPV) || 0;
    const processingFee = tpv * PROCESSING_RATE;
    const quarterlyReviewFee = state.relianceSelfManaged ? QUARTERLY_CERT : 0;
    // Monthly equivalent of quarterly cert = fee/3, for running total purposes
    const totalMonthly = MONTHLY_FEE + processingFee + quarterlyReviewFee / 3;
    return {
      monthlyFee: MONTHLY_FEE,
      processingFee,
      quarterlyReviewFee,
      totalMonthly,
      totalAnnual: totalMonthly * 12,
    };
  }, [state.includeReliance, state.relianceSelfManaged, state.expectedTPV]);

  const monthlyTotal =
    baBundleMonthly +
    (infraTier?.mcf || 0) +
    (slaTierBA?.retainer || 0) +
    (slaTierINFRA?.retainer || 0) +
    (reliance?.totalMonthly || 0);

  const corridors = useMemo(
    () =>
      !state.region || state.region === "ALL"
        ? ZEAM_DATA.corridors
        : ZEAM_DATA.corridors.filter((c) => c.region === state.region),
    [state.region],
  );

  return {
    onceOffTotal,
    onceOffItems: onceOffFiltered,
    baBundleLines,
    baBundleMonthly,
    infraTier,
    slaTierBA,
    slaTierINFRA,
    reliance,
    monthlyTotal,
    annualEstimate: monthlyTotal * 12 + onceOffTotal,
    corridors,
  };
}
