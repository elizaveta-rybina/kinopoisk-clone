import { GenreSelector, NumberStepper } from '@/entities'
import { useMovieFilter } from '@/features/movies'
import { useEffect } from 'react'

export const MovieFilter = () => {
	const {
		genres,
		ratingMin,
		ratingMax,
		yearMin,
		yearMax,
		availableGenres,
		genresError,
		handleGenreChange,
		onFilterChange
	} = useMovieFilter()

	// Проверка и корректировка рейтинга
	useEffect(() => {
		if (ratingMin > ratingMax) {
			console.log('Correcting ratingMin:', ratingMin, 'to', ratingMax)
			onFilterChange({ ratingMin: ratingMax })
		} else if (ratingMax < ratingMin) {
			console.log('Correcting ratingMax:', ratingMax, 'to', ratingMin)
			onFilterChange({ ratingMax: ratingMin })
		}
	}, [ratingMin, ratingMax, onFilterChange])

	// Проверка и корректировка года
	useEffect(() => {
		if (yearMin > yearMax) {
			console.log('Correcting yearMin:', yearMin, 'to', yearMax)
			onFilterChange({ yearMin: yearMax })
		} else if (yearMax < yearMin) {
			console.log('Correcting yearMax:', yearMax, 'to', yearMin)
			onFilterChange({ yearMax: yearMin })
		}
	}, [yearMin, yearMax, onFilterChange])

	// Функция сброса фильтров
	const resetFilters = () => {
		console.log('Resetting all filters')
		onFilterChange({
			genres: [],
			ratingMin: 0,
			ratingMax: 10,
			yearMin: 1990,
			yearMax: 2025
		})
		handleGenreChange([]) // Очищаем жанры
	}

	return (
		<div className='shadow-2xl p-4 sm:p-6 w-full rounded-3xl max-w-[100%] sm:max-w-xs md:max-w-[90%] lg:max-w-md flex flex-col space-y-6 sm:space-y-8 bg-white'>
			<h2 className='text-xl sm:text-2xl font-semibold text-black text-center mb-0'>
				Фильтры
			</h2>

			{genresError && (
				<p className='text-xs sm:text-sm text-red-400 rounded-md px-2 sm:px-3 text-center'>
					{genresError}
				</p>
			)}

			<div className='flex flex-col space-y-6 md:space-y-8'>
				{/* Genre Filter */}
				<div className='space-y-1 sm:space-y-2'>
					<label className='block text-xs sm:text-sm font-medium text-orange-400 text-center md:text-left'>
						Жанры
					</label>
					<GenreSelector
						genres={genres}
						availableGenres={availableGenres}
						onChange={handleGenreChange}
					/>
				</div>

				{/* Rating Filters */}
				<div className='space-y-2 sm:space-y-3'>
					<label className='block text-xs sm:text-sm font-medium text-orange-400 text-center md:text-left'>
						Рейтинг
					</label>
					<div className='grid grid-cols-2 gap-4'>
						<div>
							<label className='block text-xs text-gray-500 mb-1'>От:</label>
							<NumberStepper
								value={ratingMin}
								min={0}
								max={10}
								step={0.1}
								onChange={value => onFilterChange({ ratingMin: value })}
							/>
						</div>
						<div>
							<label className='block text-xs text-gray-500 mb-1'>До:</label>
							<NumberStepper
								value={ratingMax}
								min={0}
								max={10}
								step={0.1}
								onChange={value => onFilterChange({ ratingMax: value })}
							/>
						</div>
					</div>
				</div>

				{/* Year Filters */}
				<div className='space-y-2 sm:space-y-3'>
					<label className='block text-xs sm:text-sm font-medium text-orange-400 text-center md:text-left'>
						Год выхода
					</label>
					<div className='grid grid-cols-2 gap-4'>
						<div>
							<label className='block text-xs text-gray-500 mb-1'>От:</label>
							<NumberStepper
								value={yearMin}
								min={1990}
								max={2025}
								step={1}
								onChange={value => onFilterChange({ yearMin: value })}
							/>
						</div>
						<div>
							<label className='block text-xs text-gray-500 mb-1'>До:</label>
							<NumberStepper
								value={yearMax}
								min={1990}
								max={2025}
								step={1}
								onChange={value => onFilterChange({ yearMax: value })}
							/>
						</div>
					</div>
				</div>

				{/* Reset Button */}
				<button
					onClick={resetFilters}
					className='bg-orange-300 text-white p-2 sm:p-3 text-sm sm:text-base rounded-2xl hover:bg-orange-500 transition-colors w-full'
				>
					Сбросить все фильтры
				</button>
			</div>
		</div>
	)
}
