import type { ReactNode } from "react";

/* ── A4 page wrapper ── */
export function Page({ children }: { children: ReactNode }) {
  return (
    <div
      className="proposal-page mx-auto flex flex-col overflow-hidden rounded bg-white shadow-2xl"
      style={{
        width: 794,
        minHeight: 1123,
        fontSize: 11,
        lineHeight: 1.45,
        printColorAdjust: "exact",
        WebkitPrintColorAdjust: "exact",
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

/* ── Purple header bar ── */
export function HeaderBar({
  subtitle,
  clientName,
  clientLogo,
}: {
  subtitle: string;
  clientName: string;
  clientLogo?: string;
}) {
  return (
    <div
      className="flex items-center justify-between px-9 py-[18px] text-white"
      style={{ background: "#1F0440" }}
    >
      <div className="flex items-center gap-3.5">
        <span className="text-sm font-bold tracking-tight">ZEAM</span>
        <div className="h-4 w-px bg-white/20" />
        <span className="text-[10.5px] text-white/70">Prepared for</span>
        <div className="flex items-center gap-2">
          {clientLogo && (
            <div className="flex h-[22px] w-[22px] items-center justify-center overflow-hidden rounded bg-white">
              <img
                src={clientLogo}
                alt=""
                className="max-h-[88%] max-w-[88%] object-contain"
              />
            </div>
          )}
          <span className="font-semibold">{clientName || "Client"}</span>
        </div>
      </div>
      <span className="text-white/85">{subtitle}</span>
    </div>
  );
}

/* ── Footer bar ── */
export function FooterBar({
  year,
  clientName,
  clientLogo,
}: {
  year: string;
  clientName: string;
  clientLogo?: string;
}) {
  return (
    <div className="mt-auto flex items-center justify-between border-t border-black/[0.08] px-9 pb-7 pt-[18px] text-[10px] text-black/50">
      <span>Zeam · {year || "2026"}</span>
      <div className="flex items-center gap-2 font-medium text-stone-900">
        {clientLogo ? (
          <img
            src={clientLogo}
            alt=""
            className="h-3.5 max-w-[70px] object-contain"
          />
        ) : (
          <span className="h-2 w-2 rounded-full bg-violet-600" />
        )}
        {clientName || "Client"}
      </div>
    </div>
  );
}

/* ── Section title inside proposal pages ── */
export function SectionTitle({
  num,
  title,
}: {
  num: string;
  title: string;
}) {
  return (
    <div className="mb-3.5 flex items-baseline gap-3">
      <span className="text-[13px] font-bold text-violet-600">{num}</span>
      <h2 className="m-0 text-[18px] font-bold tracking-tight">{title}</h2>
    </div>
  );
}

/* ── Simple table ── */
export interface TableCol {
  k: string;
  label: string;
  flex?: number;
  num?: boolean;
}

export function SimpleTable({
  cols,
  rows,
  footer,
  small,
}: {
  cols: TableCol[];
  rows: Record<string, unknown>[];
  footer?: (string | null)[];
  small?: boolean;
}) {
  const fs = small ? "text-[9.5px]" : "text-[10.5px]";
  const pad = small ? "px-2.5 py-[7px]" : "px-3 py-[9px]";

  return (
    <div className="overflow-hidden rounded-md border border-black/[0.08]">
      {/* Header */}
      <div
        className={`flex ${pad} text-white`}
        style={{
          background: "#0E0626",
          fontSize: small ? 9 : 9.5,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}
      >
        {cols.map((c) => (
          <div
            key={c.k}
            style={{ flex: c.flex || 1, textAlign: c.num ? "right" : "left" }}
          >
            {c.label}
          </div>
        ))}
      </div>

      {/* Rows */}
      {rows.map((r, i) => {
        const selected = r.__selected as boolean;
        return (
          <div key={i}>
            <div
              className={`flex items-center ${pad} ${fs} ${
                selected
                  ? "border-l-[3px] border-l-violet-600 bg-violet-600/[0.08] font-semibold"
                  : i % 2
                    ? "border-l-[3px] border-l-transparent bg-violet-600/[0.04]"
                    : "border-l-[3px] border-l-transparent"
              } ${i ? "border-t border-black/[0.08]" : ""}`}
            >
              {cols.map((c) => {
                const v = r[c.k];
                return (
                  <div
                    key={c.k}
                    style={{
                      flex: c.flex || 1,
                      textAlign: c.num ? "right" : "left",
                      fontVariantNumeric: c.num ? "tabular-nums" : "normal",
                    }}
                  >
                    {c.k === "cls" ? (
                      <ClassChip v={v as string} />
                    ) : (
                      String(v ?? "")
                    )}
                  </div>
                );
              })}
            </div>
            {typeof r.note === "string" && r.note && (
              <div
                className={`${pad} pb-2 pt-0 text-[9px] text-black/50 leading-snug ${
                  i % 2 ? "bg-violet-600/[0.04]" : ""
                }`}
              >
                {r.note}
              </div>
            )}
          </div>
        );
      })}

      {/* Footer */}
      {footer && (
        <div
          className={`flex ${pad} ${fs} border-t-2 border-black/[0.08] bg-violet-600/[0.05] font-semibold`}
        >
          {cols.map((c, i) => (
            <div
              key={c.k}
              style={{
                flex: c.flex || 1,
                textAlign: c.num ? "right" : "left",
                fontVariantNumeric: c.num ? "tabular-nums" : "normal",
              }}
            >
              {footer[i] || ""}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Class chip (Standard / Complex / Restricted) ── */
function ClassChip({ v }: { v: string }) {
  const map: Record<string, string> = {
    Standard:
      "bg-violet-600/10 text-violet-600",
    Complex: "bg-amber-500/10 text-amber-600",
    Restricted: "bg-red-500/10 text-red-600",
  };
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-[9px] font-semibold ${
        map[v] || map.Standard
      }`}
    >
      {v}
    </span>
  );
}

/* ── Stat boxes ── */
export function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex-1 rounded-md border p-3 ${
        highlight
          ? "border-violet-200 bg-violet-600/[0.06]"
          : "border-black/[0.08]"
      }`}
    >
      <div className="text-[9px] font-medium uppercase tracking-wider text-black/50">
        {label}
      </div>
      <div
        className={`mt-1 text-base font-bold tabular-nums ${
          highlight ? "text-violet-700" : ""
        }`}
      >
        {value}
      </div>
    </div>
  );
}

export function BigStat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-[10px] p-[18px] ${
        highlight ? "bg-violet-950 text-white" : "bg-stone-100 text-stone-900"
      }`}
    >
      <div
        className={`text-[9.5px] font-medium uppercase tracking-widest ${
          highlight ? "text-white/70" : "text-black/50"
        }`}
      >
        {label}
      </div>
      <div className="mt-2 text-[26px] font-bold tracking-tight tabular-nums">
        {value}
      </div>
    </div>
  );
}

/* ── SLA card ── */
export function SlaCard({
  label,
  tier,
}: {
  label: string;
  tier: { name: string; retainer: number; hours: number; p1: string; uptime: string; desc: string };
}) {
  return (
    <div className="rounded-lg p-4 text-white" style={{ background: "#1A0936" }}>
      <div className="text-[9px] font-medium uppercase tracking-widest text-white/60">
        {label}
      </div>
      <div className="mt-1 text-[15px] font-bold">{tier.name}</div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <KV k="Retainer" v={`$${tier.retainer.toLocaleString()}/mo`} />
        <KV k="Included hrs" v={`${tier.hours} hrs/mo`} />
        <KV k="P1 response" v={tier.p1} />
        <KV k="Uptime SLA" v={tier.uptime} />
      </div>
      <div className="mt-2.5 text-[9.5px] leading-relaxed text-white/70">
        {tier.desc}
      </div>
    </div>
  );
}

function KV({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="text-[8.5px] font-medium uppercase tracking-wider text-white/55">
        {k}
      </div>
      <div className="mt-0.5 text-[11px] font-semibold">{v}</div>
    </div>
  );
}

/* ── Signature block ── */
export function SigBlock({
  label,
  name,
}: {
  label: string;
  name: string;
}) {
  return (
    <div>
      <div className="text-[9px] font-medium uppercase tracking-widest text-black/50">
        {label}
      </div>
      <div className="mt-8 border-b border-black/[0.08] pb-1.5" />
      <div className="mt-1.5 text-[11px] font-semibold">{name}</div>
      <div className="text-[9.5px] text-black/50">Signature · Date</div>
    </div>
  );
}
