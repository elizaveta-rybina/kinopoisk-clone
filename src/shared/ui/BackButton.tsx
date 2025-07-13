import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

interface BackButtonProps {
	navigate: ReturnType<typeof useNavigate>
}

export const BackButton = ({ navigate }: BackButtonProps) => {
	return (
		<button
			onClick={() => navigate(-1)}
			className='flex items-center gap-2 text-orange-500 text-lg font-medium mb-8 hover:underline'
		>
			<FaArrowLeftLong size={20} />
			<span>Вернуться к фильмам</span>
		</button>
	)
}
