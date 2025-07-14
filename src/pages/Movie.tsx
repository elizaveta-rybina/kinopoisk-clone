import { getMovieById } from '@/app/api'
import type { Movie } from '@/app/api/types'
import { favoritesStore } from '@/app/store/favorites'
import {
	MovieDetailActions,
	MovieDetailGenres,
	MovieDetailHeader,
	MovieDetailStats
} from '@/entities'
import { BackButton, Modal } from '@/shared'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const MovieDetail = () => {
	const { id } = useParams<{ id: string }>()
	const [movie, setMovie] = useState<Movie | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isAddingToFavorites, setIsAddingToFavorites] = useState(true)
	const navigate = useNavigate()

	useEffect(() => {
		if (!id) {
			setError('Movie ID is missing')
			return
		}

		setMovie(null)
		getMovieById(id)
			.then(data => setMovie(data))
			.catch(err =>
				setError(`Failed to load movie: ${err.message || 'Unknown error'}`)
			)
	}, [id])

	const handleFavoriteClick = useCallback((movie: Movie) => {
		setIsAddingToFavorites(!favoritesStore.isFavorite(movie.id))
		setIsModalOpen(true)
	}, [])

	const handleConfirmFavorite = useCallback(() => {
		if (movie) {
			if (isAddingToFavorites) {
				favoritesStore.addFavorite(movie)
			} else {
				favoritesStore.removeFavorite(movie.id)
			}
		}
		setIsModalOpen(false)
	}, [movie, isAddingToFavorites])

	const handleCloseModal = useCallback(() => {
		setIsModalOpen(false)
	}, [])

	if (error) {
		return <div className='text-red-500 p-4 sm:p-6 text-center'>{error}</div>
	}

	if (!movie) {
		return (
			<div className='text-center py-8 pt-16 sm:pt-20 md:pt-25'>
				<div className='flex justify-center items-center'>
					<div className='w-10 h-10 sm:w-12 sm:h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin'></div>
				</div>
				<p className='mt-4 text-base sm:text-lg text-gray-800'>Загрузка...</p>
			</div>
		)
	}

	return (
		<div className='relative flex flex-col lg:flex-row min-h-screen pt-16 sm:pt-20 px-4 sm:px-8 md:px-12 lg:px-16'>
			{/* Информация о фильме */}
			<div className='w-full lg:w-1/2 flex flex-col justify-start px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10 lg:py-12 bg-white/90 backdrop-blur-sm z-10'>
				<BackButton navigate={navigate} />
				<MovieDetailHeader movie={movie} />
				<MovieDetailStats movie={movie} />
				<MovieDetailGenres movie={movie} />
				<p className='p-0 m-0 mt-4 text-sm sm:text-base'>{movie.description}</p>
				<div className='mt-6 sm:mt-8 md:mt-10'>
					<MovieDetailActions
						movie={movie}
						onFavoriteClick={handleFavoriteClick}
					/>
				</div>
			</div>

			{/* Постер фильма */}
			<div className='w-full lg:w-1/2 flex justify-center items-center mt-6 sm:mt-8 lg:mt-0 px-4 sm:px-6 md:px-8 lg:px-0'>
				<div className='w-full max-w-[500px] lg:max-w-[90%] max-h-[70vh] sm:max-h-[80vh] rounded-lg sm:rounded-xl overflow-hidden shadow-lg sm:shadow-xl mb-4'>
					<img
						src={movie.poster.url}
						alt={`${movie.name} poster`}
						className='w-full h-full object-contain'
					/>
				</div>
			</div>

			<Modal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				onConfirm={handleConfirmFavorite}
				movieName={movie?.name || ''}
				isAdding={isAddingToFavorites}
			/>
		</div>
	)
}
