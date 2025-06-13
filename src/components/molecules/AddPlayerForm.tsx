import { IPlayer } from '@interfaces'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface IAddPlayerForm {
	setIsOpen: (value: boolean) => void
	playersList: IPlayer[]
	setPlayersList: (value: IPlayer[]) => void
}

const AddPlayerForm = ({
	setIsOpen,
	playersList,
	setPlayersList,
}: IAddPlayerForm) => {
	const { t } = useTranslation('Pages')

	const [newName, setNewName] = useState('')
	const [showNameWarning, setShowNameWarning] = useState(false)
	const players = JSON.parse(localStorage.getItem('PLAYERS') || '[]')

	const hdlNewName = (value: string) => {
		setNewName(value)
		if (players.includes(value)) {
			setShowNameWarning(true)
		} else {
			setShowNameWarning(false)
		}
	}

	const hdlAddPlayer = () => {
		const newPlayer = {
			name: newName,
			active: false,
			score: 0,
			id: playersList.length,
		}
		const updatedPlayers = [...playersList, newPlayer]
		localStorage.setItem('SCORES', JSON.stringify(updatedPlayers))
		localStorage.setItem('PLAYERS', JSON.stringify([...players, newName]))

		setPlayersList(updatedPlayers)
		setIsOpen(false)
		setNewName('')
	}

	const hdlCancel = () => {
		setNewName('')
		setIsOpen(false)
	}

	return (
		<section className='flex flex-col gap-8 items-center w-full sm:px-8 text-neutral-700 dark:text-neutral-200 '>
			<h2 className='text-2xl font-bold'>{`${t('editPage.addPlayer')}`}</h2>
			<fieldset className='w-full py-2'>
				<label
					htmlFor='new-name'
					className='text-sm px-1'
				>{`${t('playersPage.inputLabel')}`}</label>
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
			<article className='w-full justify-between flex sm:justify-end gap-6'>

					<button
						className='secondary-button'
						onClick={hdlCancel}
					>
						{t('editPage.buttonCancel')}
					</button>
					<button
						className='primary-button'
						onClick={() => hdlAddPlayer()}
						disabled={showNameWarning || !newName}
					>
						{t('editPage.buttonConfirm')}
					</button>
			</article>
		</section>
	)
}

export default AddPlayerForm
