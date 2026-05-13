import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useDerivedCosts } from "./useDerivedCosts";
import { buildOnceOff, defaultState } from "./useProposalState";
import type { ProposalState } from "../types";
import { ZEAM_DATA } from "../data/cpq";

/** Helper: create a proposal state with overrides */
function makeState(overrides: Partial<ProposalState> = {}): ProposalState {
  const base = defaultState();
  const merged = { ...base, ...overrides };
  // Ensure onceOffItems matches productLine flags
  if (!overrides.onceOffItems) {
    merged.onceOffItems = buildOnceOff(merged.includeBA, merged.includeINFRA);
  }
  return merged;
}

describe("useDerivedCosts", () => {
  /* ── Once-off totals ── */
  describe("onceOffTotal", () => {
    it("sums only items with qty > 0", () => {
      const state = makeState();
      // Default state: mandatory BA items (po_int qty=1, kyb_auto qty=1, iban qty=1, sandbox qty=1)
      // and INFRA mandatory items (po_int qty=1, kyb_edd qty=1, cert qty=1)
      const { result } = renderHook(() => useDerivedCosts(state));
      // Items with qty > 0 in default: 5000+50+25+500 (BA) + 5000+5000+2500+500 (INFRA)
      expect(result.current.onceOffItems.length).toBeGreaterThan(0);
      expect(result.current.onceOffTotal).toBeGreaterThan(0);
    });

    it("returns 0 when all items have qty=0", () => {
      const state = makeState();
      state.onceOffItems = state.onceOffItems.map((i) => ({ ...i, qty: 0 }));
      const { result } = renderHook(() => useDerivedCosts(state));
      expect(result.current.onceOffTotal).toBe(0);
      expect(result.current.onceOffItems).toHaveLength(0);
    });

    it("applies discount correctly", () => {
      const state = makeState();
      // Set a single item: fee=1000, qty=2, discount=25%
      state.onceOffItems = [
        {
          id: "test",
          name: "Test",
          fee: 1000,
          qty: 2,
          mandatory: false,
          notes: "",
          discount: 25,
          _lineLabel: "Test",
        },
      ];
      const { result } = renderHook(() => useDerivedCosts(state));
      // 1000 * 2 * (1 - 25/100) = 1500
      expect(result.current.onceOffTotal).toBe(1500);
    });

    it("handles 0% discount as full price", () => {
      const state = makeState();
      state.onceOffItems = [
        {
          id: "test",
          name: "Test",
          fee: 500,
          qty: 3,
          mandatory: false,
          notes: "",
          discount: 0,
          _lineLabel: "Test",
        },
      ];
      const { result } = renderHook(() => useDerivedCosts(state));
      expect(result.current.onceOffTotal).toBe(1500);
    });

    it("handles 100% discount as zero", () => {
      const state = makeState();
      state.onceOffItems = [
        {
          id: "test",
          name: "Test",
          fee: 5000,
          qty: 1,
          mandatory: false,
          notes: "",
          discount: 100,
          _lineLabel: "Test",
        },
      ];
      const { result } = renderHook(() => useDerivedCosts(state));
      expect(result.current.onceOffTotal).toBe(0);
    });
  });

  /* ── BA bundle resolution ── */
  describe("baBundleLines", () => {
    it("resolves selected bundle codes to full bundle objects", () => {
      const state = makeState({
        includeBA: true,
        bundles: { payout: "PAY-5K", collections: "COL-500", bulk: "", fx: "" },
      });
      const { result } = renderHook(() => useDerivedCosts(state));
      expect(result.current.baBundleLines).toHaveLength(2);
      expect(result.current.baBundleLines[0].code).toBe("PAY-5K");
      expect(result.current.baBundleLines[0].fee).toBe(5500);
      expect(result.current.baBundleLines[1].code).toBe("COL-500");
      expect(result.current.baBundleLines[1].fee).toBe(1050);
    });

    it("returns empty when includeBA is false", () => {
      const state = makeState({
        includeBA: false,
        bundles: { payout: "PAY-5K", collections: "COL-500", bulk: "", fx: "" },
      });
      const { result } = renderHook(() => useDerivedCosts(state));
      expect(result.current.baBundleLines).toHaveLength(0);
      expect(result.current.baBundleMonthly).toBe(0);
    });

    it("skips empty bundle selections", () => {
      const state = makeState({
        includeBA: true,
        bundles: { payout: "PAY-1K", collections: "", bulk: "", fx: "" },
      });
      const { result } = renderHook(() => useDerivedCosts(state));
      expect(result.current.baBundleLines).toHaveLength(1);
      expect(result.current.baBundleLines[0].code).toBe("PAY-1K");
    });

    it("computes baBundleMonthly as sum of bundle fees", () => {
      const state = makeState({
        includeBA: true,
        bundles: { payout: "PAY-5K", collections: "COL-500", bulk: "BULK-PAYG", fx: "" },
      });
      const { result } = renderHook(() => useDerivedCosts(state));
      // PAY-5K=$5500 + COL-500=$1050 + BULK-PAYG=$250
      expect(result.current.baBundleMonthly).toBe(5500 + 1050 + 250);
    });
  });

  /* ── INFRA TPV tier selection ── */
  describe("infraTier", () => {
    it("returns null when includeINFRA is false", () => {
      const state = makeState({ includeINFRA: false });
      const { result } = renderHook(() => useDerivedCosts(state));
      expect(result.current.infraTier).toBeNull();
    });

    it("selects lowest tier for TPV of $100,000", () => {
      const state = makeState({ includeINFRA: true, expectedTPV: 100000 });
      const { result } = renderHook(() => useDerivedCosts(state));
      expect(result.current.infraTier).not.toBeNull();
      expect(result.current.infraTier!.mcf).toBe(3000);
      expect(result.current.infraTier!.rate).toBe(0.015);
      expect(result.current.infraTier!.tpv).toBe(100000);
    });

    it("selects tier 2 for TPV of $500,000", () => {
      const state = makeState({ includeINFRA: true, expectedTPV: 500000 });
      const { result } = renderHook(() => useDerivedCosts(state));
      expect(result.current.infraTier!.mcf).toBe(5000);
      expect(result.current.infraTier!.rate).toBe(0.0125);
    });

    it("selects tier 3 for TPV of $3,500,000", () => {
      const state = makeState({ includeINFRA: true, expectedTPV: 3500000 });
      const { result } = renderHook(() => useDerivedCosts(state));
      expect(result.current.infraTier!.mcf).toBe(15000);
      expect(result.current.infraTier!.rate).toBe(0.01);
    });

    it("selects tier 4 for TPV of $10,000,000", () => {
      const state = makeState({ includeINFRA: true, expectedTPV: 10000000 });
      const { result } = renderHook(() => useDerivedCosts(state));
      expect(result.current.infraTier!.mcf).toBe(50000);
      expect(result.current.infraTier!.rate).toBe(0.0075);
    });

    it("selects highest tier for very large TPV", () => {
      const state = makeState({ includeINFRA: true, expectedTPV: 500000000 });
      const { result } = renderHook(() => useDerivedCosts(state));
      expect(result.current.infraTier!.mcf).toBe(180000);
      expect(result.current.infraTier!.rate).toBe(0.0035);
    });

    it("falls back to tier 1 for TPV of 0", () => {
      const state = makeState({ includeINFRA: true, expectedTPV: 0 });
      const { result } = renderHook(() => useDerivedCosts(state));
      expect(result.current.infraTier!.mcf).toBe(3000);
    });

    it("selects correct tier at exact boundary values", () => {
      // Exactly at upper boundary of tier 1 ($200,000)
      const state1 = makeState({ includeINFRA: true, expectedTPV: 200000 });
      const { result: r1 } = renderHook(() => useDerivedCosts(state1));
      expect(r1.current.infraTier!.mcf).toBe(3000);

      // Exactly at lower boundary of tier 2 ($200,001)
      const state2 = makeState({ includeINFRA: true, expectedTPV: 200001 });
      const { result: r2 } = renderHook(() => useDerivedCosts(state2));
      expect(r2.current.infraTier!.mcf).toBe(5000);
    });
  });

  /* ── SLA tier resolution ── */
  describe("SLA tiers", () => {
    it("resolves BA SLA tier when includeBA is true", () => {
      const state = makeState({ includeBA: true, slaBA: "mc" });
      const { result } = renderHook(() => useDerivedCosts(state));
      expect(result.current.slaTierBA).not.toBeNull();
      expect(result.current.slaTierBA!.name).toBe("Mission-Critical");
      expect(result.current.slaTierBA!.retainer).toBe(8500);
    });

    it("returns null for BA SLA when includeBA is false", () => {
      const state = makeState({ includeBA: false, slaBA: "mc" });
      const { result } = renderHook(() => useDerivedCosts(state));
      expect(result.current.slaTierBA).toBeNull();
    });

    it("resolves INFRA SLA tier when includeINFRA is true", () => {
      const state = makeState({ includeINFRA: true, slaINFRA: "pri" });
      const { result } = renderHook(() => useDerivedCosts(state));
      expect(result.current.slaTierINFRA).not.toBeNull();
      expect(result.current.slaTierINFRA!.name).toBe("Priority");
      expect(result.current.slaTierINFRA!.retainer).toBe(4500);
    });

    it("returns null for INFRA SLA when includeINFRA is false", () => {
      const state = makeState({ includeINFRA: false, slaINFRA: "pri" });
      const { result } = renderHook(() => useDerivedCosts(state));
      expect(result.current.slaTierINFRA).toBeNull();
    });
  });

  /* ── Monthly total ── */
  describe("monthlyTotal", () => {
    it("sums bundles + infra MCF + SLA retainers", () => {
      const state = makeState({
        includeBA: true,
        includeINFRA: true,
        bundles: { payout: "PAY-5K", collections: "", bulk: "", fx: "" },
        expectedTPV: 3500000, // tier 3: mcf=15000
        slaBA: "std",        // retainer=750
        slaINFRA: "std",     // retainer=750
      });
      const { result } = renderHook(() => useDerivedCosts(state));
      // 5500 (PAY-5K) + 15000 (infra MCF) + 750 (BA SLA) + 750 (INFRA SLA)
      expect(result.current.monthlyTotal).toBe(5500 + 15000 + 750 + 750);
    });

    it("excludes infra when not included", () => {
      const state = makeState({
        includeBA: true,
        includeINFRA: false,
        productLine: "BA",
        bundles: { payout: "PAY-PAYG", collections: "", bulk: "", fx: "" },
        slaBA: "std",
      });
      const { result } = renderHook(() => useDerivedCosts(state));
      // PAY-PAYG fee=0, SLA std=750, no infra
      expect(result.current.monthlyTotal).toBe(750);
    });
  });

  /* ── Annual estimate ── */
  describe("annualEstimate", () => {
    it("equals monthlyTotal * 12 + onceOffTotal", () => {
      const state = makeState();
      const { result } = renderHook(() => useDerivedCosts(state));
      expect(result.current.annualEstimate).toBe(
        result.current.monthlyTotal * 12 + result.current.onceOffTotal,
      );
    });
  });

  /* ── Corridor filtering ── */
  describe("corridors", () => {
    it("returns all corridors when region is ALL", () => {
      const state = makeState({ region: "ALL" });
      const { result } = renderHook(() => useDerivedCosts(state));
      expect(result.current.corridors).toHaveLength(ZEAM_DATA.corridors.length);
    });

    it("filters to Africa corridors only", () => {
      const state = makeState({ region: "Africa" });
      const { result } = renderHook(() => useDerivedCosts(state));
      const expected = ZEAM_DATA.corridors.filter((c) => c.region === "Africa");
      expect(result.current.corridors).toHaveLength(expected.length);
      expect(result.current.corridors.every((c) => c.region === "Africa")).toBe(true);
    });

    it("filters to LATAM corridors only", () => {
      const state = makeState({ region: "LATAM" });
      const { result } = renderHook(() => useDerivedCosts(state));
      expect(result.current.corridors.every((c) => c.region === "LATAM")).toBe(true);
      expect(result.current.corridors.length).toBeGreaterThan(0);
    });

    it("filters to APAC corridors only", () => {
      const state = makeState({ region: "APAC" });
      const { result } = renderHook(() => useDerivedCosts(state));
      expect(result.current.corridors.every((c) => c.region === "APAC")).toBe(true);
      expect(result.current.corridors.length).toBeGreaterThan(0);
    });

    it("returns all corridors when region is empty string", () => {
      const state = makeState({ region: "" });
      const { result } = renderHook(() => useDerivedCosts(state));
      expect(result.current.corridors).toHaveLength(ZEAM_DATA.corridors.length);
    });
  });
});
