export interface IPlayer {
	name: string
	active: boolean
	isWinner: boolean
	score: number
	position: number | null
	id: number
}