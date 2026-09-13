import { IcTrophy } from '@atoms'
import { IPlayer } from '@interfaces'
import { ActivePlayer, InactivePlayer, Modal } from '@molecules'
import { GameHeader } from '@organisms'
import {
	addScoreToPlayer,
	clearAllGameData,
	clearGameSession,
	getMinimumScore,
	hasWinner,
	loadGamePlayers,
	removePlayer,
	resetPlayerScore,
	saveGamePlayers,
	saveScoresToStorage,
	shouldShowSpecialOptions,
	switchActivePlayer,
	wouldCauseOverflow,
} from '@utils'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

/** Actions available to resolve the game once a player reaches the max score */
type TWinnerAction = 'leave' | 'reset-zero' | 'reset-min'

interface IGameState {
	players: IPlayer[]
	currentWinner: IPlayer | null
	pointsError: string
	showModal: boolean
}

const INITIAL_GAME_STATE: IGameState = {
	players: [],
	currentWinner: null,
	pointsError: '',
	showModal: false,
}

const GamePage = () => {
	const { t } = useTranslation('Pages')
	const navigate = useNavigate()
	const [gameState, setGameState] = useState<IGameState>(INITIAL_GAME_STATE)

	/** Resumes a saved game, or starts a fresh one from the stored player names */
	useEffect(() => {
		setGameState(prev => ({ ...prev, players: loadGamePlayers() }))
	}, [])

	const hdlAddScore = (playerId: number, score: number) => {
		setGameState(prev => {
			const playerIndex = prev.players.findIndex(
				player => player.id === playerId
			)
			if (playerIndex === -1) return prev

			const currentPlayer = prev.players[playerIndex]

			if (wouldCauseOverflow(currentPlayer.score, score)) {
				return { ...prev, pointsError: t('gamePage.overflowError') }
			}

			const scoredPlayers = addScoreToPlayer(prev.players, playerIndex, score)
			const updatedPlayers = switchActivePlayer(scoredPlayers, playerIndex)

			// A winning state is intentionally not persisted: it stays pending until
			// the player resolves it through the modal, and each action saves its own
			// outcome. This keeps a page reload from restoring an unresolvable game.
			if (hasWinner(updatedPlayers[playerIndex].score)) {
				return {
					...prev,
					players: updatedPlayers,
					currentWinner: updatedPlayers[playerIndex],
					pointsError: '',
					showModal: true,
				}
			}

			saveScoresToStorage(updatedPlayers)
			return { ...prev, players: updatedPlayers, pointsError: '' }
		})
	}

	const hdlWinnerAction = (action: TWinnerAction) => {
		setGameState(prev => {
			if (!prev.currentWinner) return prev

			// The winner leaves and the remaining players keep playing
			if (action === 'leave') {
				const updatedPlayers = removePlayer(prev.players, prev.currentWinner.id)

				saveGamePlayers(updatedPlayers)

				return {
					...prev,
					players: updatedPlayers,
					currentWinner: null,
					showModal: false,
				}
			}

			// The winner stays in, restarting from zero or from the lowest score
			const winnerIndex = prev.players.findIndex(
				player => player.id === prev.currentWinner?.id
			)
			const resetValue =
				action === 'reset-zero' ? 0 : getMinimumScore(prev.players)
			const updatedPlayers = resetPlayerScore(
				prev.players,
				winnerIndex,
				resetValue
			)

			saveScoresToStorage(updatedPlayers)

			return {
				...prev,
				players: updatedPlayers,
				currentWinner: null,
				showModal: false,
			}
		})
	}

	const hdlRestartGame = () => {
		clearGameSession()
		setGameState({ ...INITIAL_GAME_STATE, players: loadGamePlayers() })
	}

	const hdlExitGame = () => {
		clearAllGameData()
		navigate('/wellcome')
	}

	return (
		<main className='w-screen h-dvh text-neutral-700 dark:text-neutral-200 flex flex-col gap-8 sm:gap-12 items-center px-2 sm:px-[5vw] py-[3vh] relative'>
			<GameHeader />

			<section className='w-full sm:w-[60%] lg:w-[50%] h-full flex flex-col items-center gap-2 sm:gap-4 lg:gap-8'>
				{gameState.players.map((player, idx) =>
					player.active ? (
						<ActivePlayer
							key={player.name}
							player={player}
							onAddScore={hdlAddScore}
							errorMessage={gameState.pointsError}
						/>
					) : (
						<div key={player.name} className='w-[80%] flex justify-center'>
							<InactivePlayer
								name={player.name}
								score={player.score}
								playerIndex={idx + 1}
							/>
						</div>
					)
				)}
			</section>

			<Modal isOpen={gameState.showModal}>
				<section className='flex flex-col gap-4 items-center p-2 sm:p-12'>
					<IcTrophy className='w-20 h-20 fill-amber-500 dark:fill-amber-400' />
					<h3 className='text-neutral-700 dark:text-neutral-100'>
						{t('gamePage.congratulationWinner')}
					</h3>
					<h1 className='text-2xl sm:text-3xl font-bold text-neutral-700 dark:text-neutral-100'>
						{gameState.currentWinner?.name}
					</h1>
					<article className='w-full flex flex-col justify-center items-center gap-4 text-neutral-100 font-medium'>
						{shouldShowSpecialOptions(gameState.players) ? (
							<>
								<button
									className='w-full border border-sky-600 bg-sky-600 rounded py-2 px-4 hover:scale-105 transition-all duration-300'
									onClick={() => hdlWinnerAction('leave')}
								>
									{t('gamePage.buttonLeaveGame')}
								</button>
								<button
									className='w-full border border-sky-600 bg-sky-600 rounded py-2 px-4 hover:scale-105 transition-all duration-300'
									onClick={() => hdlWinnerAction('reset-zero')}
								>
									{t('gamePage.buttonFromZero')}
								</button>
								<button
									className='w-full border border-sky-600 bg-sky-600 rounded py-2 px-4 hover:scale-105 transition-all duration-300'
									onClick={() => hdlWinnerAction('reset-min')}
								>
									{t('gamePage.buttonFromMin')}
								</button>
							</>
						) : (
							<>
								<button
									className='w-full border border-sky-600 bg-sky-600 rounded py-2 px-4 hover:scale-105 transition-all duration-300'
									onClick={hdlExitGame}
								>
									{t('header.leaveButton')}
								</button>
								<button
									className='w-full border border-sky-600 bg-sky-600 rounded py-2 px-4 hover:scale-105 transition-all duration-300'
									onClick={hdlRestartGame}
								>
									{t('header.restartButton')}
								</button>
							</>
						)}
					</article>
				</section>
			</Modal>
		</main>
	)
}

export default GamePage
