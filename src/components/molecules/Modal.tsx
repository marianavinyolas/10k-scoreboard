import React, { useLayoutEffect, useRef } from 'react'

interface IModalProps {
	isOpen: boolean
	// onClose?: () => void
	children: React.ReactNode
	className?: string
}

const Modal = ({ isOpen, children, className }: IModalProps) => {
	const dialogRef = useRef<HTMLDialogElement>(null)

	useLayoutEffect(() => {
		if (dialogRef.current?.open && !isOpen) {
			dialogRef.current?.close()
		} else if (!dialogRef.current?.open && isOpen) {
			dialogRef.current?.showModal()
		}
	}, [isOpen])
	return (
		<dialog
			ref={dialogRef}
			className={`w-[95%] sm:w-[70%] lg:w-[50%] rounded-md bg-neutral-100 dark:bg-slate-600 p-4 backdrop:backdrop-blur-sm ${className}`}
		>
			{children}
		</dialog>
	)
}

export default Modal
