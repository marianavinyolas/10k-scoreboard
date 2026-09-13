/**
 * Game Logic Utils - Reusable game logic functions
 */

import { IPlayer } from '@interfaces'
import { MAX_SCORE, MIN_PLAYERS } from '@constants'

/**
 * Gets the next player in turn (round-robin)
 * @param currentIndex - Index of current player
 * @param totalPlayers - Total number of players
 * @returns Index of next player
 */
export const getNextPlayerIndex = (
	currentIndex: number,
	totalPlayers: number
): number => {
	return (currentIndex + 1) % totalPlayers
}

/**
 * Switches the active turn from one player to another
 * @param players - Array of players
 * @param currentIndex - Index of player ending their turn
 * @returns Updated array of players
 */
export const switchActivePlayer = (
	players: IPlayer[],
	currentIndex: number
): IPlayer[] => {
	const updatedPlayers = players.map(p => ({ ...p }))
	updatedPlayers[currentIndex].active = false

	const nextIndex = getNextPlayerIndex(currentIndex, players.length)
	updatedPlayers[nextIndex].active = true

	return updatedPlayers
}

/**
 * Adds score to a player
 * @param players - Array of players
 * @param playerIndex - Index of player
 * @param scoreToAdd - Points to add
 * @returns Updated array of players
 */
export const addScoreToPlayer = (
	players: IPlayer[],
	playerIndex: number,
	scoreToAdd: number
): IPlayer[] => {
	const updatedPlayers = players.map(p => ({ ...p }))
	updatedPlayers[playerIndex].score += scoreToAdd
	return updatedPlayers
}

/**
 * Resets a player's score
 * @param players - Array of players
 * @param playerIndex - Index of player
 * @param resetValue - Value to set (0 or minimum score)
 * @returns Updated array of players
 */
export const resetPlayerScore = (
	players: IPlayer[],
	playerIndex: number,
	resetValue: number
): IPlayer[] => {
	const updatedPlayers = players.map(p => ({ ...p }))
	updatedPlayers[playerIndex].score = resetValue
	return updatedPlayers
}

/**
 * Gets the minimum score among all players
 * @param players - Array of players
 * @returns Minimum score
 */
export const getMinimumScore = (players: IPlayer[]): number => {
	return Math.min(...players.map(p => p.score))
}

/**
 * Removes a player from the game
 * @param players - Array of players
 * @param playerId - ID of player to remove
 * @returns Updated array without the removed player
 */
export const removePlayer = (players: IPlayer[], playerId: number): IPlayer[] => {
	return players
		.filter(player => player.id !== playerId)
		.map((player, index) => ({ ...player, id: index }))
}

/**
 * Validates if there is a winner
 * @param score - Current score
 * @returns true if winning score, false otherwise
 */
export const hasWinner = (score: number): boolean => {
	return score === MAX_SCORE
}

/**
 * Validates if there are enough players to play
 * @param players - Array of players
 * @returns true if at least MIN_PLAYERS, false otherwise
 */
export const hasEnoughPlayers = (players: IPlayer[]): boolean => {
	return players.length >= MIN_PLAYERS
}

/**
 * Calculates if it's the last player in the game
 * @param players - Array of players
 * @returns true if only one player remains, false otherwise
 */
export const isLastPlayer = (players: IPlayer[]): boolean => {
	return players.length === 1
}

/**
 * Gets the current active player
 * @param players - Array of players
 * @returns Active player or null if none
 */
export const getActivePlayer = (players: IPlayer[]): IPlayer | null => {
	return players.find(p => p.active) || null
}

/**
 * Gets all inactive players
 * @param players - Array of players
 * @returns Array of inactive players
 */
export const getInactivePlayers = (players: IPlayer[]): IPlayer[] => {
	return players.filter(p => !p.active)
}

/**
 * Determines if special options should be shown (> 2 players)
 * @param players - Array of players
 * @returns true if more than 2 players, false otherwise
 */
export const shouldShowSpecialOptions = (players: IPlayer[]): boolean => {
	return players.length > 2
}
