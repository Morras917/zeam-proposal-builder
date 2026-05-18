import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BuilderForm } from "./BuilderForm";
import { defaultState, buildOnceOff } from "../../hooks/useProposalState";
import type { ProposalState } from "../../types";
import type { DerivedCosts } from "../../hooks/useDerivedCosts";
import { ZEAM_DATA } from "../../data/cpq";

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
    corridors: ZEAM_DATA.corridors.filter((c) => c.region === "Africa"),
    ...overrides,
  };
}

function makeState(overrides: Partial<ProposalState> = {}): ProposalState {
  const base = defaultState();
  const merged = { ...base, ...overrides };
  if (!overrides.onceOffItems) {
    merged.onceOffItems = buildOnceOff(merged.includeBA, merged.includeINFRA);
  }
  return merged;
}

const noop = vi.fn();

describe("BuilderForm", () => {
  it("renders all 7 section headings for productLine=BOTH", () => {
    render(
      <BuilderForm
        state={makeState()}
        costs={makeCosts()}
        set={noop}
        setProductLine={noop}
        setOnceOffItem={noop}
        setBundle={noop}
      />,
    );
    expect(screen.getByText("Client & deal")).toBeInTheDocument();
    expect(screen.getByText("Service order")).toBeInTheDocument();
    expect(screen.getByText("Once-off charges")).toBeInTheDocument();
    expect(screen.getByText("Platform fee — TPV tier (Infra)")).toBeInTheDocument();
    expect(screen.getByText("Bundles (Business Account)")).toBeInTheDocument();
    expect(screen.getByText("SLA / Support")).toBeInTheDocument();
    expect(screen.getByText("Corridor rates")).toBeInTheDocument();
  });

  it("hides the TPV section when includeINFRA=false", () => {
    render(
      <BuilderForm
        state={makeState({ includeINFRA: false, productLine: "BA" })}
        costs={makeCosts()}
        set={noop}
        setProductLine={noop}
        setOnceOffItem={noop}
        setBundle={noop}
      />,
    );
    expect(screen.queryByText("Platform fee — TPV tier (Infra)")).toBeNull();
  });

  it("shows the TPV section when includeINFRA=true", () => {
    render(
      <BuilderForm
        state={makeState({ includeINFRA: true })}
        costs={makeCosts()}
        set={noop}
        setProductLine={noop}
        setOnceOffItem={noop}
        setBundle={noop}
      />,
    );
    expect(screen.getByText("Platform fee — TPV tier (Infra)")).toBeInTheDocument();
  });

  it("hides the Bundles section when includeBA=false", () => {
    render(
      <BuilderForm
        state={makeState({ includeBA: false, productLine: "INFRA" })}
        costs={makeCosts()}
        set={noop}
        setProductLine={noop}
        setOnceOffItem={noop}
        setBundle={noop}
      />,
    );
    expect(screen.queryByText("Bundles (Business Account)")).toBeNull();
  });

  it("shows the Bundles section when includeBA=true", () => {
    render(
      <BuilderForm
        state={makeState({ includeBA: true })}
        costs={makeCosts()}
        set={noop}
        setProductLine={noop}
        setOnceOffItem={noop}
        setBundle={noop}
      />,
    );
    expect(screen.getByText("Bundles (Business Account)")).toBeInTheDocument();
  });

  it("shows BA SLA segmented control when includeBA=true", () => {
    render(
      <BuilderForm
        state={makeState({ includeBA: true })}
        costs={makeCosts()}
        set={noop}
        setProductLine={noop}
        setOnceOffItem={noop}
        setBundle={noop}
      />,
    );
    expect(screen.getByText("BA support tier")).toBeInTheDocument();
  });

  it("hides BA SLA when includeBA=false", () => {
    render(
      <BuilderForm
        state={makeState({ includeBA: false, productLine: "INFRA" })}
        costs={makeCosts()}
        set={noop}
        setProductLine={noop}
        setOnceOffItem={noop}
        setBundle={noop}
      />,
    );
    expect(screen.queryByText("BA support tier")).toBeNull();
  });

  it("shows Infra SLA when includeINFRA=true", () => {
    render(
      <BuilderForm
        state={makeState({ includeINFRA: true })}
        costs={makeCosts()}
        set={noop}
        setProductLine={noop}
        setOnceOffItem={noop}
        setBundle={noop}
      />,
    );
    expect(screen.getByText("Infra support tier")).toBeInTheDocument();
  });

  it("hides Infra SLA when includeINFRA=false", () => {
    render(
      <BuilderForm
        state={makeState({ includeINFRA: false, productLine: "BA" })}
        costs={makeCosts()}
        set={noop}
        setProductLine={noop}
        setOnceOffItem={noop}
        setBundle={noop}
      />,
    );
    expect(screen.queryByText("Infra support tier")).toBeNull();
  });

  it("shows the Corridor rates URL input section", () => {
    render(
      <BuilderForm
        state={makeState()}
        costs={makeCosts()}
        set={noop}
        setProductLine={noop}
        setOnceOffItem={noop}
        setBundle={noop}
      />,
    );
    expect(screen.getByText("Corridor rates")).toBeInTheDocument();
    expect(screen.getByText("Corridor rates URL")).toBeInTheDocument();
  });

  it("renders the CostSummary live estimate bar", () => {
    render(
      <BuilderForm
        state={makeState()}
        costs={makeCosts()}
        set={noop}
        setProductLine={noop}
        setOnceOffItem={noop}
        setBundle={noop}
      />,
    );
    expect(screen.getByText(/live estimate/i)).toBeInTheDocument();
  });

  it("renders once-off item toggles for all items", () => {
    const state = makeState();
    render(
      <BuilderForm
        state={state}
        costs={makeCosts()}
        set={noop}
        setProductLine={noop}
        setOnceOffItem={noop}
        setBundle={noop}
      />,
    );
    // once-off item toggles + 1 reliance-model toggle (always in DOM even when section closed)
    const toggles = screen.getAllByRole("button").filter((b) =>
      b.className.includes("rounded-full"),
    );
    expect(toggles.length).toBe(state.onceOffItems.length + 1);
  });

  it("renders the Reliance model section", () => {
    render(
      <BuilderForm
        state={makeState()}
        costs={makeCosts()}
        set={noop}
        setProductLine={noop}
        setOnceOffItem={noop}
        setBundle={noop}
      />,
    );
    expect(screen.getByText("Reliance model (JR)")).toBeInTheDocument();
  });

  it("hides compliance approach when reliance is off", () => {
    render(
      <BuilderForm
        state={makeState({ includeReliance: false })}
        costs={makeCosts()}
        set={noop}
        setProductLine={noop}
        setOnceOffItem={noop}
        setBundle={noop}
      />,
    );
    expect(screen.queryByText("Compliance approach")).toBeNull();
  });

  it("shows compliance approach when reliance is on", () => {
    render(
      <BuilderForm
        state={makeState({ includeReliance: true })}
        costs={makeCosts()}
        set={noop}
        setProductLine={noop}
        setOnceOffItem={noop}
        setBundle={noop}
      />,
    );
    expect(screen.getByText("Compliance approach")).toBeInTheDocument();
    expect(screen.getByText("Zeam compliance module")).toBeInTheDocument();
    expect(screen.getByText(/\$3,000\/mo/)).toBeInTheDocument();
    expect(screen.getByText(/0\.15%/)).toBeInTheDocument();
  });

  it("shows quarterly cert fee row when reliance is on and self-managed", () => {
    render(
      <BuilderForm
        state={makeState({ includeReliance: true, relianceSelfManaged: true })}
        costs={makeCosts()}
        set={noop}
        setProductLine={noop}
        setOnceOffItem={noop}
        setBundle={noop}
      />,
    );
    expect(screen.getByText("Compliance Cert & Partner Review")).toBeInTheDocument();
    expect(screen.getByText("$1,500/qtr")).toBeInTheDocument();
  });

  it("hides quarterly cert fee row when using Zeam compliance module", () => {
    render(
      <BuilderForm
        state={makeState({ includeReliance: true, relianceSelfManaged: false })}
        costs={makeCosts()}
        set={noop}
        setProductLine={noop}
        setOnceOffItem={noop}
        setBundle={noop}
      />,
    );
    expect(screen.queryByText("$1,500/qtr")).toBeNull();
  });
});
