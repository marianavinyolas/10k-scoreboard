import { IcPlus } from '@atoms'
import { TypingMachine } from '@molecules'
import { SetupHeader } from '@organisms'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const PlayersPage = () => {
	const { t } = useTranslation('Pages')
	const navigate = useNavigate()
	const inputRef = useRef<HTMLInputElement>(null)
	const [players, setPlayers] = useState<string[]>([])
	const [isDone, setIsDone] = useState(false)
	const [showNameWarning, setShowNameWarning] = useState(false)

	const [newName, setNewName] = useState('')

	const hdlNewName = (value: string) => {
		setNewName(value)
		if (players.includes(value)) {
			setShowNameWarning(true)
		} else {
			setShowNameWarning(false)
		}
	}
	const hdlAddPlayer = () => {
		if (players.includes(newName)) {
			setShowNameWarning(true)
		} else {
			setPlayers(prev => [...prev, newName])
			setNewName('')
			setShowNameWarning(false)
			inputRef.current?.focus()
		}
	}

	const hdlNext = () => {
		if (players.length > 1) {
			localStorage.setItem('PLAYERS', JSON.stringify(players))
			navigate('/game')
			}
	}

	return (
		<main className='w-screen h-dvh  text-neutral-700 dark:text-neutral-200 flex flex-col gap-[3vh] items-center px-[5vw] py-[3vh]'>
			<SetupHeader items={['theme']} />
			<section className='w-full sm:w-[60%] lg:w-[50%] h-full flex flex-col items-center gap-2 sm:gap-4 lg:gap-8'>
				<article className='w-full flex flex-col items-center gap-8'>
					<TypingMachine
						text={`${t('playersPage.title')}`}
						speed={150}
						className='text-3xl lg:text-5xl'
						{...{ setIsDone }}
					/>
				</article>
				<article className='w-full flex-1'>
					<fieldset className='py-2'>
						<label
							htmlFor='new-name'
							className='text-sm px-1'
						>{`${t('playersPage.inputLabel')}`}</label>
						<div className='w-full h-12 flex gap-2'>
							<input
								id='new-name'
								type='text'
								ref={inputRef}
								className='bg-transparent flex-1 px-2 border border-sky-600 rounded focus:outline-0 focus:ring-0'
								onChange={e => hdlNewName(e.target.value)}
								value={newName}
							/>
							<button
								onClick={hdlAddPlayer}
								className='bg-sky-700 text-lg px-3 py-2 rounded disabled:bg-slate-500'
								disabled={!newName.trim()}
							>
								<IcPlus className='w-6 h-6 fill-neutral-200' />{' '}
							</button>
						</div>
						{showNameWarning ? (
							<p className='text-sm text-red-500 tracking-wide font-medium pt-1'>
								{t('playersPage.inputWarning')}
							</p>
						) : (
							<span className='text-sm p-2 bg-transparent' />
						)}
					</fieldset>

					<section id='players-list' className='flex flex-col gap-2'>
						{players.length > 0 &&
							players.map(item => (
								<div
									className='w-full p-2 border border-purple-700 rounded'
									key={item}
								>
									<p>{item}</p>
								</div>
							))}
					</section>
				</article>
				<article className='py-1'>
					<p
						className={`text-sm lg:text-base ${isDone && players.length < 2 ? 'animate-pulse' : 'hidden'}`}
					>
						{t('playersPage.text')}
					</p>
				</article>
				<article className='w-full flex justify-center pb-4'>
					<button
						onClick={hdlNext}
						disabled={players.length < 2}
						className='bg-sky-700 text-white text-lg rounded px-8 py-2 disabled:bg-slate-500'
					>{`${t('playersPage.buttonContinue')}`}</button>
				</article>
			</section>
		</main>
	)
}

export default PlayersPage
