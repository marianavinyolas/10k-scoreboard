/**
 * Storage Utils - Functions to handle localStorage
 */

import { IPlayer } from '@interfaces'
import { STORAGE_KEYS } from '@constants'

/**
 * Gets the list of players from localStorage
 * @returns Array of player names, or empty array if none
 */
export const getPlayersFromStorage = (): string[] => {
	try {
		const players = localStorage.getItem(STORAGE_KEYS.PLAYERS)
		return players ? JSON.parse(players) : []
	} catch (error) {
		console.error('Error getting players from localStorage:', error)
		return []
	}
}

/**
 * Gets the current scores from localStorage
 * @returns Array of players with their scores, or empty array if none
 */
export const getScoresFromStorage = (): IPlayer[] => {
	try {
		const scores = localStorage.getItem(STORAGE_KEYS.SCORES)
		return scores ? JSON.parse(scores) : []
	} catch (error) {
		console.error('Error getting scores from localStorage:', error)
		return []
	}
}

/**
 * Saves the list of players to localStorage
 * @param players - Array of player names
 */
export const savePlayersToStorage = (players: string[]): void => {
	try {
		localStorage.setItem(STORAGE_KEYS.PLAYERS, JSON.stringify(players))
	} catch (error) {
		console.error('Error saving players to localStorage:', error)
	}
}

/**
 * Saves the scores to localStorage
 * @param players - Array of players with their scores
 */
export const saveScoresToStorage = (players: IPlayer[]): void => {
	try {
		localStorage.setItem(STORAGE_KEYS.SCORES, JSON.stringify(players))
	} catch (error) {
		console.error('Error saving scores to localStorage:', error)
	}
}

/**
 * Initializes players from a list of names
 * @param playerNames - Array of player names
 * @returns Array of players with IPlayer structure
 */
export const initializePlayers = (playerNames: string[]): IPlayer[] => {
	return playerNames.map((name, index) => ({
		name,
		active: index === 0,
		score: 0,
		id: index,
	}))
}

/**
 * Clears all game data from localStorage
 */
export const clearAllGameData = (): void => {
	try {
		localStorage.removeItem(STORAGE_KEYS.PLAYERS)
		localStorage.removeItem(STORAGE_KEYS.SCORES)
		localStorage.removeItem(STORAGE_KEYS.WINNER)
	} catch (error) {
		console.error('Error clearing game data from localStorage:', error)
	}
}

/**
 * Gets a specific key from localStorage
 * @param key - Key from STORAGE_KEYS
 * @returns Stored value or null
 */
export const getItemFromStorage = <T = string>(key: string): T | null => {
	const item = localStorage.getItem(key)
	if (item === null) return null

	try {
		return JSON.parse(item) as T
	} catch {
		// Value is not valid JSON, return the raw string
		return item as T
	}
}

/**
 * Saves a specific item to localStorage
 * @param key - Key from STORAGE_KEYS
 * @param value - Value to save
 */
export const setItemToStorage = <T>(key: string, value: T): void => {
	try {
		localStorage.setItem(key, JSON.stringify(value))
	} catch (error) {
		console.error(`Error saving ${key} to localStorage:`, error)
	}
}
