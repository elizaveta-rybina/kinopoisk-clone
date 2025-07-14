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

		setMovie(null) // Ensure loading state is shown on ID change
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
		return <div className='text-red-500 p-6 text-center'>{error}</div>
	}

	if (!movie) {
		return (
			<div className='text-center py-8 pt-25'>
				<div className='flex justify-center items-center'>
					<div className='w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin'></div>
				</div>
				<p className='mt-4 text-lg text-gray-800'>Загрузка...</p>
			</div>
		)
	}

	return (
		<div className='relative flex min-h-screen pt-20 px-16'>
			<div className='w-1/2 flex flex-col justify-start px-10 py-12 bg-white/90 backdrop-blur-sm z-10'>
				<BackButton navigate={navigate} />
				<MovieDetailHeader movie={movie} />
				<MovieDetailStats movie={movie} />
				<MovieDetailGenres movie={movie} />
				<p className='p-0 m-0'>{movie.description}</p>
				<div className='mt-10'>
					<MovieDetailActions
						movie={movie}
						onFavoriteClick={handleFavoriteClick}
					/>
				</div>
			</div>
			<div className='w-1/2 flex justify-center items-center'>
				<div className='max-w-[90%] max-h-[90vh] rounded-xl overflow-hidden shadow-xl'>
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
