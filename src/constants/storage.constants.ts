/**
 * Storage Constants - localStorage keys for the game
 */

/** Prefix for all localStorage keys */
const STORAGE_PREFIX = 'TENTHOUSAND_'

/** Storage keys */
export const STORAGE_KEYS = {
	/** List of player names */
	PLAYERS: `${STORAGE_PREFIX}PLAYERS`,

	/** Current game scores */
	SCORES: `${STORAGE_PREFIX}SCORES`,

	/** Winner information */
	WINNER: `${STORAGE_PREFIX}WINNER`,

	/** User theme (light/dark) */
	THEME: `${STORAGE_PREFIX}THEME`,

	/** User language */
	LANGUAGE: `${STORAGE_PREFIX}LANGUAGE`,
} as const

/** Default values */
export const STORAGE_DEFAULTS = {
	PLAYERS: '[]',
	SCORES: '[]',
	WINNER: null,
} as const
