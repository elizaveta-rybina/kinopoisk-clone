import type { Movie } from '@/app/api/types'
import { favoritesStore } from '@/app/store/favorites'
import { observer } from 'mobx-react-lite'

interface MovieDetailActionsProps {
  movie: Movie
  onFavoriteClick?: (movie: Movie) => void
}

export const MovieDetailActions = observer(
  ({ movie, onFavoriteClick }: MovieDetailActionsProps) => {
    const isFavorited = favoritesStore.isFavorite(movie.id)

    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation()
      if (onFavoriteClick) {
        onFavoriteClick(movie)
      }
    }

    return (
      <button
        className='inline-flex justify-center rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-amber-600 transition-colors duration-300'
        onClick={handleClick}
      >
        {isFavorited ? 'Удалить из избранного' : 'Добавить в избранное'}
      </button>
    )
  }
)