import { useEffect, useState, useCallback } from "react";
import { useProposalState } from "./hooks/useProposalState";
import { useDerivedCosts } from "./hooks/useDerivedCosts";
import { BuilderForm } from "./components/form/BuilderForm";
import { ProposalDocument } from "./components/proposal/ProposalDocument";
import { saveProposalPdf } from "./utils/savePdf";

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
const IconReset = () => (
  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4.5 9A8 8 0 0119.5 15M19.5 15A8 8 0 014.5 9" />
  </svg>
);
const IconPdf = () => (
  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);
const IconSpinner = () => (
  <svg className="h-3.5 w-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);

export default function App() {
  const { state, set, setProductLine, setOnceOffItem, setBundle, reset } =
    useProposalState();
  const costs = useDerivedCosts(state);
  const [pdfBusy, setPdfBusy] = useState(false);

  const handleSavePdf = useCallback(async () => {
    setPdfBusy(true);
    try {
      const name = `${state.clientName || "Proposal"} — ${state.soReference || "Draft"}.pdf`;
      await saveProposalPdf(name);
    } finally {
      setPdfBusy(false);
    }
  }, [state.clientName, state.soReference]);

  // Dynamic document title
  useEffect(() => {
    const client = state.clientName?.trim();
    document.title = client
      ? `${client} — Zeam Proposal`
      : "Zeam Proposal Builder";
  }, [state.clientName]);

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

          <ToolbarBtn
            icon={<IconReset />}
            label="New"
            onClick={() => {
              if (window.confirm("Start a new proposal? This will discard all unsaved changes.")) {
                reset();
              }
            }}
          />
          <ToolbarBtn icon={<IconPrinter />} label="Print" onClick={() => window.print()} />
          <ToolbarBtn
            icon={<IconDownload />}
            label="JSON"
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
          />
          <button
            onClick={handleSavePdf}
            disabled={pdfBusy}
            className="flex items-center gap-1.5 rounded-lg bg-violet-600 px-3.5 py-1.5 text-[11px] font-semibold text-white shadow-sm shadow-violet-500/25 transition hover:bg-violet-700 active:scale-[0.97] disabled:opacity-60 disabled:pointer-events-none"
          >
            {pdfBusy ? <IconSpinner /> : <IconPdf />}
            {pdfBusy ? "Generating…" : "Save PDF"}
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
