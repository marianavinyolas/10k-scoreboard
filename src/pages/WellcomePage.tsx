import { ReactNode, useEffect, useState } from 'react'
import i18next from 'i18next'
import { ToggleButton } from '@molecules'
import { IcMoon, IcSun } from '@atoms'
import { useTranslation } from 'react-i18next'

const WellcomePage = () => {
	const { t } = useTranslation('Pages')
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
		<main className='w-screen h-screen  text-neutral-700 dark:text-neutral-300 flex flex-col items-center font-mono'>
			<header className='w-[90%] sm:w-[80%] md:w-[70%] border border-pink-300'>
				<section className='flex justify-end gap-2 p-4'>
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
			<section className='flex flex-col items-center'>
				<h1>{`${t('wellcomePage.title')}`}</h1>
				<h1>{`${t('wellcomePage.name')}`}</h1>
				<button>{`${t('wellcomePage.button')}`}</button>
			</section>
		</main>
	)
}

export default WellcomePage
