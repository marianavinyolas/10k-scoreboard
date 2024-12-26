import { IcPlus } from '@atoms'
import { IPlayer } from '@interfaces'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface IActivePlayerProps {
	player: IPlayer
	onAddScore: (index: number, score: number) => void
}
const ActivePlayer: FC<IActivePlayerProps> = ({ player, onAddScore }) => {
	const { t } = useTranslation('Pages')
	const [newScore, setNewScore] = useState<number>(0)
	const [invalidScore, setInvalidScore] = useState(false)

	const hdlScoreChange = (value: string) => {
		const newScore = value === '' ? 0 : parseInt(value)
		if (newScore % 50 !== 0) {
			setInvalidScore(true)
		} else {
			setInvalidScore(false)
		}
		setNewScore(newScore)
	}

	return (
		<article className='w-full h-14 flex items-center gap-4 border-2 border-sky-600 rounded bg-sky-100 dark:bg-slate-900 text-lg'>
			<div className='w-10 flex justify-center border-r border-sky-600'>
				{player.id + 1}
			</div>
			<div className='w-14 flex justify-end pr-2 border-r border-sky-600'>
				{player.score}
			</div>
			<div className='flex-1 truncate'>{player.name}</div>
			<div className='h-full flex items-center border-l border-sky-600'>
				<input
					type='number'
					className='w-20 h-full px-2 focus:outline-0 focus:ring-0 rounded-none bg-transparent placeholder:text-sm'
					autoFocus={true}
					onChange={e => hdlScoreChange(e.target.value)}
					value={newScore || ''}
					step={50}
					placeholder={t('gamePage.scorePlaceholder')}
				/>
				<button
					className='px-3 h-full bg-sky-600 text-white disabled:bg-slate-500 '
					onClick={() => onAddScore(player.id, newScore || 0)}
					disabled={invalidScore}
				>
					<IcPlus className='w-5 h-5 fill-neutral-200' />{' '}
				</button>
			</div>
		</article>
	)
}

export default ActivePlayer
