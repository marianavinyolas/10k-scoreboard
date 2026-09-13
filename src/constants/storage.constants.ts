/**
 * Storage Constants - localStorage keys for the game
 */

/**
 * Storage keys.
 *
 * NOTE: these are intentionally unprefixed for now, because several components
 * still read and write localStorage directly with these literal strings.
 * Once every component uses the storage utils, a prefix (e.g. `TENTHOUSAND_`)
 * can be added here in one place — worth doing, since GitHub Pages serves every
 * repo from the same origin and generic keys can collide across projects.
 */
export const STORAGE_KEYS = {
	/** List of player names */
	PLAYERS: 'PLAYERS',

	/** Current game scores */
	SCORES: 'SCORES',

	/** Winner information */
	WINNER: 'WINNER',

	/** User theme (light/dark) */
	THEME: 'THEME',

	/** User language */
	LANGUAGE: 'LANGUAGE',
} as const

/** Default values used when a preference has never been stored */
export const STORAGE_DEFAULTS = {
	THEME: 'light',
	LANGUAGE: 'es',
} as const
