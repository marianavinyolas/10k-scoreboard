import { IPlayer } from '@interfaces'
import { InactivePlayer, TypingMachine } from '@molecules'
import { GameHeader } from '@organisms'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const LeaderboardPage = () => {
	const { t } = useTranslation('Pages')
	const [scoresList, setScoresList] = useState<IPlayer[]>([])
	const [, setIsDone] = useState(false)


	useEffect(() => {
		const scores = JSON.parse(localStorage.getItem('SCORES') || '[]')

		const sortedScores = scores.sort(
			(a: IPlayer, b: IPlayer) => b.score - a.score
		)

		setScoresList(sortedScores)
	}, [])

	return (
		<main className='w-screen h-dvh  text-neutral-700 dark:text-neutral-200 flex flex-col gap-[3vh] items-center px-[5vw] py-[3vh]'>
			<GameHeader />
			<article className='w-full flex flex-col items-center gap-8'>
					<TypingMachine
						text={`${t('leaderboardPage.title')}`}
						speed={150}
						className='text-3xl lg:text-5xl'
						{...{ setIsDone }}
					/>
				</article>

			<section className='w-full sm:w-[60%] lg:w-[50%] h-full flex flex-col items-center gap-2 sm:gap-4 lg:gap-8'>
				{scoresList.map((player, idx) => (
					<InactivePlayer
						key={player.name}
						name={player.name}
						score={player.score}
						playerIndex={idx + 1}
					/>
				))}
			</section>
		</main>
	)
}

export default LeaderboardPage