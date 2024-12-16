interface IToggleButton {
	children: React.ReactNode
	options: { [key: string]: React.ReactNode | string }
	currentValue: string
	onChange: (newValue: string) => void
}
const ToggleButton = ({
	children,
	options,
	currentValue,
	onChange,
}: IToggleButton) => {

	const hdlToggle = () => {
		const newOption = Object.keys(options).find(item => item !== currentValue)
		onChange(newOption ?? '')
	}

	return (
		<button
			className='cursor-pointer w-7 h-7 flex items-center justify-center  rounded border border-neutral-500 dark:border-neutral-300'
			onClick={hdlToggle}
		>
			{children}
		</button>
	)
}

export default ToggleButton
