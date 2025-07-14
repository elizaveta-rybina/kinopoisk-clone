import type { Movie } from '@/app/api/types'
import { favoritesStore } from '@/app/store/favorites'
import { observer } from 'mobx-react-lite'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

interface FavoriteButtonProps {
	movie: Movie
	isVisible?: boolean
	onFavoriteClick?: (movie: Movie) => void
}

export const FavoriteButton = observer(
	({ movie, isVisible = false, onFavoriteClick }: FavoriteButtonProps) => {
		const isFavorited = favoritesStore.isFavorite(movie.id)

		const toggleFavorite = (e: React.MouseEvent) => {
			e.stopPropagation()
			if (onFavoriteClick) {
				onFavoriteClick(movie)
			}
		}

		return (
			<button
				className={`absolute top-2 right-2 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center transition-opacity duration-300 hover:bg-amber-600 ${
					isVisible ? 'opacity-100' : 'opacity-0'
				}`}
				title={isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
				onClick={toggleFavorite}
			>
				{isFavorited ? (
					<AiFillHeart className='w-5 h-5 fill-white' />
				) : (
					<AiOutlineHeart className='w-5 h-5' />
				)}
			</button>
		)
	}
)
