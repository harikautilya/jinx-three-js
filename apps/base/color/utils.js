function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

function rgbToHex({ r, g, b }) {
  const rgb = (r << 16) | (g << 8) | b;
  return `#${(0x1000000 + rgb).toString(16).slice(1).toUpperCase()}`;
}

function multiplyColors(hex1, hex2) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  const r = Math.min(255, Math.floor((rgb1.r * rgb2.r) / 255));
  const g = Math.min(255, Math.floor((rgb1.g * rgb2.g) / 255));
  const b = Math.min(255, Math.floor((rgb1.b * rgb2.b) / 255));

  return rgbToHex({ r, g, b });
}

function multiplyColorWithConstant(hex, constant) {
  const { r, g, b } = hexToRgb(hex);

  const newR = Math.min(255, Math.floor(r * constant));
  const newG = Math.min(255, Math.floor(g * constant));
  const newB = Math.min(255, Math.floor(b * constant));

  return rgbToHex({ r: newR, g: newG, b: newB });
}

export { multiplyColors, multiplyColorWithConstant };