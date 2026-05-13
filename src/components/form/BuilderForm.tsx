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
    <div className="flex flex-col gap-3 p-4">
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
            <Num
              value={state.contractDuration}
              onChange={(v) => set("contractDuration", v)}
            />
          </Field>
          <Field label="Notice (months)">
            <Num
              value={state.noticePeriod}
              onChange={(v) => set("noticePeriod", v)}
            />
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
              className={`rounded-lg border p-2.5 transition ${
                it.qty > 0
                  ? "border-stone-200 bg-white"
                  : "border-stone-100 bg-stone-50"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-stone-800">
                    {it.name}
                  </div>
                  <div className="mt-0.5 text-[10px] text-stone-500">
                    {it._lineLabel}
                  </div>
                </div>
                <Toggle
                  on={it.qty > 0}
                  onChange={(v) => setOnceOffItem(i, "qty", v ? 1 : 0)}
                />
              </div>
              {it.qty > 0 && (
                <div className="mt-2 flex items-end gap-2">
                  <Num
                    value={it.qty}
                    onChange={(v) => setOnceOffItem(i, "qty", v)}
                    small
                    label="Qty"
                  />
                  <Num
                    value={it.discount || 0}
                    onChange={(v) => setOnceOffItem(i, "discount", v)}
                    small
                    label="Disc %"
                  />
                  <div className="flex flex-1 items-center justify-end pb-1 pr-1 text-xs font-medium tabular-nums text-stone-500">
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
            <Num
              value={state.expectedTPV}
              onChange={(v) => set("expectedTPV", v)}
              step={100000}
            />
          </Field>
          <div className="flex flex-col gap-1">
            {ZEAM_DATA.tpvTiers.map((tier, i) => {
              const tpv = Number(state.expectedTPV) || 0;
              const sel = tpv >= tier.from && tpv <= tier.to;
              return (
                <div
                  key={i}
                  className={`flex items-center justify-between rounded-md border px-3 py-2 text-xs transition ${
                    sel
                      ? "border-violet-400 bg-violet-50 font-semibold text-violet-900"
                      : "border-stone-100 bg-white text-stone-700"
                  }`}
                >
                  <div>
                    <span className="font-semibold">
                      ${tier.mcf.toLocaleString()}
                    </span>{" "}
                    MCF
                    <span className="ml-2 text-stone-400">
                      {tier.to === Infinity
                        ? `> $${(tier.from - 1).toLocaleString()}`
                        : `$${tier.from.toLocaleString()} – $${tier.to.toLocaleString()}`}
                    </span>
                  </div>
                  <span className="font-semibold tabular-nums">
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
          {(
            [
              { key: "payout" as BundleCategory, label: "Single payouts" },
              { key: "collections" as BundleCategory, label: "Collections / pay-in" },
              { key: "bulk" as BundleCategory, label: "Bulk payouts" },
              { key: "fx" as BundleCategory, label: "FX / asset conversion" },
            ] as const
          ).map((g) => (
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
        <div className="text-[11px] text-stone-500">
          {costs.corridors.length} corridors will appear in the Addendum.
        </div>
      </Section>
    </div>
  );
}
