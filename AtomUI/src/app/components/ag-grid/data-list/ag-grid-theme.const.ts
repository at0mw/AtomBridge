import {Theme, themeQuartz} from "ag-grid-community";

export const AG_GRID_THEME: Theme = themeQuartz.withParams({
  spacing: 8,
  backgroundColor: 'var(--proav-sys-color-surface)',
  foregroundColor: 'var(--proav-sys-color-on-surface)',
  headerBackgroundColor: 'var(--proav-sys-color-surface)',
  rowHoverColor: 'var(--proav-sys-color-outline-variant)',
  accentColor: 'var(--proav-sys-color-secondary)',
  borderRadius: 'var(--proav-dimension-small)',
  wrapperBorderRadius: 'var(--proav-dimension-small)',
  borderColor: 'color-mix(in srgb, transparent, var(--proav-sys-color-on-surface) 15%)',
  rowBorder: {
    color: 'color-mix(in srgb, transparent, var(--proav-sys-color-on-surface) 15%)',
    width: 1,
  }
  // menuShadow: { radius: 10, spread: 5, color: 'red' },
});
