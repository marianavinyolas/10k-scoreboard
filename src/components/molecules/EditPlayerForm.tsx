import { IPlayer } from '@interfaces'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface IEditPlayerForm {
	player: IPlayer | null
	playersList: IPlayer[]
	setPlayersList: (value: IPlayer[]) => void
	onCancel: () => void
}

const EditPlayerForm = ({
	player,
	playersList,
	setPlayersList,
	onCancel,
}: IEditPlayerForm) => {
	const { t } = useTranslation('Pages')

	const [newName, setNewName] = useState(player?.name ?? '')
	const [newScore, setNewScore] = useState(player?.score ?? 0)

	const [showNameWarning, setShowNameWarning] = useState(false)
	const players = JSON.parse(localStorage.getItem('PLAYERS') || '[]')
	useEffect(() => {
		setNewName(player?.name ?? '')
		setNewScore(player?.score ?? 0)
	}, [player])

	const hdlNewName = (value: string) => {
		setNewName(value)
		if (players.includes(value)) {
			setShowNameWarning(true)
		} else {
			setShowNameWarning(false)
		}
	}
	const hdlNewScore = (value: string) => {
		setNewScore(parseInt(value))
	}

	const hdlEditPlayer = () => {
		const newList = playersList.map(item =>
			item.id === player?.id
				? { ...item, score: newScore, name: newName }
				: item
		)
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
			<h2 className='text-2xl font-bold'>
				{`${t('editPage.editPlayerTitle')}`}
			</h2>
			<article className='w-full'>
				<fieldset className='w-full py-2'>
					<label
						htmlFor='new-name'
						className='text-sm px-1'
					>{`${t('editPage.editNameLabel')}`}</label>
					<div className='w-full h-12 flex gap-2'>
						<input
							id='new-name'
							type='text'
							className='w-full bg-transparent px-2 border border-sky-600 dark:border-sky-400 rounded focus:outline-0 focus:ring-0'
							onChange={e => hdlNewName(e.target.value)}
							value={newName}
						/>
					</div>
					{showNameWarning ? (
						<p className='text-sm text-red-500 tracking-wide font-medium pt-1'>
							{t('playersPage.inputWarning')}
						</p>
					) : (
						<span className='text-sm p-2 bg-transparent' />
					)}
				</fieldset>
				<fieldset className='w-full py-2'>
					<label
						htmlFor='new-score'
						className='text-sm px-1'
					>{`${t('editPage.editScoreLabel')}`}</label>
					<div className='w-full h-12 flex gap-2'>
						<input
							id='new-score'
							type='number'
							className='w-full bg-transparent px-2 border border-sky-600 dark:border-sky-400 rounded focus:outline-0 focus:ring-0'
							onChange={e => hdlNewScore(e.target.value)}
							value={newScore}
							step={50}
							min={0}
							max={9950}
						/>
					</div>
				</fieldset>
			</article>
			<article className='w-full justify-between flex sm:justify-end gap-6'>
				<button className='secondary-button' onClick={onCancel}>
					{`${t('editPage.buttonCancel')}`}
				</button>
				<button
					onClick={hdlEditPlayer}
					disabled={showNameWarning || !newName}
					className='primary-button'
				>
					{`${t('editPage.buttonEdit')}`}
				</button>
			</article>
		</section>
	)
}

export default EditPlayerForm
