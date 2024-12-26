import React from 'react'
import type { IIconProps } from './Icons.interfaces'

const IcSettings = ({ className }: IIconProps) => (
	<svg
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={`${className} shrink-0`}
	>
		<path d='M18.125 11.4062L19.125 10.8438C19.4062 10.6875 19.5625 10.3438 19.4687 10C19.125 8.6875 18.4062 7.5 17.4687 6.53125C17.2187 6.3125 16.8437 6.25 16.5625 6.40625L15.5625 7C15.25 6.75 14.9062 6.5625 14.5312 6.40625V5.25C14.5312 4.90625 14.3125 4.625 13.9687 4.53125C12.6875 4.1875 11.2812 4.1875 9.99997 4.53125C9.65622 4.625 9.43747 4.90625 9.43747 5.25V6.40625C9.06247 6.5625 8.71872 6.75 8.40622 7L7.40622 6.40625C7.12497 6.25 6.74997 6.3125 6.49997 6.53125C5.56247 7.5 4.84372 8.6875 4.49997 10C4.40622 10.3438 4.56247 10.6875 4.84372 10.8438L5.84372 11.4062C5.81247 11.625 5.81247 11.8125 5.81247 12.0312C5.81247 12.2188 5.81247 12.4062 5.84372 12.5938L4.84372 13.1875C4.56247 13.3438 4.40622 13.6875 4.49997 14.0312C4.84372 15.3438 5.56247 16.5312 6.49997 17.5C6.74997 17.7188 7.12497 17.7812 7.40622 17.625L8.40622 17.0312C8.71872 17.2812 9.06247 17.4688 9.43747 17.625V18.7812C9.43747 19.125 9.65622 19.4062 9.99997 19.5C11.2812 19.8438 12.6875 19.8438 13.9687 19.5C14.3125 19.4062 14.5312 19.125 14.5312 18.7812V17.625C14.9062 17.4688 15.25 17.2812 15.5625 17.0312L16.5625 17.625C16.8437 17.7812 17.2187 17.7188 17.4687 17.5C18.4062 16.5312 19.125 15.3438 19.4687 14.0312C19.5625 13.6875 19.4062 13.3438 19.125 13.1875L18.125 12.5938C18.1562 12.2188 18.1562 11.8125 18.125 11.4062ZM16.4687 13.4062L17.8437 14.1875C17.5937 14.8438 17.25 15.4688 16.7812 16L15.4062 15.2188C14.4062 16.0625 14.2812 16.1562 13.0312 16.5938V18.1875C12.6875 18.25 12.3437 18.2812 11.9687 18.2812C11.625 18.2812 11.2812 18.25 10.9375 18.1875V16.5938C9.68747 16.1562 9.53122 16.0625 8.56247 15.2188L7.18747 16C6.71872 15.4688 6.37497 14.8438 6.12497 14.1875L7.49997 13.4062C7.24997 12.0938 7.24997 11.9375 7.49997 10.625L6.12497 9.84375C6.37497 9.1875 6.71872 8.5625 7.18747 8.03125L8.56247 8.8125C9.56247 7.96875 9.68747 7.875 10.9375 7.4375V5.84375C11.2812 5.78125 11.625 5.75 12 5.75C12.3437 5.75 12.6875 5.78125 13.0312 5.84375V7.4375C14.2812 7.875 14.4375 7.96875 15.4062 8.8125L16.7812 8.03125C17.25 8.5625 17.5937 9.1875 17.8437 9.84375L16.4687 10.625C16.7187 11.9375 16.7187 12.0938 16.4687 13.4062ZM12 9C10.3437 9 8.99997 10.375 8.99997 12C8.99997 13.6562 10.3437 15 12 15C13.625 15 15 13.6562 15 12C15 10.375 13.625 9 12 9ZM12 13.5C11.1562 13.5 10.5 12.8438 10.5 12C10.5 11.1875 11.1562 10.5 12 10.5C12.8125 10.5 13.5 11.1875 13.5 12C13.5 12.8438 12.8125 13.5 12 13.5Z' />
	</svg>
)
export default React.memo(IcSettings)
