import { IcPlus } from '@atoms'
import { IPlayer } from '@interfaces'
import {
	AddPlayerForm,
	DeletePlayerForm,
	EditPlayerCard,
	EditPlayerForm,
	Modal,
	TypingMachine,
} from '@molecules'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { GameHeader } from '@organisms'

const EditPage = () => {
	const { t } = useTranslation('Pages')
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

	const hdlOpenDelete = (playerIndex: number) => {
		setIsOpenDeleteModal(true)
		const selectedPlayer =
			playersList.filter(item => item.id === playerIndex).pop() || null

		setPlayer(selectedPlayer)
	}

	const hdlOpenEdit = (playerIndex: number) => {
		setIsOpenEditModal(true)
		const selectedPlayer =
			playersList.filter(item => item.id === playerIndex).pop() || null

		setPlayer(selectedPlayer)
	}

	const hdlCancel = () => {
		setIsOpenDeleteModal(false)
		setIsOpenEditModal(false)
		setPlayer(null)
	}

	return (
		<main className='w-screen h-dvh  text-neutral-700 dark:text-neutral-200 flex flex-col gap-[3vh] items-center px-2 sm:px-[5vw] py-[3vh]'>
			<GameHeader />
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
					<EditPlayerCard
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
				<DeletePlayerForm
					onCancel={hdlCancel}
					{...{ player, playersList, setPlayersList }}
				/>
			</Modal>
			<Modal isOpen={isOpenEditModal}>
				<EditPlayerForm
					onCancel={hdlCancel}
					{...{ player, playersList, setPlayersList }}
				/>
			</Modal>
		</main>
	)
}

export default EditPage
