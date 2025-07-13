import type { Movie } from '@/app/api/types'
import { FavoriteButton, MovieInfoOverlay, MoviePoster } from '@/entities'
import { forwardRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

interface MovieCardProps {
	movie: Movie
}

export const MovieCard = forwardRef<HTMLDivElement, MovieCardProps>(
	({ movie }, ref) => {
		const navigate = useNavigate()

		const handleClick = useCallback(() => {
			navigate(`/movie/${movie.id}`)
		}, [navigate, movie.id])

		return (
			<div
				ref={ref}
				onClick={handleClick}
				className='relative aspect-[2/3] w-full max-w-[220px] group transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:z-10 cursor-pointer'
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
