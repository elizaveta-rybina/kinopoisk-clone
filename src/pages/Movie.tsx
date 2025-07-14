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
import { useEffect, useState } from 'react'
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

		getMovieById(id)
			.then(data => setMovie(data))
			.catch(err =>
				setError(`Failed to load movie: ${err.message || 'Unknown error'}`)
			)
	}, [id])

	const handleFavoriteClick = (movie: Movie) => {
		setIsAddingToFavorites(!favoritesStore.isFavorite(movie.id))
		setIsModalOpen(true)
	}

	const handleConfirmFavorite = () => {
		if (movie) {
			if (isAddingToFavorites) {
				favoritesStore.addFavorite(movie)
			} else {
				favoritesStore.removeFavorite(movie.id)
			}
		}
		setIsModalOpen(false)
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
	}

	if (error) return <div className='text-red-500 p-6'>{error}</div>
	if (!movie) return <div className='text-gray-800 p-6'>Загрузка...</div>

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
				movieName={movie.name}
				isAdding={isAddingToFavorites}
			/>
		</div>
	)
}
