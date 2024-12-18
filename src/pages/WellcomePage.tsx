import { ReactNode, useEffect, useState } from 'react'
import i18next from 'i18next'
import { ToggleButton, TypingMachine } from '@molecules'
import { IcMoon, IcSun } from '@atoms'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'



const WellcomePage = () => {
	const { t } = useTranslation('Pages')
	const navigate = useNavigate()
	const currentLanguage = localStorage.getItem('LANGUAGE') || 'es'
	const currentTheme = localStorage.getItem('THEME') || 'light'

	const [selectedLanguage, setSelectedLanguage] =
		useState<string>(currentLanguage)
	const [selectedTheme, setSelectedTheme] = useState<string>(currentTheme)

	useEffect(() => {
		localStorage.setItem('LANGUAGE', selectedLanguage)
		i18next.changeLanguage(selectedLanguage)
	}, [selectedLanguage])

	useEffect(() => {
		document.documentElement.classList.toggle('dark', selectedTheme === 'dark')
		localStorage.setItem('THEME', selectedTheme)
	}, [selectedTheme])

	interface ILanguageOptions {
		[key: string]: string
	}

	const languageOptions: ILanguageOptions = {
		es: 'ES',
		en: 'EN',
	}

	interface IThemeOptions {
		[key: string]: ReactNode
	}

	const themeOptions: IThemeOptions = {
		light: <IcSun className='w-6 h-6 fill-neutral-700 dark:fill-neutral-300' />,
		dark: <IcMoon className='w-6 h-6 fill-neutral-700 dark:fill-neutral-300' />,
	}

	return (
		<main className='w-screen h-screen  text-neutral-700 dark:text-neutral-300 flex flex-col items-center p-10'>
			<header className='w-full'>
				<section className='flex justify-end gap-2'>
					<ToggleButton
						options={languageOptions}
						currentValue={selectedLanguage}
						onChange={setSelectedLanguage}
					>
						<p className='text-sm font-semibold'>
							{languageOptions[selectedLanguage] ?? ''}
						</p>
					</ToggleButton>
					<ToggleButton
						options={themeOptions}
						currentValue={selectedTheme}
						onChange={setSelectedTheme}
					>
						{themeOptions[selectedTheme] ?? <></>}
					</ToggleButton>
				</section>
			</header>
			<section className='w-full h-full flex flex-col items-center justify-around'>
				<TypingMachine text={`${t('wellcomePage.name')}`} speed={200} className='text-6xl'/>
				<button onClick={() => navigate('/players')} className='bg-indigo-500 text-white text-lg rounded px-8 py-2 animate-bounce '>{`${t('wellcomePage.button')}`}</button>
			</section>
		</main>
	)
}

export default WellcomePage
