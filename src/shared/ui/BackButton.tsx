import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

interface BackButtonProps {
	navigate: ReturnType<typeof useNavigate>
	className?: string
}

export const BackButton = ({ navigate, className = '' }: BackButtonProps) => {
	return (
		<button
			onClick={() => navigate(-1)}
			className={`flex items-center gap-1 sm:gap-2 text-orange-500 text-base sm:text-lg font-medium mb-4 sm:mb-6 md:mb-8 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 rounded-md transition-colors ${className}`}
			aria-label='Вернуться к списку фильмов'
		>
			<FaArrowLeftLong className='w-4 h-4 sm:w-5 sm:h-5' />
			<span className='text-sm sm:text-base md:text-lg'>
				Вернуться к фильмам
			</span>
		</button>
	)
}
