import { useEffect, useState } from 'react'
import i18next from 'i18next'
import { spainFlag, usaFlag } from '@assets'

const WellcomePage = () => {

	const currentLanguage = localStorage.getItem('LANGUAGE')
	const [selectedLanguage, setSelectedLanguage] = useState('')
	const [showFlags, setShowFlags] = useState(true)
	useEffect(() => {
		setSelectedLanguage(currentLanguage ?? 'es')
	}, [currentLanguage])

	const handleChangeLanguage = (language: string) => {
		setSelectedLanguage(language)
		i18next.changeLanguage(language)
		setShowFlags(false)
		localStorage.setItem('LANGUAGE', language)
	}

	return (
		<main className='w-screen h-screen  text-black dark:text-white flex flex-col relative'>
			<header className='absolute top-10 right-10'>
				<div className='bg-white'>
					{showFlags && (
						<section className='language-select'>
							<button
								className='language-btn'
								onClick={() => handleChangeLanguage('es')}
							>
								<img
									src={spainFlag}
									className='flag'
									alt='Spanish language flag'
								/>
							</button>
							<span
								className='language-btn'
								onClick={() => handleChangeLanguage('en')}
							>
								<img
									src={usaFlag}
									className='flag'
									alt='English language flag'
								/>
							</span>
						</section>
					)}
				</div>
				{selectedLanguage === 'es' && (
					<section
						className='cursor-pointer p-2 rounded border border-neutral-300'
						onClick={() => setShowFlags(!showFlags)}
					>
						<img src={spainFlag} className='flag' alt='Spanish language flag' />
					</section>
				)}
				{selectedLanguage === 'en' && (
					<section
						className='cursor-pointer p-2 rounded  border border-neutral-300'
						onClick={() => setShowFlags(!showFlags)}
					>
						<img src={usaFlag} className='flag' alt='English language flag' />
					</section>
				)}
			</header>
		</main>
	)
}

export default WellcomePage
