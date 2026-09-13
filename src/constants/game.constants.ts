/**
 * Game Constants - Main constants for the 10k game
 */

/** Maximum score to win the game */
export const MAX_SCORE = 10000

/** Valid step for adding points (must be divisible by 50) */
export const SCORE_STEP = 50

/** Minimum number of players required to start the game */
export const MIN_PLAYERS = 2

/** Score validation rules */
export const SCORE_VALIDATION = {
	MAX: MAX_SCORE,
	STEP: SCORE_STEP,
	MIN: 0,
} as const

/** Game error messages */
export const GAME_ERRORS = {
	OVERFLOW: 'gamePage.overflowError', // i18n key
	MIN_PLAYERS: 'Minimum 2 players required',
	INVALID_SCORE: 'Score must be a multiple of 50',
} as const
