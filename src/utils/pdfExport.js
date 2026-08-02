import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// A4 in mm
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

// If the leftover content after the last full page is smaller than this,
// treat it as nothing (rounding/box-shadow/margin noise) instead of adding
// an extra, mostly-blank trailing page.
const PAGE_TOLERANCE_MM = 4;

/**
 * Renders the given DOM node (the .a4-page resume element) to a
 * multi-page, print-ready PDF that matches the live preview exactly.
 */
export const exportNodeToPdf = async (node, filename = 'resume.pdf') => {
  // eslint-disable-next-line no-console
  console.log('[pdfExport] running FIXED version v3 — if you do not see this log, the old file is still active (hard-refresh / restart the dev server).');

  if (!node) {
    throw new Error('Nothing to export — the preview element was not found.');
  }

  if (node.offsetWidth === 0 || node.offsetHeight === 0) {
    throw new Error(
      'The preview element has zero size — make sure it is visible (not display:none/zoom 0) before exporting.'
    );
  }

  // Make sure any @font-face fonts (Google Fonts etc.) are fully loaded,
  // otherwise html2canvas can render text with fallback metrics/blank runs.
  if (document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready;
    } catch {
      /* non-fatal */
    }
  }

  // Make sure every image inside the resume (profile photo, icons, logos)
  // has actually finished loading — otherwise it silently exports blank.
  await waitForImages(node);

  const canvas = await html2canvas(node, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
    logging: false,
    windowWidth: node.offsetWidth,
    windowHeight: node.offsetHeight,
  });

  const imgData = canvas.toDataURL('image/jpeg', 0.98);

  const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });

  const imgWidthMm = A4_WIDTH_MM;
  const imgHeightMm = (canvas.height * imgWidthMm) / canvas.width;

  let heightLeft = imgHeightMm;
  let position = 0;
  let pageNumber = 0;

  // Draw the same full-height image on each page, shifted up by one page
  // height each time — jsPDF only shows the slice that falls within the
  // current page's bounds. Loop stops once the remaining sliver is smaller
  // than PAGE_TOLERANCE_MM, so we never emit a near-blank trailing page.
  while (heightLeft > PAGE_TOLERANCE_MM || pageNumber === 0) {
    if (pageNumber > 0) {
      pdf.addPage();
    }
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidthMm, imgHeightMm);
    heightLeft -= A4_HEIGHT_MM;
    position -= A4_HEIGHT_MM;
    pageNumber += 1;
  }

  pdf.save(filename);
};

function waitForImages(node) {
  const images = Array.from(node.querySelectorAll('img'));
  if (images.length === 0) return Promise.resolve();

  return Promise.all(
    images.map((img) => {
      if (img.complete && img.naturalWidth > 0) return Promise.resolve();
      return new Promise((resolve) => {
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
      });
    })
  );
}