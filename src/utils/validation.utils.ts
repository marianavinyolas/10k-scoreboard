/**
 * Validation Utils - Reusable validation functions
 */

import { SCORE_VALIDATION } from '@constants'

/**
 * Validates if a score is valid (multiple of SCORE_STEP)
 * @param score - Score to validate
 * @returns true if valid, false otherwise
 */
export const isValidScore = (score: number): boolean => {
	if (score < SCORE_VALIDATION.MIN) return false
	return score % SCORE_VALIDATION.STEP === 0
}

/**
 * Validates if a player name is unique in the list
 * @param name - Name to validate
 * @param existingNames - List of existing names
 * @returns true if unique, false if already exists
 */
export const isUniqueName = (
	name: string,
	existingNames: string[]
): boolean => {
	return !existingNames.includes(name)
}

/**
 * Validates if a name is not empty
 * @param name - Name to validate
 * @returns true if not empty, false if empty
 */
export const isValidName = (name: string): boolean => {
	return name.trim().length > 0
}

/**
 * Validates if a score would cause overflow (greater than MAX_SCORE)
 * @param currentScore - Current player score
 * @param scoreToAdd - Score to add
 * @returns true if would overflow, false if within range
 */
export const wouldCauseOverflow = (
	currentScore: number,
	scoreToAdd: number
): boolean => {
	return currentScore + scoreToAdd > SCORE_VALIDATION.MAX
}

/**
 * Validates if a score wins the game (equals MAX_SCORE)
 * @param score - Score to validate
 * @returns true if winning score, false otherwise
 */
export const isWinningScore = (score: number): boolean => {
	return score === SCORE_VALIDATION.MAX
}
