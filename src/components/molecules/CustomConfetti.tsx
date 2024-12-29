import { useEffect } from "react"
import ReactConfetti from "react-confetti"

interface ICustomConfetti {
	onWinner: boolean
	winnerName: string
}

const CustomConfetti = ({ onWinner, winnerName }: ICustomConfetti) => {
	useEffect(() => {

	}, [onWinner])
	
	return (
		<ReactConfetti
			recycle={false}
			run={onWinner}
			numberOfPieces={400}
			onConfettiComplete={() =>
				console.log(`${winnerName} ha ganado el juego con 10000 puntos!`)
			}
		/>
	)
}

export default CustomConfetti