import type { ProposalState } from "../../types";
import type { DerivedCosts } from "../../hooks/useDerivedCosts";
import { ZEAM_DATA } from "../../data/cpq";
import { fmt$, fmt$2, fmtNum, fmtPct, tierRange } from "../../utils/format";
import {
  Page,
  HeaderBar,
  FooterBar,
  SectionTitle,
  SimpleTable,
  Stat,
  BigStat,
  SlaCard,
  SigBlock,
} from "./shared";

interface Props {
  state: ProposalState;
  costs: DerivedCosts;
}

export function ProposalDocument({ state, costs }: Props) {
  const {
    onceOffTotal,
    onceOffItems,
    baBundleLines,
    baBundleMonthly,
    infraTier,
    slaTierBA,
    slaTierINFRA,
    monthlyTotal,
    corridors,
  } = costs;

  const hdr = {
    clientName: state.clientName,
    clientLogo: state.clientLogo,
  };
  const ftr = {
    year: state.year,
    clientName: state.clientName,
    clientLogo: state.clientLogo,
  };

  const blendedRate = (b: { incl: number; fee: number; isPct?: boolean }) =>
    !b.isPct && b.incl && b.fee ? b.fee / b.incl : null;

  return (
    <div className="proposal-stack flex min-h-full flex-col gap-8 p-8">
      {/* ═══ PAGE 1: COVER ═══ */}
      <Page>
        {/* Purple hero */}
        <div
          className="relative flex flex-col px-12 pb-12 pt-9 text-white"
          style={{ background: "#1F0440" }}
        >
          {/* Top brand bar */}
          <div className="flex items-center justify-between text-[11px] text-white/85 tracking-wide">
            <span className="text-lg font-bold tracking-tight">ZEAM</span>
            <span>{state.year || "2026"}</span>
            <span>Pricing Proposal</span>
          </div>

          {/* Co-brand client */}
          <div className="mt-7 flex max-w-[460px] items-center gap-3.5 rounded-[10px] border border-white/15 bg-white/[0.07] px-4 py-3.5">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white">
              {state.clientLogo ? (
                <img
                  src={state.clientLogo}
                  alt=""
                  className="max-h-[88%] max-w-[88%] object-contain"
                />
              ) : (
                <span className="text-xl font-bold text-violet-900">
                  {(state.clientName || "?").slice(0, 1).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <div className="text-[9.5px] font-medium uppercase tracking-widest text-white/65">
                Prepared for
              </div>
              <div className="mt-0.5 text-[17px] font-bold tracking-tight">
                {state.clientName || "Client"}
              </div>
            </div>
          </div>

          {/* Headline */}
          <div className="mt-9 max-w-[620px]">
            <h1 className="m-0 text-[34px] font-bold leading-[1.08] tracking-tight">
              Transparent, fee-led,{" "}
              <span className="font-semibold italic text-violet-300">
                modular
              </span>{" "}
              pricing — built around the volume you actually move.
            </h1>
            <p className="mt-4 max-w-[540px] text-xs leading-relaxed text-white/80">
              {state.coverNote ||
                "Five clean schedules. One platform fee tiered against monthly TPV. Pay-in and pay-out fees priced by rail and corridor, SLAs and add-ons priced à la carte, so you only fund what you use."}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                "5 Schedules",
                state.includeINFRA ? "Tiered TPV" : "Bundle Tiers",
                "Pay-In / Pay-Out",
                "SLA Tiers",
                "Optional Add-Ons",
              ].map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-violet-400/45 bg-violet-400/12 px-3 py-1.5 text-[10.5px] font-medium tracking-wide text-violet-300"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col px-12 pb-6 pt-7">
          {/* TPV table */}
          <div className="keep-together">
            <h2 className="mb-3 text-[15px] font-bold">
              Platform fee — tiered against monthly TPV
            </h2>
            <SimpleTable
              cols={[
                { k: "mcf", label: "Min. Commitment Fee", flex: 1.2 },
                { k: "tpv", label: "Total Processing Volume — Monthly", flex: 2 },
                { k: "rate", label: "Platform Fee", flex: 1, num: true },
              ]}
              rows={ZEAM_DATA.tpvTiers.map((tier) => ({
                __selected: infraTier ? tier.mcf === infraTier.mcf : false,
                mcf: fmt$(tier.mcf),
                tpv: tierRange(tier.from, tier.to),
                rate: (tier.rate * 100).toFixed(2).replace(".", ",") + "%",
              }))}
            />
            <div
              className="mt-2 rounded border-l-[3px] border-l-violet-600 bg-violet-600/[0.04] px-3 py-2 text-[9px] leading-relaxed text-black/60"
            >
              <b>Commitment Terms.</b> The Minimum Commitment Fee is payable
              only where a specific Platform Tier is committed without achieving
              the corresponding TPV in the relevant month.
            </div>
          </div>

          {/* 5 schedules */}
          <div className="keep-together mt-5">
            <h2 className="mb-3.5 text-[15px] font-bold tracking-tight">
              Pricing in five schedules
            </h2>
            <div className="grid grid-cols-5 gap-2">
              {[
                { n: "Schedule 1", t: "Once-off, onboarding & configuration" },
                {
                  n: "Schedule 2",
                  t: state.includeINFRA
                    ? "Platform fee — tiered to monthly TPV"
                    : "Platform & bundle fees",
                },
                { n: "Schedule 3", t: "Connect fees — on/off-ramp" },
                { n: "Schedule 4", t: "Tiered SLA & support" },
                { n: "Schedule 5", t: "Optional add-ons & corridors" },
              ].map((c) => (
                <div
                  key={c.n}
                  className="flex min-h-[84px] flex-col rounded-md p-3 text-white"
                  style={{ background: "#1A0936" }}
                >
                  <div className="text-[11.5px] font-bold tracking-tight">
                    {c.n}
                  </div>
                  <div className="mt-1.5 text-[9px] leading-snug text-white/70">
                    {c.t}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <FooterBar {...ftr} />
      </Page>

      {/* ═══ PAGE 2: HOW IT WORKS ═══ */}
      <Page>
        <HeaderBar subtitle="How the pricing works" {...hdr} />
        <div className="flex-1 px-12 py-8">
          <SectionTitle num="—" title="How TPV is calculated & what's in each schedule" />
          <div className="grid grid-cols-2 gap-3.5">
            <div className="rounded-lg p-[18px] text-white" style={{ background: "#1A0936" }}>
              <div className="text-[13px] font-bold">How TPV is calculated</div>
              <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4 text-[10.5px] leading-relaxed text-white/80">
                <li><b>Volume, not count:</b> calculated on total transaction volume, not operation count.</li>
                <li><b>Counted once:</b> both pay-ins and pay-outs counted on the leg flowing through Zeam.</li>
                <li><b>Excluded:</b> internal book transfers between a client's own Zeam sub-accounts.</li>
                <li><b>Excluded:</b> failed, reversed, or rejected transactions are not counted.</li>
              </ul>
            </div>
            <div className="rounded-lg p-[18px] text-white" style={{ background: "#1A0936" }}>
              <div className="text-[13px] font-bold">What's covered in the other schedules</div>
              <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4 text-[10.5px] leading-relaxed text-white/80">
                <li>Schedule 1 — KYC, integration, sandbox, go-live (one-off)</li>
                <li>Schedule 2 — Pay-in and pay-out fees by rail and corridor</li>
                <li>Schedule 3 — Connect — on/off-ramp partner fees</li>
                <li>Schedule 4 — Tiered SLA — Standard, Priority, Mission-Critical</li>
                <li>Schedule 5 — Optional add-ons — custom reporting, white-label, etc.</li>
              </ul>
            </div>
          </div>
          <div className="mt-5 rounded-lg border border-black/[0.08] bg-violet-900/[0.05] px-4 py-3.5 text-[10.5px] leading-relaxed text-black/60">
            <b className="text-stone-900">
              Compliance model —{" "}
              {state.complianceModel === "A"
                ? "Model A (Zeam stack)"
                : state.complianceModel === "B"
                  ? "Model B (Partner-managed)"
                  : "Model C (Hybrid)"}
              .
            </b>{" "}
            {state.complianceModel === "A" && "Full compliance fees apply on the Zeam stack. Module fees billed in arrears as listed in Schedule 5."}
            {state.complianceModel === "B" && "Partner-managed compliance — variable fee reduced by 0.30–0.50%. Governance / oversight fee of $500–$2,000/mo retained."}
            {state.complianceModel === "C" && "Hybrid model — applied per corridor. See Addendum for corridor-level Model assignment."}
          </div>
        </div>
        <FooterBar {...ftr} />
      </Page>

      {/* ═══ PAGE 3: SERVICE ORDER §1 — Once-Off ═══ */}
      <Page>
        <HeaderBar subtitle="Service Order — Section 1" {...hdr} />
        <div className="flex-1 px-12 py-9">
          <div className="mb-7">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-violet-600">
              {state.productLine === "BOTH"
                ? "Business Account · Infrastructure / API"
                : state.productLine === "BA"
                  ? "Business Account"
                  : "Infrastructure / API"}
            </div>
            <h1 className="m-0 mt-1 text-[28px] font-bold leading-[1.1] tracking-tight">
              Service Order for {state.clientName || "____________"}
            </h1>
            <p className="mt-3 max-w-[600px] text-[11px] leading-relaxed text-black/60">
              This Service Order augments the services offered to the Client in
              terms of the Master Services Agreement and shall remain in force
              for the term thereof. Pricing below is exclusive of VAT.
            </p>
          </div>

          {/* Deal terms grid */}
          <div className="mb-7 grid grid-cols-4 overflow-hidden rounded-lg border border-black/[0.08]">
            {[
              ["SO Reference", state.soReference || `SO-${new Date().getFullYear()}-001`],
              ["MSA Reference", state.msaReference || "—"],
              ["Effective Date", state.effectiveDate || "—"],
              ["Quote Valid Until", state.quoteValidUntil || "—"],
              ["Contract Duration", `${state.contractDuration || "__"} months`],
              ["Notice Period", `${state.noticePeriod || "__"} months`],
              ["Payment Terms", state.paymentTerms || "Paid Monthly In Advance"],
              ["Currency", "USD (excl. VAT)"],
            ].map(([k, v], i) => (
              <div
                key={k}
                className={`px-3.5 py-3 text-[11px] ${i % 4 !== 3 ? "border-r border-black/[0.08]" : ""} ${i < 4 ? "border-b border-black/[0.08]" : ""}`}
              >
                <div className="text-[9px] font-medium uppercase tracking-wider text-black/50">
                  {k}
                </div>
                <div className="mt-1 font-medium">{v}</div>
              </div>
            ))}
          </div>

          <SectionTitle num="01" title="Once-off, onboarding & configuration" />
          <SimpleTable
            cols={[
              { k: "name", label: "Item", flex: 2.6 },
              { k: "fee", label: "Fee per Item", flex: 1, num: true },
              { k: "qty", label: "Qty", flex: 0.6, num: true },
              { k: "discount", label: "Disc.", flex: 0.6, num: true },
              { k: "total", label: "Total", flex: 1, num: true },
              { k: "mandatory", label: "Mandatory", flex: 0.9 },
            ]}
            rows={onceOffItems.map((i) => ({
              name: i.name,
              fee: fmt$2(i.fee),
              qty: i.qty,
              discount: (i.discount || 0) + "%",
              total: fmt$2(i.fee * i.qty * (1 - (i.discount || 0) / 100)),
              mandatory: i.mandatory ? "Yes" : "Optional",
              note: i.notes,
            }))}
            footer={[null, null, null, "Subtotal", fmt$2(onceOffTotal), null]}
          />
        </div>
        <FooterBar {...ftr} />
      </Page>

      {/* ═══ PAGE 4: SECTION 2 — Platform & Bundles ═══ */}
      <Page>
        <HeaderBar subtitle="Service Order — Section 2" {...hdr} />
        <div className="flex-1 px-12 py-9">
          <SectionTitle
            num="02"
            title={
              state.includeINFRA
                ? "Platform fee — tiered against monthly TPV"
                : "Platform & bundle fees"
            }
          />

          {state.includeINFRA && infraTier && (
            <>
              <div className="mb-4 flex gap-3">
                <Stat label="Expected TPV / month" value={fmt$(infraTier.tpv)} />
                <Stat label="Selected tier" value={`${fmt$(infraTier.mcf)} MCF`} highlight />
                <Stat label="Variable rate" value={fmtPct(infraTier.rate)} />
                <Stat label="Est. monthly variable" value={fmt$(infraTier.tpv * infraTier.rate)} />
              </div>
              <SimpleTable
                cols={[
                  { k: "mcf", label: "Min. Commitment Fee", flex: 1.2 },
                  { k: "tpv", label: "Total Processing Volume — Monthly", flex: 2 },
                  { k: "rate", label: "Platform Fee", flex: 1, num: true },
                ]}
                rows={ZEAM_DATA.tpvTiers.map((tier) => ({
                  __selected: tier.mcf === infraTier.mcf,
                  mcf: fmt$(tier.mcf),
                  tpv: tierRange(tier.from, tier.to),
                  rate: (tier.rate * 100).toFixed(2).replace(".", ",") + "%",
                }))}
              />
            </>
          )}

          {state.includeBA && baBundleLines.length > 0 && (
            <>
              <h3 className="mb-2.5 mt-6 text-[13px] font-bold">
                Selected bundles
              </h3>
              <SimpleTable
                cols={[
                  { k: "name", label: "Bundle", flex: 2 },
                  { k: "incl", label: "Included", flex: 0.9, num: true },
                  { k: "fee", label: "Monthly Fee", flex: 1, num: true },
                  { k: "oob", label: "OOB Rate", flex: 0.9, num: true },
                  { k: "blended", label: "Blended", flex: 0.8, num: true },
                  { k: "due", label: "Due", flex: 0.6 },
                ]}
                rows={baBundleLines.map((b) => {
                  const bl = blendedRate(b);
                  return {
                    name: b.name,
                    incl: b.incl ? (b.isPct ? fmt$(b.incl) : fmtNum(b.incl)) : "—",
                    fee: b.fee ? fmt$(b.fee) : "—",
                    oob: b.isPct ? fmtPct(b.oob, 2) : fmt$2(b.oob),
                    blended: b.isPct ? "—" : bl ? fmt$2(bl) : "—",
                    due: b.due,
                    note: b.notes,
                  };
                })}
                footer={[null, "Subtotal", `${fmt$(baBundleMonthly)}/mo`, null, null, null]}
              />
            </>
          )}

          <div className="mt-4 rounded border-l-[3px] border-l-violet-600 bg-violet-600/[0.05] px-3 py-2.5 text-[10px] leading-relaxed text-black/60">
            ⚠ Out-of-bundle (OOB) transactions are charged monthly in arrears.
            OOB rates already include the corridor variable fee floor.
          </div>
        </div>
        <FooterBar {...ftr} />
      </Page>

      {/* ═══ PAGE 5: SECTIONS 3 & 4 — SLA + Compliance ═══ */}
      <Page>
        <HeaderBar subtitle="Service Order — Sections 3 & 4" {...hdr} />
        <div className="flex-1 px-12 py-9">
          <SectionTitle num="03" title="Support / SLA" />

          {(slaTierBA || slaTierINFRA) && (
            <div
              className={`mb-4 grid gap-3 ${slaTierBA && slaTierINFRA ? "grid-cols-2" : "grid-cols-1"}`}
            >
              {slaTierBA && <SlaCard label="Business Account" tier={slaTierBA} />}
              {slaTierINFRA && <SlaCard label="Infrastructure / API" tier={slaTierINFRA} />}
            </div>
          )}

          <h4 className="mb-2 mt-2 text-[11px] font-semibold uppercase tracking-wider text-black/60">
            Full SLA tier matrix
          </h4>
          <SimpleTable
            cols={[
              { k: "a", label: "Attribute", flex: 1.4 },
              { k: "std", label: "Standard", flex: 1 },
              { k: "pri", label: "Priority", flex: 1 },
              { k: "mc", label: "Mission-Critical", flex: 1 },
            ]}
            rows={[
              { a: "Monthly retainer", std: "$750", pri: "$2,500 / $4,500", mc: "$8,500 / $17,500" },
              { a: "Included support hours", std: "0 hrs", pri: "10–20 hrs", mc: "20 hrs" },
              { a: "Uptime SLA", std: "99.0%", pri: "99.5%", mc: "99.9%" },
              { a: "P1 response", std: "4 business hrs", pri: "1 hr (any time)", mc: "15 min (any time)" },
              { a: "Coverage", std: "Mon–Fri, 08–17h", pri: "7 days, 07–22h", mc: "24/7/365" },
              { a: "Channels", std: "Ticket + email", pri: "+ Chat", mc: "+ Phone + escalation" },
              { a: "Named contact", std: "No", pri: "Named contact", mc: "Dedicated TAM" },
            ]}
          />

          <div className="mt-5" />
          <SectionTitle num="04" title="Compliance modules — usage-based" />
          <SimpleTable
            cols={[
              { k: "name", label: "Service", flex: 2 },
              { k: "fee", label: "Fee per Event", flex: 1, num: true },
              { k: "notes", label: "Notes", flex: 2.6 },
            ]}
            rows={ZEAM_DATA.compliance.map((c) => ({
              name: c.name,
              fee: c.fee,
              notes: c.notes,
            }))}
          />
        </div>
        <FooterBar {...ftr} />
      </Page>

      {/* ═══ PAGE 6: SECTION 5 — Corridors Addendum ═══ */}
      <Page>
        <HeaderBar subtitle="Addendum — Per-Corridor Processing Rates" {...hdr} />
        <div className="flex-1 px-12 py-9">
          <SectionTitle
            num="05"
            title={`Addendum — ${state.region === "ALL" ? "all regions" : state.region} corridors`}
          />
          <p className="mb-4 max-w-[640px] text-[10.5px] leading-relaxed text-black/60">
            This Addendum forms part of the Service Order. Rates are additive to
            the bundle OOB rate.{" "}
            <b>
              Retail Corridor Rate = OOB rate (from bundle) + Base Variable Rate
              + [Complex Uplift if applicable] + Applicable Fixed Fee.
            </b>
          </p>
          <SimpleTable
            small
            cols={[
              { k: "country", label: "Country", flex: 1.2 },
              { k: "method", label: "Method", flex: 1.7 },
              { k: "currency", label: "Cur.", flex: 0.5 },
              { k: "cls", label: "Class", flex: 0.7 },
              { k: "variable", label: "Variable", flex: 0.7, num: true },
              { k: "fixed", label: "Fixed", flex: 0.6, num: true },
              { k: "spread", label: "FX Spread", flex: 0.7, num: true },
              { k: "retail", label: "Indicative Retail", flex: 1, num: true },
            ]}
            rows={corridors as unknown as Record<string, unknown>[]}
          />
          <div className="mt-3.5 rounded-md bg-violet-600/[0.05] px-3.5 py-3 text-[9.5px] leading-relaxed text-black/60">
            <b>Key.</b>{" "}
            <span className="text-violet-600">Standard</span> — no uplift.{" "}
            <span className="text-amber-600">Complex</span> — apply complex uplift from SO.{" "}
            <span className="text-red-600">Restricted</span> — quote-only, not on standard rate card.
          </div>
        </div>
        <FooterBar {...ftr} />
      </Page>

      {/* ═══ PAGE 7: COMMERCIAL SUMMARY ═══ */}
      <Page>
        <HeaderBar subtitle="Commercial Summary" {...hdr} />
        <div className="flex-1 px-12 py-9">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-violet-600">
            Commercial summary
          </div>
          <h1 className="m-0 mt-1 text-[28px] font-bold leading-[1.1] tracking-tight">
            Estimated commitment
          </h1>
          <p className="mt-2.5 max-w-[600px] text-[11px] leading-relaxed text-black/60">
            Based on the choices above. Variable processing fees are estimated at
            expected monthly volume; out-of-bundle transactions and corridor-level
            fees are charged in arrears.
          </p>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <BigStat label="One-off (on signature)" value={fmt$(onceOffTotal)} />
            <BigStat label="Fixed monthly (advance)" value={fmt$(monthlyTotal)} highlight />
            <BigStat label="Estimated annual" value={fmt$(monthlyTotal * 12 + onceOffTotal)} />
          </div>

          <h3 className="mb-2.5 mt-7 text-[13px] font-bold">Breakdown</h3>
          <SimpleTable
            cols={[
              { k: "item", label: "Line", flex: 2.2 },
              { k: "cadence", label: "Cadence", flex: 0.9 },
              { k: "amount", label: "Amount", flex: 1, num: true },
            ]}
            rows={[
              ...(onceOffTotal > 0
                ? [{ item: "Section 1 — Once-off, onboarding & configuration", cadence: "On signature", amount: fmt$(onceOffTotal) }]
                : []),
              ...(infraTier
                ? [{ item: `Section 2 — Infrastructure platform fee (Tier ${fmt$(infraTier.mcf)} / ${fmtPct(infraTier.rate)})`, cadence: "Monthly · ADV", amount: `${fmt$(infraTier.mcf)} MCF` }]
                : []),
              ...(baBundleMonthly > 0
                ? [{ item: "Section 2 — Business Account bundles", cadence: "Monthly · ADV", amount: fmt$(baBundleMonthly) }]
                : []),
              ...(slaTierBA
                ? [{ item: `Section 3 — SLA (BA · ${slaTierBA.name})`, cadence: "Monthly · ADV", amount: fmt$(slaTierBA.retainer) }]
                : []),
              ...(slaTierINFRA
                ? [{ item: `Section 3 — SLA (Infra · ${slaTierINFRA.name})`, cadence: "Monthly · ADV", amount: fmt$(slaTierINFRA.retainer) }]
                : []),
              { item: "Section 4 — Compliance modules", cadence: "Monthly · ARR", amount: "Usage-based" },
              { item: "Section 5 — Corridor processing fees", cadence: "Per-txn · ARR", amount: "See Addendum" },
            ]}
          />

          {/* Signature block */}
          <div className="mt-8 grid grid-cols-2 gap-6">
            <SigBlock label="For Zeam" name="Zeam Authorised Signatory" />
            <SigBlock
              label={`For ${state.clientName || "Client"}`}
              name={state.clientContact || "Authorised Signatory"}
            />
          </div>
        </div>
        <FooterBar {...ftr} />
      </Page>
    </div>
  );
}
