import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// A4 in mm
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

/**
 * Renders the given DOM node (the .a4-page resume element) to a
 * multi-page, print-ready PDF that matches the live preview exactly.
 */
export const exportNodeToPdf = async (node, filename = 'resume.pdf') => {
  if (!node) {
    throw new Error('Nothing to export — the preview element was not found.');
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

  const canvas = await html2canvas(node, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
    logging: false,
    windowWidth: node.scrollWidth,
    windowHeight: node.scrollHeight,
  });

  const imgData = canvas.toDataURL('image/jpeg', 0.98);

  const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });

  const imgWidthMm = A4_WIDTH_MM;
  const imgHeightMm = (canvas.height * imgWidthMm) / canvas.width;

  let heightLeft = imgHeightMm;
  let position = 0;

  pdf.addImage(imgData, 'JPEG', 0, position, imgWidthMm, imgHeightMm);
  heightLeft -= A4_HEIGHT_MM;

  while (heightLeft > 0) {
    position = heightLeft - imgHeightMm;
    pdf.addPage();
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidthMm, imgHeightMm);
    heightLeft -= A4_HEIGHT_MM;
  }

  pdf.save(filename);
};
