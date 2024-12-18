import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SetupHeader } from '@organisms'
import { TypingMachine } from '@molecules'
import { useState } from 'react'

const WellcomePage = () => {
	const { t } = useTranslation('Pages')
	const navigate = useNavigate()
	const [isDone, setIsDone] = useState(false)

	return (
		<main className='w-screen h-screen  text-neutral-700 dark:text-neutral-300 flex flex-col items-center p-10'>
			<SetupHeader items={['theme', 'language']}/>
			<section className='w-full h-full flex flex-col items-center justify-around'>
				<TypingMachine
					text={`${t('wellcomePage.name')}`}
					speed={200}
					className='text-6xl'
					{...{ setIsDone }}
				/>
				<button
					onClick={() => navigate('/players')}
					className={`bg-sky-700 text-white text-lg rounded px-8 py-2 animate-bounce ${!isDone && 'invisible '} `}
				>{`${t('wellcomePage.button')}`}</button>
			</section>
		</main>
	)
}

export default WellcomePage
