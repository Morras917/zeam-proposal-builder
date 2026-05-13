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
    <div className={`flex flex-1 flex-col gap-1 ${className}`}>
      <label className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
        {label}
      </label>
      {children}
    </div>
  );
}

/* ── Inputs ── */

const inputCls =
  "w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100";

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
        <span className="text-[9px] font-semibold uppercase tracking-wider text-stone-500">
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
      className={`${inputCls} min-h-[64px] resize-y leading-relaxed`}
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
      className={inputCls}
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
    <div className="flex gap-1 rounded-lg bg-stone-100 p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={`flex-1 rounded-md px-3 py-1.5 text-[11px] font-semibold transition ${
            value === o.value
              ? "bg-white text-violet-700 shadow-sm"
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
      className={`relative h-5 w-9 flex-shrink-0 rounded-full transition-colors ${
        on ? "bg-violet-600" : "bg-stone-300"
      }`}
    >
      <div
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-[left] ${
          on ? "left-[18px]" : "left-0.5"
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
      className="flex items-center gap-3 rounded-lg border border-dashed border-stone-200 bg-white p-3"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        onPick(e.dataTransfer.files?.[0]);
      }}
    >
      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-stone-100">
        {value ? (
          <img
            src={value}
            alt=""
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <span className="text-lg font-bold text-stone-400">
            {(clientName || "?").slice(0, 1).toUpperCase()}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1.5">
        <span className="text-xs text-stone-500">
          {value ? "Logo uploaded" : "Drop logo here or"}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => ref.current?.click()}
            className="rounded-md border border-stone-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-stone-700 transition hover:bg-stone-50"
          >
            Choose file
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="rounded-md border border-stone-100 px-2.5 py-1 text-[11px] text-stone-500 transition hover:bg-stone-50"
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
