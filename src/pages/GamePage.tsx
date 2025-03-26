import { IcTrophy } from '@atoms'
import { IPlayer } from '@interfaces'
import { ActivePlayer, CustomConfetti, InactivePlayer, Modal } from '@molecules'
import { GameHeader } from '@organisms'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const GamePage = () => {
	const { t } = useTranslation('Pages')
	const navigate = useNavigate()

	type GameState = {
		players: IPlayer[]
		currentWinner: IPlayer | null
		pointsError: string
		showModal: boolean
	}

	const [gameState, setGameState] = useState<GameState>({
		players: [],
		currentWinner: null,
		pointsError: '',
		showModal: false,
	})

	useEffect(() => {
		const loadGame = () => {
			const savedScores = localStorage.getItem('SCORES')

			const savedPlayers: IPlayer[] = savedScores
				? (JSON.parse(savedScores) as IPlayer[])
				: (JSON.parse(localStorage.getItem('PLAYERS') || '[]') as string[]).map(
						(name, index) => ({
							name,
							active: index === 0,
							score: 0,
							id: index,
						})
					)

			setGameState(prev => ({ ...prev, players: savedPlayers }))
		}

		loadGame()

	}, [])

	const hdlAddScore = (index: number, score: number) => {
		setGameState(prev => {
			const updatedPlayers = prev.players.map(player => ({ ...player }))
			const currentPlayer = updatedPlayers[index]

			const newScore = currentPlayer.score + score
			const isWinner = newScore === 10000

			if (newScore > 10000) {
				return { ...prev, pointsError: t('gamePage.overflowError') }
			}

			currentPlayer.score = newScore
			currentPlayer.active = false

			const nextIndex = (index + 1) % updatedPlayers.length
			updatedPlayers[nextIndex].active = true

			if (isWinner) {
				return {
					...prev,
					players: updatedPlayers,
					currentWinner: currentPlayer,
					showModal: true,
					pointsError: '',
				}
			}

			localStorage.setItem('SCORES', JSON.stringify(updatedPlayers))
			return { ...prev, players: updatedPlayers, pointsError: '' }
		})
	}

	const handleGameAction = (action: 'leave' | 'reset-zero' | 'reset-min') => {
		setGameState(prev => {
			if (!prev.currentWinner) return prev

			if (action === 'leave') {
				//  Filtrar jugadores (eliminar al ganador)
				const updatedPlayers = prev.players
					.filter(player => player.id !== prev.currentWinner?.id)
					.map((player, index) => ({ ...player, id: index }))

				localStorage.setItem('SCORES', JSON.stringify(updatedPlayers))
				const existingRanking: IPlayer[] = JSON.parse(
					localStorage.getItem('WINNER') || '[]'
				)
				const duplicateWinner = existingRanking.find(
					player => player.id === prev.currentWinner?.id
				)

				const updatedRanking = duplicateWinner ? [...existingRanking] :[...existingRanking, prev.currentWinner]
				localStorage.setItem('WINNER', JSON.stringify(updatedRanking))

				return {
					...prev,
					players: updatedPlayers,
					showModal: false,
					currentWinner: null,
				}
			}

			const updatedPlayers = prev.players.map(player => {
				if (player.id === prev.currentWinner?.id) {
					const minScore = Math.min(...prev.players.map(p => p.score))

					return {
						...player,
						score: action === 'reset-zero' ? 0 : minScore,
						active: false,
					}
				}
				return player
			})

			localStorage.setItem('SCORES', JSON.stringify(updatedPlayers))
			
			return {
				...prev,
				players: updatedPlayers,
				showModal: false,
				currentWinner: null,
			}
		})
	}
	
	const hdlResetGame = () => {
		localStorage.removeItem('SCORES')
		localStorage.removeItem('WINNER')
		localStorage.removeItem('PLAYERS')
		navigate('/wellcome')
	}

	return (
		<main className='w-screen h-dvh text-neutral-700 dark:text-neutral-200 flex flex-col gap-8 sm:gap-12 items-center px-2 sm:px-[5vw] py-[3vh]'>
			<GameHeader reset={hdlResetGame} />

			{gameState.currentWinner && (
				<CustomConfetti
					onWinner={!!gameState.currentWinner}
					winnerName={gameState.currentWinner.name}
				/>
			)}

			<section className='w-full sm:w-[60%] lg:w-[50%] h-full flex flex-col items-center gap-2 sm:gap-4 lg:gap-8'>
				{gameState.players.map((player, idx) =>
					player.active ? (
						<ActivePlayer
							key={`${player.name}-${idx}`}
							player={player}
							onAddScore={hdlAddScore}
							errorMessage={gameState.pointsError}
						/>
					) : (
						<div className='w-[80%] flex justify-center'>
							<InactivePlayer
								key={`${player.name}-${idx}`}
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
						<button
							className='w-full border border-sky-600 bg-sky-600 rounded py-2 px-4 hover:scale-105 transition-all duration-300'
							onClick={() => handleGameAction('leave')}
						>
							{t('gamePage.buttonLeaveGame')}
						</button>
						<button
							className='w-full border border-sky-600 bg-sky-600 rounded py-2 px-4 hover:scale-105 transition-all duration-300'
							onClick={() => handleGameAction('reset-zero')}
						>
							{t('gamePage.buttonFromZero')}
						</button>
						<button
							className='w-full border border-sky-600 bg-sky-600 rounded py-2 px-4 hover:scale-105 transition-all duration-300'
							onClick={() => handleGameAction('reset-min')}
						>
							{t('gamePage.buttonFromMin')}
						</button>
					</article>
				</section>
			</Modal>
		</main>
	)
}

export default GamePage
