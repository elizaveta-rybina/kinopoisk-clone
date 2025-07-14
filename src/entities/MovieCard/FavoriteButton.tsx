import type { Movie } from '@/app/api/types'
import { favoritesStore } from '@/app/store/favorites'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

interface FavoriteButtonProps {
	movie: Movie
	isVisible?: boolean
	onFavoriteClick?: (movie: Movie) => void
	className?: string
}

export const FavoriteButton = observer(
	({
		movie,
		isVisible = false,
		onFavoriteClick,
		className = ''
	}: FavoriteButtonProps) => {
		const [isMobile, setIsMobile] = useState(false)
		const isFavorited = favoritesStore.isFavorite(movie.id)

		useEffect(() => {
			const checkIfMobile = () => {
				setIsMobile(window.innerWidth < 768)
			}

			checkIfMobile()
			window.addEventListener('resize', checkIfMobile)

			return () => {
				window.removeEventListener('resize', checkIfMobile)
			}
		}, [])

		const toggleFavorite = (e: React.MouseEvent) => {
			e.stopPropagation()
			if (onFavoriteClick) {
				onFavoriteClick(movie)
			}
		}

		return (
			<button
				className={`absolute top-2 right-2 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center transition-opacity duration-300 hover:bg-amber-600 ${
					isVisible || isMobile ? 'opacity-100' : 'opacity-0'
				} ${className}`}
				title={isFavorited ? 'Удалить из избранного' : 'Добавить в избранное'}
				onClick={toggleFavorite}
				aria-label={
					isFavorited ? 'Убрать из избранного' : 'Добавить в избранное'
				}
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
