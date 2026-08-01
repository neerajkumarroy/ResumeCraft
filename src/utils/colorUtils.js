// html2canvas (used for PDF export) cannot parse modern CSS color functions
// like color-mix(), oklch(), etc. Anywhere we'd reach for color-mix() in CSS,
// we instead precompute a plain hex/rgba value here in JS and pass it down
// as an inline CSS variable — that keeps the PDF export working reliably.

const hexToRgb = (hex) => {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const num = parseInt(h, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
};

// Mixes `hex` with white/black-ish targets similarly to color-mix(in srgb, hex X%, target)
export const mixColor = (hex, percent, target = '#ffffff') => {
  try {
    const c1 = hexToRgb(hex);
    const c2 = hexToRgb(target);
    const p = percent / 100;
    const r = Math.round(c1.r * p + c2.r * (1 - p));
    const g = Math.round(c1.g * p + c2.g * (1 - p));
    const b = Math.round(c1.b * p + c2.b * (1 - p));
    return `rgb(${r}, ${g}, ${b})`;
  } catch {
    return target;
  }
};

export const hexToRgba = (hex, alpha = 1) => {
  try {
    const { r, g, b } = hexToRgb(hex);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } catch {
    return hex;
  }
};
