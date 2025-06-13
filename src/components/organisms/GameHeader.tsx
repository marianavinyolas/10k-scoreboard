import { IcDices, IcTrophy, IcReset, IcSettings, IcClose } from '@atoms'
import { Modal } from '@molecules'
import i18next from 'i18next'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

const GameHeader = () => {
	const { t } = useTranslation('Pages')
	const { pathname } = useLocation()

	const navigate = useNavigate()

	const [isOpen, setIsOpen] = useState(false)
	useEffect(() => {
		const currentLanguage = localStorage.getItem('LANGUAGE') || 'es'
		i18next.changeLanguage(currentLanguage)
	}, [])

	useEffect(() => {
		const currentTheme = localStorage.getItem('THEME') || 'light'
		document.documentElement.classList.toggle('dark', currentTheme === 'dark')
	}, [])

	const hdlLeaveGame = () => {
		localStorage.removeItem('SCORES')
		localStorage.removeItem('WINNER')
		localStorage.removeItem('PLAYERS')
		navigate('/wellcome')
	}
	
	const hdlRestartGame = () => {
		localStorage.removeItem('WINNER')
		localStorage.removeItem('SCORES')
		pathname === '/game' ? window.location.reload() : navigate('/game')
	}

	return (
		<header className='w-full px-2'>
			<section className='flex justify-between gap-4'>
				<button
					onClick={() => setIsOpen(true)}
					className='w-8 h-8 flex items-center justify-center rounded border border-neutral-50 dark:border-neutral-300 bg-red-600 dark:bg-red-700/70'
				>
					<IcReset className='w-4 h-4 fill-neutral-50 dark:fill-neutral-300 ' />
				</button>
				<div className='flex gap-4'>
					<NavLink
						to='/edit'
						className={({ isActive }) =>
							`cursor-pointer w-8 h-8 flex items-center justify-center rounded ${
								isActive
									? 'border-2 border-sky-500 dark:border-sky-500 shadow-md bg-sky-200 dark:bg-sky-900'
									: 'border border-neutral-500 dark:border-neutral-300'
							}`
						}
					>
						<IcSettings className='w-6 h-6 fill-neutral-700 dark:fill-neutral-300' />
					</NavLink>
					<NavLink
						to='/leaderboard'
						className={({ isActive }) =>
							`cursor-pointer w-8 h-8 flex items-center justify-center rounded ${
								isActive
									? 'border-2 border-sky-500 dark:border-sky-500 shadow-md bg-sky-200 dark:bg-sky-900'
									: 'border border-neutral-500 dark:border-neutral-300'
							}`
						}
					>
						<IcTrophy className='w-6 h-6 fill-neutral-700 dark:fill-neutral-300' />
					</NavLink>
					<NavLink
						to='/game'
						className={({ isActive }) =>
							`cursor-pointer w-8 h-8 flex items-center justify-center rounded  ${
								isActive
									? 'border-2 border-sky-500 dark:border-sky-500 shadow-md bg-sky-200 dark:bg-sky-900'
									: 'border border-neutral-500 dark:border-neutral-300'
							}`
						}
					>
						<IcDices className='w-6 h-6 fill-neutral-700 dark:fill-neutral-300' />
					</NavLink>
				</div>
			</section>
			<Modal isOpen={isOpen}>
				<section className='flex flex-col gap-8 items-center w-full text-neutral-700 dark:text-neutral-200 relative'>
				<button
					onClick={() => setIsOpen(false)}
					className='w-8 h-8 flex items-center justify-center rounded absolute -top-2 -right-2'
				>
					<IcClose className='w-4 h-4 fill-neutral-700 dark:fill-neutral-300 ' />
				</button>
					<article className='flex flex-col items-center gap-6 py-4'>
						<h2 className='text-2xl font-bold'>
							{`${t('header.leaveTitle')}`}
						</h2>
						<p className='text-center sm:text-balance'>{`${t('header.leaveDescription')}`}</p>
					</article>
					<article className='w-full justify-between flex sm:justify-end gap-6'>
						<button onClick={hdlLeaveGame} className='primary-button'>
							{`${t('header.leaveButton')}`}
						</button>
						<button onClick={hdlRestartGame} className='primary-button'>
							{`${t('header.restartButton')}`}
						</button>
					</article>
				</section>
			</Modal>
		</header>
	)
}

export default GameHeader
