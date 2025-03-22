import { IcTrophy } from '@atoms'
import { IPlayer } from '@interfaces'
import { ActivePlayer, CustomConfetti, InactivePlayer, Modal } from '@molecules'
import { GameHeader } from '@organisms'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const GamePage = () => {
	const { t } = useTranslation('Pages')

	const [playersList, setPlayersList] = useState<IPlayer[]>([])
	const [isWinner, setIsWinner] = useState(false)
	const [pointsError, setPointsError] = useState('')
	const [winnersList, setWinnersList] = useState<IPlayer[]>([])

	// const dialogRef = useRef<HTMLDialogElement>(null)
	const [showModal, setShowModal] = useState(false)

	useEffect(() => {
		const scores = JSON.parse(localStorage.getItem('SCORES') || '[]')
		const players = JSON.parse(localStorage.getItem('PLAYERS') || '[]')

		const initialPlayers: IPlayer[] = players.map(
			(item: string, index: number) => ({
				name: item,
				active: index === 0 ? true : false,
				isWinner: false,
				score: 0,
				position: null,
				id: index,
			})
		)

		setPlayersList(scores.length ? [...scores] : initialPlayers)
	}, [winnersList])

	const hdlAddScore = (index: number, score: number) => {
		const updatedPlayers = [...playersList]
		const currentPlayer = updatedPlayers[index]

		// Verificar si sumar el puntaje actual supera 10000
		if (currentPlayer.score + score > 10000) {
			setPointsError(t('gamePage.overflowError'))
		} else {
			setPointsError('')
			// Sumar el puntaje al jugador actual
			currentPlayer.score += score

			// Verificar si el jugador actual ha ganado
			if (currentPlayer.score === 10000) {
				localStorage.setItem('WINNER', JSON.stringify(currentPlayer))
				setShowModal(true)
				setIsWinner(true)
				currentPlayer.isWinner = true
				currentPlayer.active = false
				if (index + 1 < updatedPlayers.length) {
					updatedPlayers[index + 1].active = true
				} else {
					updatedPlayers[0].active = true
				}
			} else {
				// Avanzar al siguiente jugador
				setIsWinner(false)
				currentPlayer.active = false
				if (index + 1 < updatedPlayers.length) {
					updatedPlayers[index + 1].active = true
				} else {
					updatedPlayers[0].active = true
				}
			}
		}
		localStorage.setItem('SCORES', JSON.stringify(updatedPlayers))

		setPlayersList(updatedPlayers)
	}

	const hdlClose = () => {
		setShowModal(false)
		localStorage.removeItem('WINNER')
	}
	const hdlFromZero = () => {
		// Obtener las puntuaciones almacenadas en localStorage
		const scoresStr = localStorage.getItem('SCORES')
		const currentWinner = JSON.parse(localStorage.getItem('WINNER') ?? '{}')
		if (!scoresStr) return

		const scores: IPlayer[] = JSON.parse(scoresStr)

		// Encontrar al jugador ganador
		const winnerIndex = scores.findIndex(player => player.isWinner)
		if (winnerIndex === -1) return // Si no hay ganador, salir

		// Filtrar otros jugadores y obtener la puntuación mínima
		const otherPlayers = scores.filter(player => !player.isWinner)
		if (otherPlayers.length === 0) return // No hay otros jugadores

		// Actualizar el ganador con la puntuación mínima y reactivarlo
		scores[winnerIndex].score = 0
		scores[winnerIndex].isWinner = false // Dejar de ser considerado ganador

		// Guardar los cambios en localStorage
		localStorage.setItem('SCORES', JSON.stringify(scores))
		setWinnersList([...winnersList, currentWinner])


		// Cerrar el modal y eliminar el ítem 'WINNER'
		setShowModal(false)
		localStorage.removeItem('WINNER')
	}
	const hdlFromMin = () => {
		// Obtener las puntuaciones almacenadas en localStorage
		const scoresStr = localStorage.getItem('SCORES')
		const currentWinner = JSON.parse(localStorage.getItem('WINNER') ?? '{}')
		if (!scoresStr) return

		const scores: IPlayer[] = JSON.parse(scoresStr)

		// Encontrar al jugador ganador
		const winnerIndex = scores.findIndex(player => player.isWinner)
		if (winnerIndex === -1) return // Si no hay ganador, salir

		// Filtrar otros jugadores y obtener la puntuación mínima
		const otherPlayers = scores.filter(player => !player.isWinner)
		if (otherPlayers.length === 0) return // No hay otros jugadores

		const minScore = Math.min(...otherPlayers.map(p => p.score))

		// Actualizar el ganador con la puntuación mínima y reactivarlo
		scores[winnerIndex].score = minScore
		scores[winnerIndex].isWinner = false // Dejar de ser considerado ganador

		// Guardar los cambios en localStorage
		localStorage.setItem('SCORES', JSON.stringify(scores))
		setWinnersList([...winnersList, currentWinner])


		// Cerrar el modal y eliminar el ítem 'WINNER'
		setShowModal(false)
		localStorage.removeItem('WINNER')
	}

	return (
		<main className='w-screen h-dvh  text-neutral-700 dark:text-neutral-200 flex flex-col gap-[3vh] items-center px-[5vw] py-[3vh]'>
			<GameHeader />
			{isWinner ? (
				<CustomConfetti
					onWinner={isWinner}
					winnerName={playersList.find(item => item.isWinner)?.name ?? ''}
				/>
			) : (
				<></>
			)}
			<section className='w-full sm:w-[60%] lg:w-[50%] h-full flex flex-col items-center gap-2 sm:gap-4 lg:gap-8'>
				{playersList.map((player, idx) =>
					player.active ? (
						<ActivePlayer
							key={player.name}
							player={player}
							onAddScore={hdlAddScore}
							errorMessage={pointsError}
						/>
					) : (
						<div className='w-[80%] flex'>
							<InactivePlayer
								key={player.name}
								name={player.name}
								score={player.score}
								playerIndex={idx + 1}
							/>
						</div>
					)
				)}
			</section>

			<Modal isOpen={showModal}>
				<section className='border border-teal-300 flex flex-col gap-4 items-center'>
					<IcTrophy className='w-20 h-20 fill-amber-500 dark:fill-amber-400' />
					<h3 className='text-neutral-700 dark:text-neutral-100'>
						{t('gamePage.congratulationWinner')}
					</h3>
					<h1 className='text-2xl font-bold text-slate-500'>
						{JSON.parse(localStorage.getItem('WINNER') ?? '{}').name}
					</h1>
					<article className='w-full flex justify-around gap-4 text-neutral-100 font-medium'>
						<button
							onClick={hdlClose}
							className='w-24 border border-sky-600 bg-sky-600 rounded py-2 px-4'
						>
							No
						</button>
						<button
							onClick={hdlFromZero}
							className='w-24 border border-sky-600 bg-sky-600 rounded py-2 px-4'
						>
							Desde 0
						</button>
						<button
							onClick={hdlFromMin}
							className='w-24 border border-sky-600 bg-sky-600 rounded py-2 px-4'
						>
							Min
						</button>
					</article>
				</section>
			</Modal>
		</main>
	)
}

export default GamePage
