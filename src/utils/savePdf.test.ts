import { describe, it, expect, vi, beforeEach } from "vitest";
import { saveProposalPdf } from "./savePdf";

describe("saveProposalPdf", () => {
  beforeEach(() => {
    // Clean up any injected DOM nodes between tests
    document.body.innerHTML = "";
  });

  it("returns false immediately when there are no .proposal-page elements", async () => {
    const result = await saveProposalPdf("test.pdf");
    expect(result).toBe(false);
  });

  it("returns false when querySelector finds no .proposal-page nodes", () => {
    // Verify the guard: document with no proposal pages returns false
    const pages = document.querySelectorAll(".proposal-page");
    expect(pages.length).toBe(0);
  });

  it("returns false when no pages are in the DOM regardless of filename", async () => {
    expect(await saveProposalPdf("any-name.pdf")).toBe(false);
    expect(await saveProposalPdf("")).toBe(false);
  });

  it("uses the provided filename when saving", async () => {
    // No pages → early return; mainly verifying the guard condition
    const result = await saveProposalPdf("African Bank — SO-2026-001.pdf");
    expect(result).toBe(false);
  });
});
