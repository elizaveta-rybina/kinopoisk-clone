import type { Movie } from '@/app/api/types'
import { favoritesStore } from '@/app/store/favorites'
import { genresStore } from '@/app/store/genres'
import { useMovies } from '@/features/movies'
import { Modal } from '@/shared'
import { MovieCard, MovieFilter } from '@/widgets'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const HomeContent = () => {
	const [searchParams] = useSearchParams()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
	const [isAddingToFavorites, setIsAddingToFavorites] = useState(true)

	const filters = useMemo(
		() => ({
			genres: searchParams.get('genres')?.split(',').filter(Boolean) || [],
			rating: {
				min: parseFloat(searchParams.get('rating.min') || '0'),
				max: parseFloat(searchParams.get('rating.max') || '10')
			},
			yearMin: parseInt(searchParams.get('yearMin') || '1990', 10),
			yearMax: parseInt(searchParams.get('yearMax') || '2025', 10)
		}),
		[searchParams]
	)

	const { movies, isLoading, hasMore, error, lastMovieElementRef } =
		useMovies(filters)

	useEffect(() => {
		genresStore.fetchGenres()
	}, [])

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
		<div className='max-w-9/10 min-h-screen text-white mx-auto w-full relative'>
			<div className='flex flex-col lg:flex-row gap-6 px-4 pt-10'>
				<aside className='w-full lg:w-1/4'>
					<MovieFilter />
				</aside>
				<main className='w-full lg:w-3/4'>
					{error && (
						<div className='text-center py-8 text-red-500'>
							<p>{error}</p>
							{error.includes('limit') && (
								<p>
									Пожалуйста, обновите тариф в{' '}
									<a href='https://t.me/kinopoiskdev_bot' className='underline'>
										боте Kinopoisk
									</a>
									.
								</p>
							)}
						</div>
					)}

					<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
						{movies.map((movie: Movie, index: number) => (
							<MovieCard
								key={`${movie.id}-${index}`}
								movie={movie}
								ref={index === movies.length - 1 ? lastMovieElementRef : null}
								onFavoriteClick={handleFavoriteClick}
							/>
						))}
					</div>

					{isLoading && !error && (
						<div className='text-center py-8'>
							<div className='flex justify-center items-center'>
								<div className='w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin'></div>
							</div>
							<p className='mt-4 text-lg'>Loading more movies...</p>
						</div>
					)}

					{!hasMore && movies.length > 0 && !error && (
						<div className='text-center py-4'>
							<p>Нет больше фильмов для загрузки</p>
						</div>
					)}

					{!isLoading && movies.length === 0 && !error && (
						<div className='text-center py-8'>
							<p>Нет фильмов, соответствующих фильтрам</p>
						</div>
					)}
				</main>
			</div>

			<Modal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				onConfirm={handleConfirmFavorite}
				movieName={selectedMovie?.name || ''}
				isAdding={isAddingToFavorites}
			/>
		</div>
	)
}
