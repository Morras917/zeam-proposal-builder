import { fmt$ } from "../../utils/format";
import type { DerivedCosts } from "../../hooks/useDerivedCosts";

export function CostSummary({ costs }: { costs: DerivedCosts }) {
  return (
    <div className="sticky top-0 z-10 rounded-xl border border-violet-200/50 bg-gradient-to-r from-violet-950 to-violet-900 px-4 py-3 text-white shadow-lg">
      <div className="mb-2 text-[9px] font-semibold uppercase tracking-widest text-violet-300">
        Live estimate
      </div>
      <div className="grid grid-cols-3 gap-3">
        <CostCell label="Once-off" value={fmt$(costs.onceOffTotal)} />
        <CostCell label="Monthly" value={fmt$(costs.monthlyTotal)} highlight />
        <CostCell label="Annual est." value={fmt$(costs.annualEstimate)} />
      </div>
    </div>
  );
}

function CostCell({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <div className="text-[9px] font-medium uppercase tracking-wider text-violet-400">
        {label}
      </div>
      <div
        className={`mt-0.5 text-base font-bold tabular-nums ${
          highlight ? "text-violet-300" : "text-white"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
