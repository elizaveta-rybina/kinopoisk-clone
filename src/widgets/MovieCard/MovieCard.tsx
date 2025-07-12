import type { Movie } from '@/app/api/types'
import { FavoriteButton, MovieInfoOverlay, MoviePoster } from '@/entities'
import { forwardRef } from 'react'

interface MovieCardProps {
	movie: Movie
}

export const MovieCard = forwardRef<HTMLDivElement, MovieCardProps>(
	({ movie }, ref) => {
		return (
			<div
				ref={ref}
				className='relative aspect-[2/3] w-full max-w-[220px] group transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:z-10'
			>
				<div className='relative w-full h-full'>
					<MoviePoster posterUrl={movie.poster.previewUrl} name={movie.name} />
					<FavoriteButton />
					<MovieInfoOverlay
						name={movie.name}
						rating={movie.rating?.kp}
						year={movie.year}
					/>
				</div>
			</div>
		)
	}
)

MovieCard.displayName = 'MovieCard'
