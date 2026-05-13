import { fmt$ } from "../../utils/format";
import type { DerivedCosts } from "../../hooks/useDerivedCosts";

export function CostSummary({ costs }: { costs: DerivedCosts }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#1a0a36] via-[#2a1458] to-[#1a0936] px-5 py-4 text-white shadow-xl shadow-violet-950/30">
      {/* Subtle glow accent */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-violet-500/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-violet-400/8 blur-2xl" />

      <div className="relative flex items-center gap-2 mb-3">
        <div className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
        <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-violet-300/80">
          Live estimate
        </span>
      </div>

      <div className="relative grid grid-cols-3 gap-0">
        <CostCell label="Once-off" value={fmt$(costs.onceOffTotal)} />
        <CostCell label="Monthly" value={fmt$(costs.monthlyTotal)} highlight border />
        <CostCell label="Annual est." value={fmt$(costs.annualEstimate)} />
      </div>
    </div>
  );
}

function CostCell({
  label,
  value,
  highlight,
  border,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  border?: boolean;
}) {
  return (
    <div className={`${border ? "border-x border-white/[0.06] px-4" : ""}`}>
      <div className="text-[9px] font-medium uppercase tracking-wider text-white/40">
        {label}
      </div>
      <div
        className={`mt-1 text-[17px] font-bold tracking-tight tabular-nums ${
          highlight ? "text-violet-300" : "text-white"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
