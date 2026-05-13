import { useState, type ReactNode } from "react";

export function Section({
  num,
  title,
  children,
  defaultOpen = true,
}: {
  num: string;
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="group rounded-xl border border-stone-200/70 bg-white shadow-sm shadow-stone-900/[0.03] transition-shadow hover:shadow-md hover:shadow-stone-900/[0.05]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 px-4 py-3 text-left transition"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-violet-50 text-[10px] font-bold text-violet-600">
          {num}
        </span>
        <span className="flex-1 text-[13px] font-bold tracking-tight text-stone-800">
          {title}
        </span>
        <svg
          className={`h-4 w-4 text-stone-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className="section-content" data-open={open}>
        <div>
          <div className="flex flex-col gap-2.5 border-t border-stone-100 px-4 pb-4 pt-3">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
