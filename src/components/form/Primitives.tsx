import { useRef, type ReactNode } from "react";

/* ── Layout ── */

export function Row({ children }: { children: ReactNode }) {
  return <div className="flex gap-2">{children}</div>;
}

export function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-1 flex-col gap-1.5 ${className}`}>
      <label className="text-[10px] font-semibold uppercase tracking-[0.08em] text-stone-400">
        {label}
      </label>
      {children}
    </div>
  );
}

/* ── Inputs ── */

const inputCls =
  "w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-[13px] text-stone-800 outline-none transition-all placeholder:text-stone-300 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/10 hover:border-stone-300";

export function Text({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      className={inputCls}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export function Num({
  value,
  onChange,
  step = 1,
  small,
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  step?: number;
  small?: boolean;
  label?: string;
}) {
  return (
    <div className="flex flex-1 flex-col gap-0.5">
      {label && (
        <span className="text-[9px] font-semibold uppercase tracking-[0.08em] text-stone-400">
          {label}
        </span>
      )}
      <input
        type="number"
        step={step}
        className={`${inputCls} ${small ? "px-2 py-1.5 text-xs" : ""}`}
        value={value ?? ""}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

export function TextArea({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <textarea
      className={`${inputCls} min-h-[72px] resize-y leading-relaxed`}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      className={`${inputCls} cursor-pointer`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

/* ── Segmented control ── */

export function Segmented({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex gap-0.5 rounded-lg bg-stone-100 p-[3px]">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={`flex-1 rounded-[7px] px-3 py-[7px] text-[11px] font-semibold transition-all duration-150 ${
            value === o.value
              ? "bg-white text-violet-700 shadow-sm ring-1 ring-black/[0.04]"
              : "text-stone-500 hover:text-stone-700"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/* ── Toggle ── */

export function Toggle({
  on,
  onChange,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className={`relative h-[22px] w-10 flex-shrink-0 rounded-full transition-colors duration-200 ${
        on ? "bg-violet-600" : "bg-stone-200"
      }`}
    >
      <div
        className={`absolute top-[3px] h-4 w-4 rounded-full bg-white shadow-sm transition-all duration-200 ${
          on ? "left-[21px]" : "left-[3px]"
        }`}
      />
    </button>
  );
}

/* ── Logo uploader ── */

export function LogoUploader({
  value,
  onChange,
  clientName,
}: {
  value: string;
  onChange: (v: string) => void;
  clientName: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const onPick = (file?: File | null) => {
    if (!file) return;
    const r = new FileReader();
    r.onload = (e) => onChange(e.target?.result as string);
    r.readAsDataURL(file);
  };

  return (
    <div
      className="flex items-center gap-3.5 rounded-xl border border-dashed border-stone-200 bg-stone-50/50 p-3.5 transition hover:border-violet-300 hover:bg-violet-50/30"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        onPick(e.dataTransfer.files?.[0]);
      }}
    >
      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-stone-900/[0.05]">
        {value ? (
          <img
            src={value}
            alt=""
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <span className="text-lg font-bold text-stone-300">
            {(clientName || "?").slice(0, 1).toUpperCase()}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <span className="text-[11px] text-stone-500">
          {value ? "Logo uploaded" : "Drop logo here or choose file"}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => ref.current?.click()}
            className="rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-stone-700 shadow-sm transition hover:bg-stone-50 active:scale-[0.97]"
          >
            Browse
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="rounded-lg px-3 py-1.5 text-[11px] font-medium text-stone-400 transition hover:text-red-500"
            >
              Remove
            </button>
          )}
        </div>
        <input
          ref={ref}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onPick(e.target.files?.[0])}
        />
      </div>
    </div>
  );
}
