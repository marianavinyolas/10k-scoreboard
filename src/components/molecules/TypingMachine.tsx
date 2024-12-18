import { FC, useEffect, useState } from 'react'

interface TypingMachineProps {
	text: string // The string to type out
	speed?: number // Time delay between letters in milliseconds
	className?:string
}
const TypingMachine: FC<TypingMachineProps> = ({ text, speed = 100, className }) => {
	const [displayedText, setDisplayedText] = useState('') // For showing typed characters
	const [index, setIndex] = useState(0) // Tracks the current character index

	useEffect(() => {
		// Typing effect interval
		const timer = setTimeout(() => {
			if (index < text.length) {
				setDisplayedText(prev => prev + text.charAt(index))
				setIndex(prev => prev + 1)
			}
		}, speed)

		return () => clearTimeout(timer) // Cleanup to prevent memory leaks
	}, [index, text, speed])

	return <p className={`${className}`}>{displayedText}</p>
}

export default TypingMachine
