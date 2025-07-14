import { useEffect } from 'react'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	onConfirm: () => void
	movieName: string
	isAdding: boolean
}

export const Modal = ({
	isOpen,
	onClose,
	onConfirm,
	movieName,
	isAdding
}: ModalProps) => {
	// Handle Escape key press
	useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose()
			}
		}
		if (isOpen) {
			document.addEventListener('keydown', handleEsc)
		}
		return () => {
			document.removeEventListener('keydown', handleEsc)
		}
	}, [isOpen, onClose])

	// Handle click outside modal
	const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onClose()
		}
	}

	if (!isOpen) return null

	return (
		<div
			className='fixed inset-0 z-50 flex items-center justify-center bg-gray-500/75 backdrop-blur-md transition-opacity duration-300 ease-in-out p-4'
			onClick={handleBackdropClick}
			role='dialog'
			aria-labelledby='dialog-title'
			aria-modal='true'
		>
			<div className='relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg transform overflow-hidden rounded-lg bg-white shadow-xl transition-all duration-300 ease-in-out'>
				<div className='px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
					<div className='flex flex-col sm:flex-row sm:items-start'>
						{/* Иконка */}
						<div className='mx-auto flex size-10 sm:size-12 items-center justify-center rounded-full bg-orange-100 sm:mx-0 sm:mr-4'>
							<svg
								className='size-5 sm:size-6 text-orange-600'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								stroke='currentColor'
								aria-hidden='true'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z'
								/>
							</svg>
						</div>

						{/* Контент */}
						<div className='mt-3 text-center sm:text-left sm:mt-0'>
							<h3
								className='text-lg sm:text-xl font-semibold text-gray-900'
								id='dialog-title'
							>
								Подтверждение
							</h3>
							<div className='mt-2'>
								<p className='text-sm sm:text-base text-gray-500'>
									Вы уверены, что хотите {isAdding ? 'добавить' : 'удалить'}{' '}
									<span className='font-medium'>"{movieName}"</span>{' '}
									{isAdding ? 'в избранное' : 'из избранного'}?
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Кнопки */}
				<div className='bg-gray-50 px-4 py-3 flex flex-col-reverse sm:flex-row-reverse sm:px-6 gap-2'>
					<button
						type='button'
						onClick={onConfirm}
						className='inline-flex justify-center rounded-md bg-orange-600 px-4 py-2 text-sm sm:text-base font-semibold text-white shadow-xs hover:bg-orange-500 sm:ml-3 w-full sm:w-auto'
					>
						Да
					</button>
					<button
						type='button'
						onClick={onClose}
						className='inline-flex justify-center rounded-md bg-white px-4 py-2 text-sm sm:text-base font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 w-full sm:w-auto'
					>
						Отмена
					</button>
				</div>
			</div>
		</div>
	)
}
