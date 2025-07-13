import { FaHeart } from 'react-icons/fa'

export const MovieDetailActions = () => {
	return (
		<button className='flex items-center gap-2 bg-amber-500  hover:bg-orange-600 text-white px-6 py-3 rounded-full text-lg font-semibold w-fit transition'>
			<FaHeart />
			Добавить в избранное
		</button>
	)
}
