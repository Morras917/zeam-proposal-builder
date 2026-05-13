import { useProposalState } from "./hooks/useProposalState";
import { useDerivedCosts } from "./hooks/useDerivedCosts";
import { BuilderForm } from "./components/form/BuilderForm";
import { ProposalDocument } from "./components/proposal/ProposalDocument";

const IconPrinter = () => (
  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6v-8z" />
  </svg>
);
const IconDownload = () => (
  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2" />
  </svg>
);
const IconPlus = () => (
  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

export default function App() {
  const { state, set, setProductLine, setOnceOffItem, setBundle, reset } =
    useProposalState();
  const costs = useDerivedCosts(state);

  return (
    <>
      {/* ── Toolbar ── */}
      <header className="print:hidden sticky top-0 z-50 flex h-[52px] items-center justify-between border-b border-stone-900/[0.06] bg-white/95 px-5 backdrop-blur-2xl">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-violet-800 shadow-sm shadow-violet-500/20">
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 text-white" fill="currentColor">
              <path d="M10 1L18.66 10L10 19L1.34 10L10 1Z" />
            </svg>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[15px] font-extrabold tracking-tight text-stone-900">Zeam</span>
            <span className="text-[13px] font-medium text-stone-300">/</span>
            <span className="text-[13px] font-semibold text-stone-500">Proposal Builder</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="mr-1 flex items-center gap-1.5 rounded-full bg-stone-100 px-3 py-1">
            {state.clientLogo ? (
              <img src={state.clientLogo} alt="" className="h-4 w-4 rounded object-contain" />
            ) : (
              <div className="flex h-4 w-4 items-center justify-center rounded bg-violet-100 text-[8px] font-bold text-violet-700">
                {(state.clientName || "?")[0]?.toUpperCase()}
              </div>
            )}
            <span className="max-w-[120px] truncate text-[11px] font-medium text-stone-600">
              {state.clientName || "Untitled"}
            </span>
            <span className="text-[10px] text-stone-400">
              · {state.productLine === "BOTH" ? "BA + Infra" : state.productLine}
            </span>
          </div>

          <ToolbarBtn icon={<IconPlus />} label="New" onClick={reset} />
          <ToolbarBtn icon={<IconPrinter />} label="Print" onClick={() => window.print()} />
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
            className="flex items-center gap-1.5 rounded-lg bg-violet-600 px-3.5 py-1.5 text-[11px] font-semibold text-white shadow-sm shadow-violet-500/25 transition hover:bg-violet-700 active:scale-[0.97]"
          >
            <IconDownload />
            Export
          </button>
        </div>
      </header>

      {/* ── Split layout ── */}
      <div className="print:block flex h-[calc(100vh-52px)] print:h-auto">
        <div className="form-scroll print:hidden w-[440px] flex-shrink-0 overflow-y-auto border-r border-stone-200/60 bg-gradient-to-b from-stone-50 to-stone-100/80">
          <BuilderForm
            state={state}
            costs={costs}
            set={set}
            setProductLine={setProductLine}
            setOnceOffItem={setOnceOffItem}
            setBundle={setBundle}
          />
        </div>
        <div
          className="preview-scroll flex-1 overflow-y-auto print:overflow-visible print:bg-white"
          style={{ background: "linear-gradient(180deg, #120826 0%, #1a0d2e 30%)" }}
        >
          <ProposalDocument state={state} costs={costs} />
        </div>
      </div>
    </>
  );
}

function ToolbarBtn({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 rounded-lg border border-stone-200/80 bg-white px-2.5 py-1.5 text-[11px] font-medium text-stone-600 shadow-sm transition hover:border-stone-300 hover:bg-stone-50 active:scale-[0.97]"
    >
      {icon}
      {label}
    </button>
  );
}
