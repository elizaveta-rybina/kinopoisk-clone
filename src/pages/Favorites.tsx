import type { Movie } from '@/app/api/types'
import { favoritesStore } from '@/app/store/favorites'
import { BackButton, Modal } from '@/shared'
import { MovieCard } from '@/widgets'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const FavoritesPage = observer(() => {
	const favorites = favoritesStore.favorites

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
	const [isAddingToFavorites, setIsAddingToFavorites] = useState(true)
	const navigate = useNavigate()

	const handleFavoriteClick = (movie: Movie) => {
		setSelectedMovie(movie)
		setIsAddingToFavorites(!favoritesStore.isFavorite(movie.id))
		setIsModalOpen(true)
	}

	const handleConfirmFavorite = () => {
		if (selectedMovie) {
			if (isAddingToFavorites) {
				favoritesStore.addFavorite(selectedMovie)
			} else {
				favoritesStore.removeFavorite(selectedMovie.id)
			}
		}
		setIsModalOpen(false)
		setSelectedMovie(null)
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
		setSelectedMovie(null)
	}

	return (
		<div className='pt-20 md:pt-20 lg:pt-25 px-4 sm:px-5 max-w-[95%] md:max-w-[90%] min-h-screen text-white mx-auto w-full relative'>
			<BackButton navigate={navigate} />
			<h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 sm:mb-5 md:mb-6'>
				Мое избранное
			</h1>

			{favorites.length === 0 ? (
				<p className='text-gray-700 text-lg sm:text-xl md:text-2xl'>
					Нет избранных фильмов
				</p>
			) : (
				<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3 sm:gap-4'>
					{favorites.map(movie => (
						<MovieCard
							key={movie.id}
							movie={movie}
							onFavoriteClick={() => handleFavoriteClick(movie)}
						/>
					))}
				</div>
			)}

			<Modal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				onConfirm={handleConfirmFavorite}
				movieName={selectedMovie?.name || ''}
				isAdding={isAddingToFavorites}
			/>
		</div>
	)
})
