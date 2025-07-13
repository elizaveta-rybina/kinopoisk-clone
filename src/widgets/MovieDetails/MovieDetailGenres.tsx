import type { Movie } from '@/app/api/types'

interface MovieDetailGenresProps {
	movie: Movie
}

export const MovieDetailGenres = ({ movie }: MovieDetailGenresProps) => {
	return (
		<div className='flex flex-wrap gap-2 mb-5'>
			{movie.genres.map(g => (
				<span
					key={g.name}
					className='border border-gray-400 rounded-full px-4 py-1 text-sm text-gray-700'
				>
					{g.name}
				</span>
			))}
		</div>
	)
}
