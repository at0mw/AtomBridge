export const THEME_MODE_TYPE = {
  LIGHT: 'light',
  DARK: 'dark'
}

type ObjectValues<T> = T[keyof T];

export type ThemeMode = ObjectValues<typeof THEME_MODE_TYPE>;

export function isThemeMode(value: any): value is ThemeMode {
  return value === "light" || value === "dark";
}
