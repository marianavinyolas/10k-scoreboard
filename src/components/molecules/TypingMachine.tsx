import { FC, useEffect, useState } from 'react'

interface TypingMachineProps {
	text: string
	speed?: number
	className?: string
	setIsDone: (value: boolean) => void
}
const TypingMachine: FC<TypingMachineProps> = ({
	text,
	speed = 100,
	className,
	setIsDone,
}) => {
	const [displayedText, setDisplayedText] = useState(text.charAt(0))
	const [index, setIndex] = useState(1)

	useEffect(() => {
		// Typing effect interval
		const timer = setTimeout(() => {
			if (index < text.length) {
				setDisplayedText(prev => prev + text.charAt(index))
				setIndex(prev => prev + 1)
			} else {
				setIsDone(true)
			}
		}, speed)

		return () => clearTimeout(timer) // Cleanup to prevent memory leaks
	}, [index, text, speed])

	return <p className={`${className}`}>{displayedText}</p>
}

export default TypingMachine
