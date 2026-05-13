export const fmt$ = (n: number, frac = 0) =>
  "$" +
  Number(n || 0).toLocaleString("en-US", {
    minimumFractionDigits: frac,
    maximumFractionDigits: frac,
  });

export const fmt$2 = (n: number) => fmt$(n, 2);

export const fmtNum = (n: number) => Number(n || 0).toLocaleString("en-US");

export const fmtPct = (n: number, dp = 2) =>
  (Number(n || 0) * 100)
    .toFixed(dp)
    .replace(/\.?0+$/, "") + "%";

export const tierRange = (from: number, to: number) =>
  to === Infinity
    ? `Above ${fmt$(from - 1)}`
    : from === 0
      ? `Up to ${fmt$(to)}`
      : `${fmt$(from)} – ${fmt$(to)}`;
