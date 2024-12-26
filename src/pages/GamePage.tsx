import { IPlayer } from '@interfaces'
import { ActivePlayer, InactivePlayer } from '@molecules'
import { GameHeader } from '@organisms'
import { useEffect, useState } from 'react'

const GamePage = () => {
	const [playersList, setPlayersList] = useState<IPlayer[]>([])

	useEffect(() => {
		// Leer los jugadores del localStorage
		const players = JSON.parse(localStorage.getItem('PLAYERS') || '[]')

		// Crear el estado inicial para cada jugador
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

		setPlayersList(initialPlayers)
	}, [])

	const hdlAddScore = (index: number, score: number) => {
		const updatedPlayers = [...playersList]
		const currentPlayer = updatedPlayers[index]

		// Verificar si sumar el puntaje actual supera 10000
		if (currentPlayer.score + score > 10000) {
			alert(
				'No se puede superar los 10000 puntos. El puntaje actual no será sumado.'
			)
		} else {
			// Sumar el puntaje al jugador actual
			currentPlayer.score += score

			// Verificar si el jugador actual ha ganado
			if (currentPlayer.score === 10000) {
				currentPlayer.isWinner = true
				alert(`${currentPlayer.name} ha ganado el juego con 10000 puntos!`)

			currentPlayer.active = false
			if (index + 1 < updatedPlayers.length) {
				updatedPlayers[index + 1].active = true
			} else {
				updatedPlayers[0].active = true
			}
			} else {
				// Avanzar al siguiente jugador
				currentPlayer.active = false
				if (index + 1 < updatedPlayers.length) {
					updatedPlayers[index + 1].active = true
				} else {
					updatedPlayers[0].active = true
				}
			}
		}

		setPlayersList(updatedPlayers)
	}

	return (
		<main className='w-screen h-dvh  text-neutral-700 dark:text-neutral-200 flex flex-col gap-[3vh] items-center px-[5vw] py-[3vh]'>
			<GameHeader />
			<section className='w-full sm:w-[70%] lg:w-[60%] h-full flex flex-col items-center gap-2 sm:gap-4 lg:gap-8'>
				{playersList.map(player =>
					player.active ? (
						<ActivePlayer
							key={player.name}
							player={player}
							onAddScore={hdlAddScore}
						/>
					) : (
						<InactivePlayer key={player.name} {...player} />
					)
				)}
			</section>
		</main>
	)
}

export default GamePage
