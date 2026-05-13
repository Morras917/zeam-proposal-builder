import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { buildOnceOff, defaultState, useProposalState } from "./useProposalState";
import { ZEAM_DATA } from "../data/cpq";

describe("buildOnceOff", () => {
  it("returns BA items only when includeBA=true, includeINFRA=false", () => {
    const items = buildOnceOff(true, false);
    expect(items.length).toBe(ZEAM_DATA.onceOff.BA.length);
    expect(items.every((i) => i._lineLabel.startsWith("Business Account"))).toBe(true);
  });

  it("returns INFRA items only when includeBA=false, includeINFRA=true", () => {
    const items = buildOnceOff(false, true);
    expect(items.length).toBe(ZEAM_DATA.onceOff.INFRA.length);
    expect(items.every((i) => i._lineLabel.startsWith("Infrastructure"))).toBe(true);
  });

  it("returns both BA + INFRA items when both are true", () => {
    const items = buildOnceOff(true, true);
    expect(items.length).toBe(
      ZEAM_DATA.onceOff.BA.length + ZEAM_DATA.onceOff.INFRA.length,
    );
  });

  it("returns empty when both are false", () => {
    const items = buildOnceOff(false, false);
    expect(items).toHaveLength(0);
  });

  it("initializes discount to 0 for all items", () => {
    const items = buildOnceOff(true, true);
    expect(items.every((i) => i.discount === 0)).toBe(true);
  });

  it("labels mandatory items correctly", () => {
    const items = buildOnceOff(true, false);
    const mandatory = items.filter((i) => i.mandatory);
    expect(mandatory.every((i) => i._lineLabel.includes("Mandatory"))).toBe(true);
    const optional = items.filter((i) => !i.mandatory);
    expect(optional.every((i) => i._lineLabel.includes("Optional"))).toBe(true);
  });

  it("preserves original qty from CPQ data", () => {
    const items = buildOnceOff(true, false);
    const poInt = items.find((i) => i.id === "po_int");
    expect(poInt).toBeDefined();
    expect(poInt!.qty).toBe(1); // mandatory, default qty=1
    const poComplex = items.find((i) => i.id === "po_complex");
    expect(poComplex).toBeDefined();
    expect(poComplex!.qty).toBe(0); // optional, default qty=0
  });
});

describe("defaultState", () => {
  it("returns a valid ProposalState object", () => {
    const s = defaultState();
    expect(s.clientName).toBe("African Bank");
    expect(s.productLine).toBe("BOTH");
    expect(s.includeBA).toBe(true);
    expect(s.includeINFRA).toBe(true);
    expect(s.contractDuration).toBe(24);
    expect(s.noticePeriod).toBe(12);
    expect(s.complianceModel).toBe("A");
    expect(s.region).toBe("Africa");
  });

  it("sets year to current year", () => {
    const s = defaultState();
    expect(s.year).toBe(String(new Date().getFullYear()));
  });

  it("includes onceOffItems for both BA and INFRA", () => {
    const s = defaultState();
    expect(s.onceOffItems.length).toBe(
      ZEAM_DATA.onceOff.BA.length + ZEAM_DATA.onceOff.INFRA.length,
    );
  });

  it("has default bundles set", () => {
    const s = defaultState();
    expect(s.bundles.payout).toBe("PAY-5K");
    expect(s.bundles.collections).toBe("COL-500");
    expect(s.bundles.bulk).toBe("");
    expect(s.bundles.fx).toBe("");
  });
});

describe("useProposalState", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("initializes with default state when localStorage is empty", () => {
    const { result } = renderHook(() => useProposalState());
    expect(result.current.state.clientName).toBe("African Bank");
    expect(result.current.state.productLine).toBe("BOTH");
  });

  it("set() updates a single field", () => {
    const { result } = renderHook(() => useProposalState());
    act(() => {
      result.current.set("clientName", "Acme Corp");
    });
    expect(result.current.state.clientName).toBe("Acme Corp");
  });

  it("setProductLine('BA') sets includeBA=true, includeINFRA=false", () => {
    const { result } = renderHook(() => useProposalState());
    act(() => {
      result.current.setProductLine("BA");
    });
    expect(result.current.state.productLine).toBe("BA");
    expect(result.current.state.includeBA).toBe(true);
    expect(result.current.state.includeINFRA).toBe(false);
    // onceOffItems should only have BA items
    expect(
      result.current.state.onceOffItems.every((i) =>
        i._lineLabel.startsWith("Business Account"),
      ),
    ).toBe(true);
  });

  it("setProductLine('INFRA') sets includeBA=false, includeINFRA=true", () => {
    const { result } = renderHook(() => useProposalState());
    act(() => {
      result.current.setProductLine("INFRA");
    });
    expect(result.current.state.includeBA).toBe(false);
    expect(result.current.state.includeINFRA).toBe(true);
    expect(
      result.current.state.onceOffItems.every((i) =>
        i._lineLabel.startsWith("Infrastructure"),
      ),
    ).toBe(true);
  });

  it("setProductLine('BOTH') sets both flags to true", () => {
    const { result } = renderHook(() => useProposalState());
    // Start with BA only, then switch to BOTH
    act(() => result.current.setProductLine("BA"));
    act(() => result.current.setProductLine("BOTH"));
    expect(result.current.state.includeBA).toBe(true);
    expect(result.current.state.includeINFRA).toBe(true);
    expect(result.current.state.onceOffItems.length).toBe(
      ZEAM_DATA.onceOff.BA.length + ZEAM_DATA.onceOff.INFRA.length,
    );
  });

  it("setOnceOffItem updates qty for a specific item", () => {
    const { result } = renderHook(() => useProposalState());
    act(() => {
      result.current.setOnceOffItem(0, "qty", 5);
    });
    expect(result.current.state.onceOffItems[0].qty).toBe(5);
    // Other items unchanged
    expect(result.current.state.onceOffItems[1].qty).toBe(
      defaultState().onceOffItems[1].qty,
    );
  });

  it("setOnceOffItem updates discount for a specific item", () => {
    const { result } = renderHook(() => useProposalState());
    act(() => {
      result.current.setOnceOffItem(0, "discount", 15);
    });
    expect(result.current.state.onceOffItems[0].discount).toBe(15);
  });

  it("setBundle updates a specific bundle category", () => {
    const { result } = renderHook(() => useProposalState());
    act(() => {
      result.current.setBundle("payout", "PAY-10K");
    });
    expect(result.current.state.bundles.payout).toBe("PAY-10K");
    // Other bundles unchanged
    expect(result.current.state.bundles.collections).toBe("COL-500");
  });

  it("reset() restores default state and clears localStorage", () => {
    const { result } = renderHook(() => useProposalState());
    act(() => {
      result.current.set("clientName", "Changed Corp");
      result.current.setProductLine("INFRA");
    });
    expect(result.current.state.clientName).toBe("Changed Corp");

    act(() => {
      result.current.reset();
    });
    expect(result.current.state.clientName).toBe("African Bank");
    expect(result.current.state.productLine).toBe("BOTH");
    expect(localStorage.getItem("zeam_proposal_v3")).toBeNull();
  });
});
