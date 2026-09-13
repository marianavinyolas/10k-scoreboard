/**
 * Preferences Utils - Theme and language stored as plain strings
 *
 * These values are written without JSON encoding because they are read by the
 * app entry point before React mounts, so they must stay plain strings.
 */

import { STORAGE_DEFAULTS, STORAGE_KEYS } from '@constants'

/** Gets the stored language, or the default one */
export const getStoredLanguage = (): string => {
	return (
		localStorage.getItem(STORAGE_KEYS.LANGUAGE) || STORAGE_DEFAULTS.LANGUAGE
	)
}

/** Stores the selected language */
export const setStoredLanguage = (language: string): void => {
	localStorage.setItem(STORAGE_KEYS.LANGUAGE, language)
}

/** Gets the stored theme, or the default one */
export const getStoredTheme = (): string => {
	return localStorage.getItem(STORAGE_KEYS.THEME) || STORAGE_DEFAULTS.THEME
}

/** Stores the selected theme */
export const setStoredTheme = (theme: string): void => {
	localStorage.setItem(STORAGE_KEYS.THEME, theme)
}

/** Applies the theme to the document root */
export const applyTheme = (theme: string): void => {
	document.documentElement.classList.toggle('dark', theme === 'dark')
}
