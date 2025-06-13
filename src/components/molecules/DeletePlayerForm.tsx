import { IPlayer } from '@interfaces'
import { useTranslation } from 'react-i18next'

interface IDeletePlayerForm {
	player: IPlayer | null
	playersList: IPlayer[]
	setPlayersList: (value: IPlayer[]) => void
	onCancel: () => void
}

const DeletePlayerForm = ({
	player,
	playersList,
	setPlayersList,
	onCancel,
}: IDeletePlayerForm) => {
	const { t } = useTranslation('Pages')

	const hdlDeletePlayer = () => {
		const newList = playersList
			.filter(item => item.id !== player?.id)
			.map((item, idx) => ({ ...item, id: idx }))
		setPlayersList(newList)
		localStorage.setItem('SCORES', JSON.stringify(newList))
		localStorage.setItem(
			'PLAYERS',
			JSON.stringify(newList.map(item => item.name))
		)
		onCancel()
	}

	return (
		<section className='flex flex-col gap-8 items-center w-full sm:px-8 text-neutral-700 dark:text-neutral-200'>
			<article className='flex flex-col items-center gap-6 py-4'>
				<h2 className='text-2xl font-bold'>
					{`${t('editPage.deletePlayerTitle')}`}
				</h2>
				<p className='text-center sm:text-balance'>{`${t('editPage.deletePlayerDescription')}`}</p>
				<h1 className='text-3xl uppercase'>{player?.name}</h1>
			</article>
			<article className='w-full justify-between flex sm:justify-end gap-6'>
				<button className='secondary-button' onClick={onCancel}>
					{`${t('editPage.buttonCancel')}`}
				</button>
				<button onClick={hdlDeletePlayer} className='primary-button'>
					{`${t('editPage.buttonDelete')}`}
				</button>
			</article>
		</section>
	)
}

export default DeletePlayerForm
