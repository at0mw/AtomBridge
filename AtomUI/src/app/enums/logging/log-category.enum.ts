export enum LogCategory {
  All,
  Core,
  RestApi,
  Websocket,
  TestData,
  JsonRpc,
  Route,
  DeskReserve,
  RoomControl,
  Table,
  Surfaces
}

export const LogCategoryNames = Object.keys(LogCategory)
  .filter((key) => isNaN(Number(key)));


export function logCategoryColour(level: LogCategory): string {
  // Generate a color based on the Enum value
  function generateColor(index: number): string {
    const hue = (index * 137) % 360; // Spread colors evenly across the spectrum
    return hslToHex(hue, 70, 50);
    // return `hsl(${hue}, 70%, 50%)`; // HSL for better variety and contrast
  }

  return generateColor(level);
}

/**
 * Converts HSL to RGB, then formats it as HEX.
 */
function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;

  let r = 0, g = 0, b = 0;

  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0;
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x;
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c;
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = c;
  } else if (h >= 300 && h < 360) {
    r = c; g = 0; b = x;
  }

  // Convert to 0-255 range
  const red = Math.round((r + m) * 255);
  const green = Math.round((g + m) * 255);
  const blue = Math.round((b + m) * 255);

  // Convert to hex string
  return `#${((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1).toUpperCase()}`;
}
