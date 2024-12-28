import { IcDices, IcSettings, IcTrophy } from '@atoms'
import i18next from 'i18next'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const GameHeader = () => {
	const navigate = useNavigate()
	const { pathname } = useLocation()

	useEffect(() => {
		const currentLanguage = localStorage.getItem('LANGUAGE') || 'es'
		i18next.changeLanguage(currentLanguage)
	}, [])

	useEffect(() => {
		const currentTheme = localStorage.getItem('THEME') || 'light'
		document.documentElement.classList.toggle('dark', currentTheme === 'dark')
	}, [])

	return (
		<header className='w-full'>
			<section className='flex justify-end gap-2'>
				{!pathname.includes('settings') && (
					<button
						className='cursor-pointer w-7 h-7 flex items-center justify-center  rounded border border-neutral-500 dark:border-neutral-300'
						onClick={() => navigate('/settings')}
					>
						<IcSettings className='w-6 h-6 fill-neutral-700 dark:fill-neutral-300' />
					</button>
				)}
				{pathname.includes('game') && (
					<button
						className='cursor-pointer w-7 h-7 flex items-center justify-center  rounded border border-neutral-500 dark:border-neutral-300'
						onClick={() => navigate('/leaderboard')}
					>
						<IcTrophy className='w-6 h-6 fill-neutral-700 dark:fill-neutral-300' />
					</button>
				)}
				{pathname.includes('leaderboard') && (
					<button
						className='cursor-pointer w-7 h-7 flex items-center justify-center  rounded border border-neutral-500 dark:border-neutral-300'
						onClick={() => navigate('/game')}
					>
						<IcDices className='w-6 h-6 fill-neutral-700 dark:fill-neutral-300' />
					</button>
				)}
			</section>
		</header>
	)
}

export default GameHeader
