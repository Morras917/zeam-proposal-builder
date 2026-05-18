import type { ProposalState } from "../../types";
import type { DerivedCosts } from "../../hooks/useDerivedCosts";
import { Page } from "./shared";

interface Props {
  state: ProposalState;
  costs: DerivedCosts;
}

export function CoverPage({ state, costs }: Props) {
  const productLabel =
    state.productLine === "BOTH"
      ? "Business Account + Infrastructure / API"
      : state.productLine === "BA"
        ? "Business Account"
        : "Infrastructure / API";

  const regions = [
    ...new Set(costs.corridors.map((c) => c.region)),
  ].join(" · ");

  const dealRows = [
    ["SO Reference", state.soReference || "—"],
    ["MSA Reference", state.msaReference || "—"],
    ["Effective Date", state.effectiveDate || "—"],
    ["Valid Until", state.quoteValidUntil || "—"],
    ["Contract Duration", state.contractDuration ? `${state.contractDuration} months` : "—"],
    ["Notice Period", state.noticePeriod ? `${state.noticePeriod} months` : "—"],
  ] as const;

  return (
    <Page>
      <div
        className="flex flex-col text-white"
        style={{
          height: 1123,
          background:
            "linear-gradient(165deg, #1a0636 0%, #1f0840 35%, #160530 70%, #0e0220 100%)",
        }}
      >
        {/* ── Top bar ── */}
        <div className="flex items-center justify-between px-12 pt-10">
          <div className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ background: "rgba(139,92,246,0.35)", border: "1px solid rgba(139,92,246,0.5)" }}
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4 text-white" fill="currentColor">
                <path d="M10 1L18.66 10L10 19L1.34 10L10 1Z" />
              </svg>
            </div>
            <span className="text-[22px] font-black tracking-tight">ZEAM</span>
          </div>
          <div className="text-right text-[10px] uppercase tracking-[0.2em] text-white/40">
            <div>Confidential</div>
            <div className="mt-0.5">{state.year || new Date().getFullYear()}</div>
          </div>
        </div>

        {/* ── Thin rule ── */}
        <div className="mx-12 mt-8" style={{ height: 1, background: "rgba(255,255,255,0.08)" }} />

        {/* ── Hero / client ── */}
        <div className="flex flex-1 flex-col items-center justify-center px-12 text-center">
          {/* Client logo */}
          <div
            className="mb-6 flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-2xl"
            style={{ boxShadow: "0 0 48px rgba(139,92,246,0.3)" }}
          >
            {state.clientLogo ? (
              <img
                src={state.clientLogo}
                alt=""
                className="max-h-[85%] max-w-[85%] object-contain"
              />
            ) : (
              <span className="text-4xl font-black text-violet-900">
                {(state.clientName || "?").slice(0, 1).toUpperCase()}
              </span>
            )}
          </div>

          <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-300/70">
            Pricing Proposal — Prepared exclusively for
          </div>

          <h1
            className="m-0 max-w-[560px] font-black leading-[1.0] tracking-tight"
            style={{ fontSize: state.clientName && state.clientName.length > 20 ? 42 : 52 }}
          >
            {state.clientName || "Client"}
          </h1>

          {state.clientContact && (
            <div className="mt-3 text-[12px] text-white/45">
              Attn: {state.clientContact}
            </div>
          )}

          {/* Cover note */}
          {state.coverNote && (
            <p className="mt-5 max-w-[500px] text-[11.5px] leading-relaxed text-white/60">
              {state.coverNote}
            </p>
          )}

          {/* Product + scope badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <span
              className="rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em]"
              style={{ background: "rgba(139,92,246,0.22)", border: "1px solid rgba(139,92,246,0.4)", color: "rgba(196,167,255,1)" }}
            >
              {productLabel}
            </span>
            {regions && (
              <span
                className="rounded-full px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/60"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}
              >
                {regions}
              </span>
            )}
          </div>

        </div>

        {/* ── Thin rule ── */}
        <div className="mx-12" style={{ height: 1, background: "rgba(255,255,255,0.08)" }} />

        {/* ── Deal terms grid ── */}
        <div className="grid grid-cols-3 gap-x-8 gap-y-3 px-12 py-7">
          {dealRows.map(([label, value]) => (
            <div key={label}>
              <div className="text-[8.5px] font-semibold uppercase tracking-[0.18em] text-white/35">
                {label}
              </div>
              <div className="mt-0.5 text-[12px] font-semibold text-white/80">
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* ── Thin rule ── */}
        <div className="mx-12" style={{ height: 1, background: "rgba(255,255,255,0.08)" }} />

        {/* ── Footer ── */}
        <div className="flex items-center justify-between px-12 py-6 text-[9.5px] text-white/30 uppercase tracking-[0.18em]">
          <span>Zeam · Confidential</span>
          {state.salesRep && <span>Prepared by {state.salesRep}</span>}
          <span>{state.year || new Date().getFullYear()}</span>
        </div>
      </div>
    </Page>
  );
}
