import React from 'react'
import type { IIconProps } from './Icons.interfaces'

const IcTrophy = ({ className }: IIconProps) => (
	<svg
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={`${className} shrink-0`}
	>
		<path
			d='M14.2188 8.34375L12.8438 8.15625L12.25 6.9375C12.1562 6.71875 11.8438 6.71875 11.7188 6.9375L11.125 8.15625L9.75 8.34375C9.5 8.375 9.40625 8.6875 9.59375 8.875L10.5625 9.8125L10.3438 11.1562C10.3125 11.4062 10.5625 11.5938 10.7812 11.4688L12 10.8438L13.1875 11.4688C13.4062 11.5938 13.6562 11.4062 13.625 11.1562L13.4062 9.8125L14.375 8.875C14.5625 8.6875 14.4688 8.375 14.2188 8.34375ZM17 6V4.5C17 4.25 16.75 4 16.5 4H7.5C7.21875 4 7 4.25 7 4.5V6H3.5C3.21875 6 3 6.25 3 6.5V8.40625C3 10.3125 5.125 12.3125 7.96875 12.875C8.84375 14.6875 10.0938 15.625 11.25 15.9062V18.5H9.25C8.53125 18.5 8 19.0625 8 19.75C8 19.9062 8.09375 20 8.25 20H15.75C15.875 20 16 19.9062 16 19.75C16 19.0625 15.4375 18.5 14.75 18.5H12.75V15.9062C13.875 15.625 15.1562 14.6875 16 12.875C18.8438 12.3438 21 10.3125 21 8.40625V6.5C21 6.25 20.75 6 20.5 6H17ZM4.5 8.40625V7.5H7C7 8.75 7.0625 9.90625 7.375 11.1562C5.65625 10.5625 4.5 9.3125 4.5 8.40625ZM12 14.5C10.3438 14.5 8.5 12.0625 8.5 7.75V5.5H15.5V7.75C15.5 12.1562 13.5938 14.5 12 14.5ZM19.5 8.40625C19.5 9.3125 18.3125 10.5625 16.5938 11.1562C16.9062 9.90625 17 8.75 17 7.5H19.5V8.40625Z'
		/>
	</svg>
)
export default React.memo(IcTrophy)