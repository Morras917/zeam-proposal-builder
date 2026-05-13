import { useProposalState } from "./hooks/useProposalState";
import { useDerivedCosts } from "./hooks/useDerivedCosts";
import { BuilderForm } from "./components/form/BuilderForm";
import { ProposalDocument } from "./components/proposal/ProposalDocument";

export default function App() {
  const { state, set, setProductLine, setOnceOffItem, setBundle, reset } =
    useProposalState();
  const costs = useDerivedCosts(state);

  return (
    <>
      {/* ── Top toolbar ── */}
      <div className="print:hidden sticky top-0 z-50 flex h-14 items-center justify-between border-b border-stone-200/60 bg-white/92 px-5 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <span className="text-base font-bold tracking-tight text-stone-900">
            ZEAM
          </span>
          <div className="h-[18px] w-px bg-stone-200" />
          <span className="text-[13px] font-semibold tracking-tight text-stone-700">
            Proposal Builder
          </span>
          <span className="ml-2 rounded-md bg-violet-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-violet-700">
            v3.0
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="mr-1 text-[11px] text-stone-400">
            {state.clientName || "Untitled"} ·{" "}
            {state.productLine === "BOTH"
              ? "BA + Infra"
              : state.productLine}
          </span>
          <button
            onClick={reset}
            className="rounded-lg border border-stone-200 bg-white px-3.5 py-1.5 text-xs font-medium text-stone-600 transition hover:bg-stone-50"
          >
            New proposal
          </button>
          <button
            onClick={() => window.print()}
            className="rounded-lg border border-stone-200 bg-white px-3.5 py-1.5 text-xs font-medium text-stone-600 transition hover:bg-stone-50"
          >
            Print / PDF
          </button>
          <button
            onClick={() => {
              const data = JSON.stringify(state, null, 2);
              const blob = new Blob([data], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `${state.clientName || "proposal"}-${state.soReference || "draft"}.json`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="rounded-lg bg-violet-950 px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-violet-900"
          >
            Export JSON
          </button>
        </div>
      </div>

      {/* ── Split layout ── */}
      <div className="print:block flex h-[calc(100vh-56px)] print:h-auto">
        {/* Form pane */}
        <div className="print:hidden w-[420px] flex-shrink-0 overflow-y-auto border-r border-stone-200/60 bg-stone-50">
          <BuilderForm
            state={state}
            costs={costs}
            set={set}
            setProductLine={setProductLine}
            setOnceOffItem={setOnceOffItem}
            setBundle={setBundle}
          />
        </div>

        {/* Preview pane */}
        <div className="preview-pane flex-1 overflow-y-auto print:overflow-visible print:bg-white"
          style={{ background: "#1a0d2e" }}
        >
          <ProposalDocument state={state} costs={costs} />
        </div>
      </div>
    </>
  );
}
