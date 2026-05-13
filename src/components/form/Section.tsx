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
    <section className="rounded-xl border border-stone-200/80 bg-white/60">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2.5 px-4 py-3 text-left"
      >
        <span className="text-[10px] font-bold tracking-wider text-violet-600">
          {num}
        </span>
        <span className="flex-1 text-[13px] font-bold tracking-tight text-stone-800">
          {title}
        </span>
        <svg
          className={`h-4 w-4 text-stone-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="flex flex-col gap-2.5 border-t border-stone-100 px-4 pb-4 pt-3">
          {children}
        </div>
      )}
    </section>
  );
}
