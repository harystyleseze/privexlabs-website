// Experience props from the design (data-props on the design script).
export type ThemePreference = 'dark' | 'light' | 'system'
export type Theme = 'dark' | 'light'

export const experience = {
  defaultTheme: 'dark' as ThemePreference,
  motion: true,
  customCursor: true,
}

export const THEME_STORAGE_KEY = 'pxl-theme'
