import { useState, useEffect, useCallback } from "react";
import type { ProposalState, OnceOffStateItem } from "../types";
import { ZEAM_DATA } from "../data/cpq";

const STORAGE_KEY = "zeam_proposal_v3";

export function buildOnceOff(includeBA: boolean, includeINFRA: boolean): OnceOffStateItem[] {
  const items: OnceOffStateItem[] = [];
  if (includeBA) {
    for (const it of ZEAM_DATA.onceOff.BA) {
      items.push({
        ...it,
        discount: 0,
        _lineLabel: `Business Account · ${it.mandatory ? "Mandatory" : "Optional"}`,
      });
    }
  }
  if (includeINFRA) {
    for (const it of ZEAM_DATA.onceOff.INFRA) {
      items.push({
        ...it,
        discount: 0,
        _lineLabel: `Infrastructure · ${it.mandatory ? "Mandatory" : "Optional"}`,
      });
    }
  }
  return items;
}

export function defaultState(): ProposalState {
  return {
    clientName: "African Bank",
    clientContact: "",
    clientLogo: "",
    year: String(new Date().getFullYear()),
    coverNote: "",
    salesRep: "",

    productLine: "BOTH",
    includeBA: true,
    includeINFRA: true,
    soReference: `SO-${new Date().getFullYear()}-001`,
    msaReference: "",
    effectiveDate: "",
    quoteValidUntil: "",
    contractDuration: 24,
    noticePeriod: 12,
    paymentTerms: "Paid Monthly In Advance",

    onceOffItems: buildOnceOff(true, true),

    bundles: { payout: "PAY-5K", collections: "COL-500", bulk: "", fx: "" },

    expectedTPV: 3_500_000,

    includeSLA: true,
    slaBA: "pri",
    slaINFRA: "mc",

    complianceModel: "A",

    region: "Africa",

    includeReliance: false,
    relianceSelfManaged: false,
    relianceDiscount: 0,

    corridorUrl: "https://zeam.io/corridors",
  };
}

function loadState(): ProposalState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Re-derive once-off from persisted productLine flags
      return {
        ...defaultState(),
        ...parsed,
        onceOffItems: buildOnceOff(parsed.includeBA ?? true, parsed.includeINFRA ?? true),
      };
    }
  } catch {
    // Ignore parse errors
  }
  return defaultState();
}

export function useProposalState() {
  const [state, setState] = useState<ProposalState>(loadState);

  // Persist to localStorage on every change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        // Don't persist clientLogo (data URL can be huge)
        const { clientLogo, ...rest } = state;
        void clientLogo;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
      } catch {
        // Storage full — ignore
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [state]);

  // Sync productLine -> includeBA/INFRA + onceOffItems
  const setProductLine = useCallback((pl: ProposalState["productLine"]) => {
    setState((s) => {
      const includeBA = pl === "BA" || pl === "BOTH";
      const includeINFRA = pl === "INFRA" || pl === "BOTH";
      return {
        ...s,
        productLine: pl,
        includeBA,
        includeINFRA,
        onceOffItems: buildOnceOff(includeBA, includeINFRA),
      };
    });
  }, []);

  const set = useCallback(
    <K extends keyof ProposalState>(key: K, value: ProposalState[K]) => {
      setState((s) => ({ ...s, [key]: value }));
    },
    [],
  );

  const setOnceOffItem = useCallback(
    (idx: number, key: keyof OnceOffStateItem, value: number) => {
      setState((s) => ({
        ...s,
        onceOffItems: s.onceOffItems.map((it, i) =>
          i === idx ? { ...it, [key]: value } : it,
        ),
      }));
    },
    [],
  );

  const setBundle = useCallback(
    (cat: keyof ProposalState["bundles"], code: string) => {
      setState((s) => ({
        ...s,
        bundles: { ...s.bundles, [cat]: code },
      }));
    },
    [],
  );

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState(defaultState());
  }, []);

  return { state, set, setProductLine, setOnceOffItem, setBundle, reset, setState };
}
