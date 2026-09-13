import { ReactNode, useEffect, useState } from 'react'
import i18next from 'i18next'
import { ToggleButton } from '@molecules'
import { IcMoon, IcSun } from '@atoms'
import {
	applyTheme,
	getStoredLanguage,
	getStoredTheme,
	setStoredLanguage,
	setStoredTheme,
} from '@utils'
interface ISetupHeaderProps {
	items: string[]
}

const SetupHeader = ({ items }: ISetupHeaderProps) => {
	const currentLanguage = getStoredLanguage()
	const currentTheme = getStoredTheme()

	const [selectedLanguage, setSelectedLanguage] =
		useState<string>(currentLanguage)
	const [selectedTheme, setSelectedTheme] = useState<string>(currentTheme)

	useEffect(() => {
		setStoredLanguage(selectedLanguage)
		i18next.changeLanguage(selectedLanguage)
	}, [selectedLanguage])

	useEffect(() => {
		applyTheme(selectedTheme)
		setStoredTheme(selectedTheme)
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
		<header className='w-full'>
			<section className='flex justify-end gap-2'>
				{items.includes('language') && (
					<ToggleButton
						options={languageOptions}
						currentValue={selectedLanguage}
						onChange={setSelectedLanguage}
					>
						<p className='text-sm font-semibold font-mono'>
							{languageOptions[selectedLanguage] ?? ''}
						</p>
					</ToggleButton>
				)}
				{items.includes('theme') && (
					<ToggleButton
						options={themeOptions}
						currentValue={selectedTheme}
						onChange={setSelectedTheme}
					>
						{themeOptions[selectedTheme] ?? <></>}
					</ToggleButton>
				)}
			</section>
		</header>
	)
}

export default SetupHeader
