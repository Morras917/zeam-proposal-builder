import { useMemo } from "react";
import type { ProposalState, Bundle, TPVTier, SLATier } from "../types";
import { ZEAM_DATA } from "../data/cpq";

export interface BundleLine extends Bundle {
  cat: string;
}

export interface DerivedCosts {
  onceOffTotal: number;
  onceOffItems: ProposalState["onceOffItems"];
  baBundleLines: BundleLine[];
  baBundleMonthly: number;
  infraTier: (TPVTier & { tpv: number }) | null;
  slaTierBA: SLATier | null;
  slaTierINFRA: SLATier | null;
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

  const slaTierBA = state.includeBA
    ? ZEAM_DATA.slaTiers.BA.find((t) => t.id === state.slaBA) ?? null
    : null;

  const slaTierINFRA = state.includeINFRA
    ? ZEAM_DATA.slaTiers.INFRA.find((t) => t.id === state.slaINFRA) ?? null
    : null;

  const monthlyTotal =
    baBundleMonthly +
    (infraTier?.mcf || 0) +
    (slaTierBA?.retainer || 0) +
    (slaTierINFRA?.retainer || 0);

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
    monthlyTotal,
    annualEstimate: monthlyTotal * 12 + onceOffTotal,
    corridors,
  };
}
