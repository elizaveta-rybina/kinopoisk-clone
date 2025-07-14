import type { Movie } from '@/app/api/types'
import { FavoriteButton, MovieInfoOverlay, MoviePoster } from '@/entities'
import { observer } from 'mobx-react-lite'
import { forwardRef, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface MovieCardProps {
	movie: Movie
	onFavoriteClick?: (movie: Movie) => void
}

export const MovieCard = observer(
	forwardRef<HTMLDivElement, MovieCardProps>(
		({ movie, onFavoriteClick }, ref) => {
			const navigate = useNavigate()
			const [isButtonVisible, setIsButtonVisible] = useState(false)

			const handleClick = useCallback(() => {
				if (!isButtonVisible) {
					navigate(`/movie/${movie.id}`)
				}
			}, [navigate, movie.id, isButtonVisible])

			return (
				<div
					ref={ref}
					onClick={handleClick}
					className='relative aspect-[2/3] w-full max-w-[220px] group transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:z-10 cursor-pointer'
					onMouseEnter={() => setIsButtonVisible(true)}
					onMouseLeave={() => setIsButtonVisible(false)}
				>
					<div className='relative w-full h-full'>
						<MoviePoster
							posterUrl={movie.poster.previewUrl}
							name={movie.name}
						/>
						<FavoriteButton
							movie={movie}
							isVisible={isButtonVisible}
							onFavoriteClick={onFavoriteClick}
						/>
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
)

MovieCard.displayName = 'MovieCard'
