import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CostSummary } from "./CostSummary";
import type { DerivedCosts } from "../../hooks/useDerivedCosts";

function makeCosts(overrides: Partial<DerivedCosts> = {}): DerivedCosts {
  return {
    onceOffTotal: 0,
    onceOffItems: [],
    baBundleLines: [],
    baBundleMonthly: 0,
    infraTier: null,
    slaTierBA: null,
    slaTierINFRA: null,
    reliance: null,
    monthlyTotal: 0,
    annualEstimate: 0,
    corridors: [],
    ...overrides,
  };
}

describe("CostSummary", () => {
  it("renders the three cost labels", () => {
    render(<CostSummary costs={makeCosts()} />);
    // Labels are written as mixed-case in JSX; CSS `uppercase` is visual only
    expect(screen.getByText("Once-off")).toBeInTheDocument();
    expect(screen.getByText("Monthly")).toBeInTheDocument();
    expect(screen.getByText("Annual est.")).toBeInTheDocument();
  });

  it("displays $0 for all values when costs are zero", () => {
    render(<CostSummary costs={makeCosts()} />);
    const zeros = screen.getAllByText("$0");
    expect(zeros.length).toBe(3);
  });

  it("displays formatted once-off total", () => {
    render(<CostSummary costs={makeCosts({ onceOffTotal: 18075 })} />);
    expect(screen.getByText("$18,075")).toBeInTheDocument();
  });

  it("displays formatted monthly total", () => {
    render(<CostSummary costs={makeCosts({ monthlyTotal: 22000 })} />);
    expect(screen.getByText("$22,000")).toBeInTheDocument();
  });

  it("displays formatted annual estimate", () => {
    render(<CostSummary costs={makeCosts({ annualEstimate: 282075 })} />);
    expect(screen.getByText("$282,075")).toBeInTheDocument();
  });

  it("shows the 'Live estimate' label", () => {
    render(<CostSummary costs={makeCosts()} />);
    expect(screen.getByText(/live estimate/i)).toBeInTheDocument();
  });

  it("renders all three values simultaneously", () => {
    const costs = makeCosts({ onceOffTotal: 5000, monthlyTotal: 15000, annualEstimate: 185000 });
    render(<CostSummary costs={costs} />);
    expect(screen.getByText("$5,000")).toBeInTheDocument();
    expect(screen.getByText("$15,000")).toBeInTheDocument();
    expect(screen.getByText("$185,000")).toBeInTheDocument();
  });
});
