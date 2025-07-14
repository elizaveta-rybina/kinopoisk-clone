import type { Movie } from '@/app/api/types'
import { FaClock, FaImdb, FaStar } from 'react-icons/fa'

interface MovieDetailStatsProps {
	movie: Movie
}

export const MovieDetailStats = ({ movie }: MovieDetailStatsProps) => {
	return (
		<div className='flex flex-wrap gap-6 items-center mb-6 text-gray-800 text-lg'>
			<div className='flex items-center gap-2'>
				<FaStar className='text-yellow-500' />
				<span>{movie.rating?.kp || '-'}</span>
			</div>
			<div className='flex items-center gap-2'>
				<FaImdb className='text-yellow-600' />
				<span>{movie.rating?.imdb || '-'}</span>
			</div>
			<div className='flex items-center gap-2'>
				<FaClock className='text-gray-700' />
				<span>{movie.movieLength || '-'} мин</span>
			</div>
		</div>
	)
}
