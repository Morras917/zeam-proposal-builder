# Zeam Proposal Builder

A CPQ (Configure-Price-Quote) proposal builder for Zeam's cross-border payments platform. Build, preview, and export multi-page pricing proposals as polished A4 PDFs — entirely in the browser.

**Live:** [zeam-proposal-builder.vercel.app](https://zeam-proposal-builder.vercel.app)

## Features

- **Split-pane builder** — Form on the left, live 7-page A4 proposal preview on the right
- **Save as PDF** — Client-side PDF generation at 2× resolution; no server round-trip
- **Auto-save** — Proposal state persists to `localStorage` across browser sessions
- **Live cost summary** — Sticky panel showing once-off, monthly, and annual totals in real time
- **Full CPQ data model** — BA bundles, INFRA TPV tiers, SLA tiers, compliance modules, 33 corridor rates
- **JSON export/import** — Download the proposal config as JSON for archiving or sharing
- **Print-ready** — Clean `@media print` styles with proper A4 page breaks
- **Dynamic browser title** — Tab title updates to reflect the client name

## Tech Stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS v4** — Utility-first styling, no inline styles
- **html2canvas-pro** + **jsPDF** — Client-side PDF generation (lazy-loaded)
- **Vitest** — 62 unit tests covering all calculation logic

## Getting Started

```bash
npm install
npm run dev        # → http://localhost:5173
```

## Scripts

| Command          | Description                          |
| ---------------- | ------------------------------------ |
| `npm run dev`    | Start Vite dev server with HMR       |
| `npm run build`  | Type-check + production build         |
| `npm run preview`| Preview the production build locally  |
| `npm test`       | Run all tests once                    |
| `npm run test:watch` | Run tests in watch mode           |

## Save as PDF

Clicking **Save PDF** in the toolbar:

1. Lazy-loads `html2canvas-pro` + `jsPDF` (~620 KB, only on first use)
2. Captures each `.proposal-page` DOM element at 2× resolution (1588×2246 px)
3. Maps each canvas to A4 dimensions (210×297 mm) preserving the exact aspect ratio
4. Assembles a multi-page PDF and triggers a download

The PDF libraries are code-split into separate chunks and never loaded during initial page render, keeping the main bundle at ~200 KB gzipped.

### Output Quality

Each proposal page is rendered at exactly 794×1123 CSS pixels, matching A4 at 96 DPI. The `html2canvas` `scale: 2` option produces canvases at 1588×2246 pixels (effectively 192 DPI), resulting in crisp text and sharp table lines in the final PDF. Colours, backgrounds, and border-radius values are captured faithfully since the entire page is a white-background DOM element positioned outside any dark container during capture.

## Proposal Structure

The generated proposal contains 7 pages:

1. **Cover** — Client co-branding, headline, TPV tier table, 5-schedule overview
2. **How It Works** — TPV calculation rules, schedule descriptions, compliance model
3. **Section 1** — Deal terms grid, once-off onboarding & configuration charges
4. **Section 2** — INFRA platform fee tiers and/or BA bundle selections
5. **Sections 3 & 4** — SLA tier cards, full SLA matrix, compliance module pricing
6. **Section 5** — Per-corridor processing rates addendum (filtered by region)
7. **Commercial Summary** — Totals, breakdown table, signature blocks

## Project Structure

```
src/
├── App.tsx                          # Shell: toolbar + split layout
├── main.tsx                         # Entry point
├── index.css                        # Tailwind import + custom scrollbar/animations
├── types.ts                         # Shared TypeScript types
├── data/
│   └── cpq.ts                       # ZEAM_DATA — all CPQ pricing data
├── utils/
│   ├── format.ts                    # fmt$, fmtPct, fmtNum, tierRange
│   ├── format.test.ts               # 13 tests
│   └── savePdf.ts                   # Client-side PDF generation (lazy)
├── hooks/
│   ├── useProposalState.ts          # State + localStorage persistence
│   ├── useProposalState.test.ts     # 20 tests
│   ├── useDerivedCosts.ts           # Computed totals, tier selection, filtering
│   └── useDerivedCosts.test.ts      # 29 tests
└── components/
    ├── form/
    │   ├── BuilderForm.tsx          # All form sections composed
    │   ├── Section.tsx              # Collapsible accordion with CSS animation
    │   ├── CostSummary.tsx          # Sticky live cost bar
    │   └── Primitives.tsx           # Field, Text, Num, Select, Segmented, Toggle, LogoUploader
    └── proposal/
        ├── ProposalDocument.tsx      # All 7 A4 pages composed
        └── shared/
            └── index.tsx            # Page, HeaderBar, FooterBar, SimpleTable, Stat, SlaCard, SigBlock
```

## Testing

```bash
npm test
```

62 tests across 3 suites:

- **`format.test.ts`** — Currency formatting, percentage conversion, tier range labels
- **`useDerivedCosts.test.ts`** — Once-off totals with discounts, bundle resolution, TPV tier selection at every boundary, SLA lookups, monthly/annual computation, corridor filtering by region
- **`useProposalState.test.ts`** — `buildOnceOff` helper, default state shape, `setProductLine` sync, item mutations, bundle updates, reset with localStorage clear

## Deployment

Deployed on Vercel with zero configuration (auto-detected Vite project):

```bash
vercel --prod
```

## License

Private — Zeam internal tooling.
