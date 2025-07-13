import type { Movie } from '@/app/api/types'

interface MovieDetailHeaderProps {
	movie: Movie
}

export const MovieDetailHeader = ({ movie }: MovieDetailHeaderProps) => {
	return (
		<>
			<h1 className='text-5xl md:text-6xl font-bold mb-6 uppercase max-w-2xl'>
				{movie.name}
			</h1>
			<div className='text-lg mb-4 space-x-2'>
				<span>{movie.year}</span>
				<span>·</span>
				<span>{movie.countries.map(c => c.name).join(', ')}</span>
			</div>
		</>
	)
}
