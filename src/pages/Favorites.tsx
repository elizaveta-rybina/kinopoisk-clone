import type { Movie } from '@/app/api/types'
import { favoritesStore } from '@/app/store/favorites'
import { Modal } from '@/shared'
import { MovieCard } from '@/widgets'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'

export const FavoritesPage = observer(() => {
	const favorites = favoritesStore.favorites

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
	const [isAddingToFavorites, setIsAddingToFavorites] = useState(true)

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
		<div className='pt-25 px-5 max-w-9/10 min-h-screen text-white mx-auto w-full relative'>
			<h1 className='text-4xl font-bold text-gray-800 mb-6'>Мое избранное</h1>

			{favorites.length === 0 ? (
				<p className='text-gray-700 text-2xl'>Нет избранных фильмов</p>
			) : (
				<div className='grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4'>
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
