import { IPlayer } from '@interfaces'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface IAddPlayerForm {
	setIsOpen: (value: boolean) => void
	playersList: IPlayer[]
	setPlayersList: (value: IPlayer[]) => void
}

const AddPlayerForm = ({ setIsOpen, playersList, setPlayersList}: IAddPlayerForm) => {
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
		setIsOpen(false)}

	return (
		<section className='flex flex-col gap-4 items-center w-full p-2 sm:p-8 text-neutral-700 dark:text-neutral-200 '>
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
			<article className='w-full flex justify-between sm:justify-end items-center gap-4 font-medium'>
				<div className='w-full sm:w-[70%] flex gap-8'>
					<button
						className='w-full border border-sky-600 text-sky-600  dark:border-sky-400 dark:text-sky-400 rounded py-2 px-4 hover:scale-105 transition-all duration-300'
						onClick={hdlCancel}
					>
						{t('editPage.buttonCancel')}
					</button>
					<button
						className='w-full bg-sky-600 rounded py-2 px-4 hover:scale-105 transition-all duration-300 disabled:bg-slate-500'
						onClick={() => hdlAddPlayer()}
						disabled={showNameWarning || !newName}
					>
						{t('editPage.buttonConfirm')}
					</button>
				</div>
			</article>
		</section>
	)
}

export default AddPlayerForm
