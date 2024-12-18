import React from 'react'
import type { IIconProps } from './Icons.interfaces'

const IcPlus = ({ className }: IIconProps) => (
	<svg
		viewBox='0 0 13 13'
		xmlns='http://www.w3.org/2000/svg'
		className={`${className} shrink-0`}
	>
		<path d='M12 5.3335C12.25 5.3335 12.5 5.5835 12.5 5.8335V6.8335C12.5 7.11475 12.25 7.3335 12 7.3335H7.5V11.8335C7.5 12.1147 7.25 12.3335 7 12.3335H6C5.71875 12.3335 5.5 12.1147 5.5 11.8335V7.3335H1C0.71875 7.3335 0.5 7.11475 0.5 6.8335V5.8335C0.5 5.5835 0.71875 5.3335 1 5.3335H5.5V0.833496C5.5 0.583496 5.71875 0.333496 6 0.333496H7C7.25 0.333496 7.5 0.583496 7.5 0.833496V5.3335H12Z' />
	</svg>
)
export default React.memo(IcPlus)
