import type { Movie } from '@/app/api/types'
import { favoritesStore } from '@/app/store/favorites'
import { observer } from 'mobx-react-lite'
import { useCallback } from 'react'

interface MovieDetailActionsProps {
	movie: Movie
	onFavoriteClick?: (movie: Movie) => void
}

export const MovieDetailActions = observer(
	({ movie, onFavoriteClick }: MovieDetailActionsProps) => {
		const isFavorited = favoritesStore.isFavorite(movie.id)

		const handleClick = useCallback(
			(e: React.MouseEvent<HTMLButtonElement>) => {
				e.stopPropagation()
				onFavoriteClick?.(movie)
			},
			[movie, onFavoriteClick]
		)

		return (
			<button
				className='inline-flex justify-center rounded-xl bg-amber-500 px-4 py-3  text-sm font-semibold text-white shadow-xs hover:bg-amber-600 transition-colors duration-300'
				onClick={handleClick}
				aria-label={
					isFavorited ? 'Убрать из избранного' : 'Добавить в избранное'
				}
			>
				{isFavorited ? 'Убрать из избранного' : 'Добавить в избранное'}
			</button>
		)
	}
)
