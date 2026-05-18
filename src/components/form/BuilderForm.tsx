import type { ProposalState, BundleCategory } from "../../types";
import type { DerivedCosts } from "../../hooks/useDerivedCosts";
import { ZEAM_DATA } from "../../data/cpq";
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
        <Field label="Include SLA">
          <Toggle
            on={state.includeSLA}
            onChange={(v) => set("includeSLA", v)}
          />
        </Field>
        {state.includeSLA && state.includeBA && (
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
        {state.includeSLA && state.includeINFRA && (
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

      <Section num="07" title="Reliance model (JR)" defaultOpen={false}>
        <div className="rounded-xl border border-amber-200 bg-amber-50/60 px-3.5 py-3 text-[10.5px] leading-relaxed text-amber-800">
          <b>Applicable to unlicensed entities</b> — enables the client to operate under Zeam's FSCA licence
          and FIC registration on a month-to-month basis until the client acquires its own CASP.
        </div>
        <Field label="Include reliance model">
          <Toggle
            on={state.includeReliance}
            onChange={(v) => set("includeReliance", v)}
          />
        </Field>
        {state.includeReliance && (
          <>
            <Field label="Compliance approach">
              <Segmented
                value={state.relianceSelfManaged ? "self" : "zeam"}
                onChange={(v) => set("relianceSelfManaged", v === "self")}
                options={[
                  { value: "zeam", label: "Zeam compliance module" },
                  { value: "self", label: "Self-managed (+$1,500/qtr cert)" },
                ]}
              />
            </Field>
            <Field label="Discount on retainer (%)">
              <Num
                value={state.relianceDiscount || 0}
                onChange={(v) => set("relianceDiscount", Math.min(100, Math.max(0, v)))}
                step={5}
              />
            </Field>
            <div className="rounded-xl border border-stone-200 bg-white p-3 text-[11px]">
              <div className="flex items-center justify-between border-b border-stone-100 pb-2 mb-2">
                <span className="text-stone-500">Regulatory Liability Absorption fee</span>
                <div className="text-right">
                  {(state.relianceDiscount || 0) > 0 && (
                    <span className="mr-1.5 text-[10px] text-stone-400 line-through tabular-nums">$3,000</span>
                  )}
                  <span className="font-semibold tabular-nums">
                    ${(3000 * (1 - (state.relianceDiscount || 0) / 100)).toLocaleString("en-US", { maximumFractionDigits: 0 })}/mo
                  </span>
                  {(state.relianceDiscount || 0) > 0 && (
                    <span className="ml-1.5 rounded-md bg-green-50 px-1 py-0.5 text-[9px] font-bold text-green-600">
                      -{state.relianceDiscount}%
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between border-b border-stone-100 pb-2 mb-2">
                <span className="text-stone-500">Processing fee (0.15% × TPV est.)</span>
                <span className="font-semibold tabular-nums">
                  ${((Number(state.expectedTPV) || 0) * 0.0015).toLocaleString("en-US", { maximumFractionDigits: 0 })}/mo
                </span>
              </div>
              {state.relianceSelfManaged && (
                <div className="flex items-center justify-between border-b border-stone-100 pb-2 mb-2">
                  <span className="text-stone-500">Compliance Cert &amp; Partner Review</span>
                  <span className="font-semibold tabular-nums">$1,500/qtr</span>
                </div>
              )}
              <div className="flex items-center justify-between pt-1 text-[12px] font-bold">
                <span>Est. monthly cost</span>
                <span className="text-violet-700 tabular-nums">
                  ${(3000 * (1 - (state.relianceDiscount || 0) / 100) + (Number(state.expectedTPV) || 0) * 0.0015 + (state.relianceSelfManaged ? 500 : 0)).toLocaleString("en-US", { maximumFractionDigits: 0 })}/mo
                </span>
              </div>
            </div>
          </>
        )}
      </Section>

      <Section num="08" title="Corridor rates" defaultOpen={false}>
        <div className="rounded-xl border border-sky-200 bg-sky-50/60 px-3.5 py-3 text-[10.5px] leading-relaxed text-sky-800">
          Corridor rates are published on the Zeam website and are not printed in the proposal.
          The proposal will reference the URL below.
        </div>
        <Field label="Corridor rates URL">
          <Text
            value={state.corridorUrl}
            onChange={(v) => set("corridorUrl", v)}
            placeholder="https://zeam.io/corridors"
          />
        </Field>
      </Section>
    </div>
  );
}
