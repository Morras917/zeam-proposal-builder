import { describe, it, expect } from "vitest";
import { fmt$, fmt$2, fmtNum, fmtPct, tierRange } from "./format";

describe("fmt$", () => {
  it("formats zero", () => {
    expect(fmt$(0)).toBe("$0");
  });

  it("formats whole numbers with commas", () => {
    expect(fmt$(1000)).toBe("$1,000");
    expect(fmt$(15000)).toBe("$15,000");
    expect(fmt$(1000000)).toBe("$1,000,000");
  });

  it("formats with specified fractional digits", () => {
    expect(fmt$(1234.5, 2)).toBe("$1,234.50");
    expect(fmt$(0.5, 2)).toBe("$0.50");
  });

  it("handles NaN/undefined gracefully via || 0", () => {
    expect(fmt$(NaN)).toBe("$0");
  });
});

describe("fmt$2", () => {
  it("always shows 2 decimal places", () => {
    expect(fmt$2(5000)).toBe("$5,000.00");
    expect(fmt$2(0)).toBe("$0.00");
    expect(fmt$2(3.1)).toBe("$3.10");
    expect(fmt$2(99.999)).toBe("$100.00");
  });
});

describe("fmtNum", () => {
  it("formats numbers with locale separators", () => {
    expect(fmtNum(5000)).toBe("5,000");
    expect(fmtNum(250000)).toBe("250,000");
    expect(fmtNum(0)).toBe("0");
  });
});

describe("fmtPct", () => {
  it("converts decimal to percentage string", () => {
    expect(fmtPct(0.015)).toBe("1.5%");
    expect(fmtPct(0.0125)).toBe("1.25%");
    expect(fmtPct(0.01)).toBe("1%");
  });

  it("respects dp parameter", () => {
    expect(fmtPct(0.0075, 2)).toBe("0.75%");
    expect(fmtPct(0.005, 1)).toBe("0.5%");
  });

  it("strips trailing zeros", () => {
    expect(fmtPct(0.01, 2)).toBe("1%");
    expect(fmtPct(0.015, 2)).toBe("1.5%");
  });

  it("handles zero", () => {
    expect(fmtPct(0)).toBe("0%");
  });
});

describe("tierRange", () => {
  it("formats 'Up to' for ranges starting at 0", () => {
    expect(tierRange(0, 200000)).toBe("Up to $200,000");
  });

  it("formats 'Above' for Infinity upper bound", () => {
    expect(tierRange(100000001, Infinity)).toBe("Above $100,000,000");
  });

  it("formats a normal range with dash", () => {
    expect(tierRange(200001, 1000000)).toBe("$200,001 – $1,000,000");
    expect(tierRange(1000001, 5000000)).toBe("$1,000,001 – $5,000,000");
  });
});
