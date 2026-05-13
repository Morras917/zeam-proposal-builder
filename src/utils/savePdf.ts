const A4_W_MM = 210;
const A4_H_MM = 297;

/**
 * Capture every `.proposal-page` element in the DOM, render each to a
 * high-res canvas, and assemble them into an A4 PDF that downloads
 * automatically.
 *
 * html2canvas and jsPDF are loaded lazily so they don't bloat the initial
 * bundle (~900KB combined).
 *
 * Returns `true` on success, `false` on error.
 */
export async function saveProposalPdf(filename: string): Promise<boolean> {
  const pages = document.querySelectorAll<HTMLElement>(".proposal-page");
  if (pages.length === 0) return false;

  // Lazy-load heavy libraries
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import("html2canvas-pro"),
    import("jspdf"),
  ]);

  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];

    // Render at 2× for crisp text on retina displays
    const canvas = await html2canvas(page, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");

    // Calculate dimensions to fit A4 exactly
    const imgW = A4_W_MM;
    const imgH = (canvas.height * A4_W_MM) / canvas.width;

    if (i > 0) pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, 0, imgW, Math.min(imgH, A4_H_MM));
  }

  pdf.save(filename);
  return true;
}
