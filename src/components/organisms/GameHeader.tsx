import { IcDices, IcTrophy, IcReset } from '@atoms'
import i18next from 'i18next'
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const GameHeader = ({ reset }: { reset: () => void }) => {
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
			<section className='flex justify-between gap-4'>
				<button
					onClick={reset}
					className='w-8 h-8 flex items-center justify-center rounded border border-red-500'
				>
					<IcReset className='w-5 h-5 fill-neutral-700 dark:fill-neutral-300' />
				</button>
				<div className='flex gap-4'>
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
		</header>
	)
}

export default GameHeader
