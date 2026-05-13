import type { ProposalState, BundleCategory } from "../../types";
import type { DerivedCosts } from "../../hooks/useDerivedCosts";
import { ZEAM_DATA, REGIONS } from "../../data/cpq";
import { Section } from "./Section";
import { CostSummary } from "./CostSummary";
import {
  Field,
  Row,
  Text,
  Num,
  TextArea,
  Select,
  Segmented,
  Toggle,
  LogoUploader,
} from "./Primitives";

interface BuilderFormProps {
  state: ProposalState;
  costs: DerivedCosts;
  set: <K extends keyof ProposalState>(key: K, value: ProposalState[K]) => void;
  setProductLine: (pl: ProposalState["productLine"]) => void;
  setOnceOffItem: (idx: number, key: keyof import("../../types").OnceOffStateItem, value: number) => void;
  setBundle: (cat: BundleCategory, code: string) => void;
}

export function BuilderForm({
  state,
  costs,
  set,
  setProductLine,
  setOnceOffItem,
  setBundle,
}: BuilderFormProps) {
  return (
    <div className="flex flex-col gap-3 p-4 pb-8">
      <CostSummary costs={costs} />

      <Section num="01" title="Client & deal">
        <Field label="Client logo">
          <LogoUploader
            value={state.clientLogo}
            onChange={(v) => set("clientLogo", v)}
            clientName={state.clientName}
          />
        </Field>
        <Field label="Client name">
          <Text value={state.clientName} onChange={(v) => set("clientName", v)} />
        </Field>
        <Row>
          <Field label="Authorised contact">
            <Text
              value={state.clientContact}
              onChange={(v) => set("clientContact", v)}
              placeholder="Jane Doe, CFO"
            />
          </Field>
          <Field label="Sales rep">
            <Text
              value={state.salesRep}
              onChange={(v) => set("salesRep", v)}
              placeholder="—"
            />
          </Field>
        </Row>
        <Row>
          <Field label="SO Reference">
            <Text value={state.soReference} onChange={(v) => set("soReference", v)} />
          </Field>
          <Field label="MSA Reference">
            <Text
              value={state.msaReference}
              onChange={(v) => set("msaReference", v)}
              placeholder="MSA-2025-..."
            />
          </Field>
        </Row>
        <Row>
          <Field label="Effective date">
            <Text
              value={state.effectiveDate}
              onChange={(v) => set("effectiveDate", v)}
              placeholder="01 Jun 2026"
            />
          </Field>
          <Field label="Quote valid until">
            <Text
              value={state.quoteValidUntil}
              onChange={(v) => set("quoteValidUntil", v)}
              placeholder="31 Aug 2026"
            />
          </Field>
        </Row>
        <Row>
          <Field label="Duration (months)">
            <Num value={state.contractDuration} onChange={(v) => set("contractDuration", v)} />
          </Field>
          <Field label="Notice (months)">
            <Num value={state.noticePeriod} onChange={(v) => set("noticePeriod", v)} />
          </Field>
          <Field label="Year">
            <Text value={state.year} onChange={(v) => set("year", v)} />
          </Field>
        </Row>
        <Field label="Cover note">
          <TextArea
            value={state.coverNote}
            onChange={(v) => set("coverNote", v)}
            placeholder="Optional intro paragraph for the cover page…"
          />
        </Field>
      </Section>

      <Section num="02" title="Service order">
        <Field label="Product line">
          <Segmented
            value={state.productLine}
            onChange={(v) => setProductLine(v as ProposalState["productLine"])}
            options={[
              { value: "BA", label: "Business Account" },
              { value: "INFRA", label: "Infrastructure / API" },
              { value: "BOTH", label: "Both" },
            ]}
          />
        </Field>
        <Field label="Compliance model">
          <Segmented
            value={state.complianceModel}
            onChange={(v) => set("complianceModel", v as ProposalState["complianceModel"])}
            options={[
              { value: "A", label: "A · Zeam stack" },
              { value: "B", label: "B · Partner-managed" },
              { value: "C", label: "C · Hybrid" },
            ]}
          />
        </Field>
      </Section>

      <Section num="03" title="Once-off charges">
        <div className="flex flex-col gap-1.5">
          {state.onceOffItems.map((it, i) => (
            <div
              key={`${it.id}-${i}`}
              className={`rounded-xl border p-3 transition-all ${
                it.qty > 0
                  ? "border-stone-200 bg-white shadow-sm shadow-stone-900/[0.02]"
                  : "border-stone-100 bg-stone-50/60"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-semibold text-stone-800 leading-tight">
                      {it.name}
                    </span>
                    {it.qty > 0 && (
                      <span className="rounded-md bg-violet-50 px-1.5 py-0.5 text-[9px] font-bold tabular-nums text-violet-600">
                        ${it.fee.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 text-[10px] text-stone-400">
                    {it._lineLabel}
                  </div>
                </div>
                <Toggle
                  on={it.qty > 0}
                  onChange={(v) => setOnceOffItem(i, "qty", v ? 1 : 0)}
                />
              </div>
              {it.qty > 0 && (
                <div className="mt-2.5 flex items-end gap-2 border-t border-stone-100 pt-2.5">
                  <Num value={it.qty} onChange={(v) => setOnceOffItem(i, "qty", v)} small label="Qty" />
                  <Num value={it.discount || 0} onChange={(v) => setOnceOffItem(i, "discount", v)} small label="Disc %" />
                  <div className="flex flex-1 items-center justify-end pb-0.5 pr-1 text-[13px] font-semibold tabular-nums text-stone-700">
                    ${(it.fee * it.qty * (1 - (it.discount || 0) / 100)).toLocaleString()}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {state.includeINFRA && (
        <Section num="04" title="Platform fee — TPV tier (Infra)">
          <Field label="Expected monthly TPV (USD)">
            <Num value={state.expectedTPV} onChange={(v) => set("expectedTPV", v)} step={100000} />
          </Field>
          <div className="flex flex-col gap-1">
            {ZEAM_DATA.tpvTiers.map((tier, i) => {
              const tpv = Number(state.expectedTPV) || 0;
              const sel = tpv >= tier.from && tpv <= tier.to;
              return (
                <div
                  key={i}
                  className={`flex items-center justify-between rounded-lg border px-3 py-2.5 text-xs transition-all ${
                    sel
                      ? "border-violet-300 bg-violet-50 ring-1 ring-violet-400/30 font-semibold text-violet-900"
                      : "border-stone-100 bg-white text-stone-600 hover:border-stone-200"
                  }`}
                >
                  <div>
                    <span className="font-semibold text-stone-800">
                      ${tier.mcf.toLocaleString()}
                    </span>{" "}
                    <span className="text-stone-400">MCF</span>
                    <span className="ml-2 text-[10px] text-stone-400">
                      {tier.to === Infinity
                        ? `> $${(tier.from - 1).toLocaleString()}`
                        : `$${tier.from.toLocaleString()} – $${tier.to.toLocaleString()}`}
                    </span>
                  </div>
                  <span className={`font-bold tabular-nums ${sel ? "text-violet-700" : "text-stone-500"}`}>
                    {(tier.rate * 100).toFixed(2)}%
                  </span>
                </div>
              );
            })}
          </div>
        </Section>
      )}

      {state.includeBA && (
        <Section num="05" title="Bundles (Business Account)">
          {([
            { key: "payout" as BundleCategory, label: "Single payouts" },
            { key: "collections" as BundleCategory, label: "Collections / pay-in" },
            { key: "bulk" as BundleCategory, label: "Bulk payouts" },
            { key: "fx" as BundleCategory, label: "FX / asset conversion" },
          ] as const).map((g) => (
            <Field key={g.key} label={g.label}>
              <Select
                value={state.bundles[g.key] || ""}
                onChange={(v) => setBundle(g.key, v)}
                options={[
                  { value: "", label: "— None —" },
                  ...ZEAM_DATA.bundles[g.key].map((b) => ({
                    value: b.code,
                    label: `${b.name} · ${b.fee ? "$" + b.fee.toLocaleString() + "/mo" : "PAYG"}`,
                  })),
                ]}
              />
            </Field>
          ))}
        </Section>
      )}

      <Section num="06" title="SLA / Support">
        {state.includeBA && (
          <Field label="BA support tier">
            <Segmented
              value={state.slaBA}
              onChange={(v) => set("slaBA", v)}
              options={ZEAM_DATA.slaTiers.BA.map((t) => ({
                value: t.id,
                label: `${t.name} · $${t.retainer}`,
              }))}
            />
          </Field>
        )}
        {state.includeINFRA && (
          <Field label="Infra support tier">
            <Segmented
              value={state.slaINFRA}
              onChange={(v) => set("slaINFRA", v)}
              options={ZEAM_DATA.slaTiers.INFRA.map((t) => ({
                value: t.id,
                label: `${t.name} · $${t.retainer}`,
              }))}
            />
          </Field>
        )}
      </Section>

      <Section num="07" title="Corridor scope" defaultOpen={false}>
        <Field label="Region">
          <Segmented
            value={state.region}
            onChange={(v) => set("region", v)}
            options={REGIONS.map((r) => ({
              value: r,
              label: r === "ALL" ? "All" : r,
            }))}
          />
        </Field>
        <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
          </svg>
          <span>{costs.corridors.length} corridors in the Addendum</span>
        </div>
      </Section>
    </div>
  );
}
