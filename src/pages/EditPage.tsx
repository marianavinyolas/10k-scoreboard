import { IcPlus } from '@atoms'
import { IPlayer } from '@interfaces'
import { AddPlayerForm, EditPlayer, Modal, TypingMachine } from '@molecules'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { GameHeader } from '@organisms'

const EditPage = () => {
	const { t } = useTranslation('Pages')
	const navigate = useNavigate()
	const [playersList, setPlayersList] = useState<IPlayer[]>([])
	const [, setIsDone] = useState(false)
	const [isOpenModal, setIsOpenModal] = useState(false)
	const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
	const [isOpenEditModal, setIsOpenEditModal] = useState(false)
	const [player, setPlayer] = useState<IPlayer | null>(null)

	useEffect(() => {
		const scores = JSON.parse(localStorage.getItem('SCORES') || '[]')
		const winners = JSON.parse(localStorage.getItem('WINNER') || '[]')

		if (scores.length === 0) {
			let ranking = JSON.parse(localStorage.getItem('PLAYERS') || '[]')
			ranking = ranking.map((name: string, index: number) => ({
				name,
				active: index === 0,
				score: 0,
				id: index,
			}))
			setPlayersList(ranking)
		} else {
			const ranking = [...winners, ...scores]

			setPlayersList(ranking)
		}
	}, [])
	const hdlResetGame = () => {
		localStorage.removeItem('WINNER')
		localStorage.removeItem('SCORES')
		localStorage.removeItem('PLAYERS')

		navigate('/wellcome')
	}
	const hdlOpenDelete = (playerIndex: number) => {
		setIsOpenDeleteModal(true)
		const selectedPlayer =
			playersList.filter(item => item.id === playerIndex).pop() || null

		setPlayer(selectedPlayer)
	}

	const hdlOpenEdit = () => {
		setIsOpenEditModal(true)
	}
	const hdlDeletePlayer = () => {
		const newList = playersList
			.filter(item => item.id !== player?.id)
			.map((item, idx) => ({ ...item, id: idx }))
		setPlayersList(newList)
		localStorage.setItem('SCORES', JSON.stringify(newList))
		hdlCancel()
	}

	const hdlCancel = () => {
		setIsOpenDeleteModal(false)
		setIsOpenEditModal(false)
		setPlayer(null)
	}

	return (
		<main className='w-screen h-dvh  text-neutral-700 dark:text-neutral-200 flex flex-col gap-[3vh] items-center px-2 sm:px-[5vw] py-[3vh]'>
			<GameHeader reset={hdlResetGame} />
			<article className='w-full flex flex-col items-center gap-8'>
				<TypingMachine
					text={`${t('editPage.title')}`}
					speed={150}
					className='text-3xl lg:text-5xl'
					{...{ setIsDone }}
				/>
			</article>
			<section className='w-full sm:w-[60%] lg:w-[50%] h-full flex flex-col items-center gap-2 sm:gap-4 lg:gap-8'>
				{playersList.map((player, idx) => (
					<EditPlayer
						key={`${player.name}-${idx}`}
						name={player.name}
						score={player.score}
						playerIndex={idx}
						onDelete={hdlOpenDelete}
						onEdit={hdlOpenEdit}
					/>
				))}
				<button
					onClick={() => setIsOpenModal(true)}
					className='w-full flex gap-2 py-2 border border-sky-600 rounded bg-gray-100 dark:bg-slate-800 mt-4'
				>
					<div className='flex-1 px-2 justify-center'>
						<span className='flex justify-center'>
							{`${t('editPage.addPlayer')}`}
						</span>
					</div>
					<div className='w-20 flex justify-center items-center border-l border-sky-600 '>
						<IcPlus className='w-5 h-5 fill-sky-600' />
					</div>
				</button>
			</section>
			<Modal isOpen={isOpenModal}>
				<AddPlayerForm
					setIsOpen={setIsOpenModal}
					{...{ playersList, setPlayersList }}
				/>
			</Modal>
			<Modal isOpen={isOpenDeleteModal}>
				<section className='flex flex-col gap-8 items-center w-full text-neutral-700 dark:text-neutral-200'>
					<article className='flex flex-col items-center gap-6 py-4'>
						<h2 className='text-2xl font-bold'>
							{`${t('editPage.deletePlayerTitle')}`}
						</h2>
						<p className='text-center sm:text-balance'>{`${t('editPage.deletePlayerDescription')}`}</p>
						<h1 className='text-3xl uppercase'>{player?.name}</h1>
					</article>
					<article className='w-full justify-between flex sm:justify-end gap-6'>
						<button
							className=' border border-sky-600 text-sky-600  dark:border-sky-400 dark:text-sky-400 rounded py-2 px-4 hover:scale-105 transition-all duration-300'
							onClick={hdlCancel}
						>
							{`${t('editPage.buttonCancel')}`}
						</button>
						<button
							onClick={hdlDeletePlayer}
							className=' border border-sky-600 bg-sky-600 rounded py-2 px-4 hover:scale-105 transition-all duration-300'
						>
							{`${t('editPage.buttonDelete')}`}
						</button>
					</article>
				</section>
			</Modal>
		</main>
	)
}

export default EditPage
