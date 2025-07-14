import { GenreSelector, NumberStepper } from '@/entities'
import { useMovieFilter } from '@/features/movies'

export const MovieFilter = () => {
	const {
		genres,
		ratingMin,
		yearMin,
		availableGenres,
		genresError,
		handleGenreChange,
		onFilterChange
	} = useMovieFilter()

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

				{/* Rating Filter */}
				<div className='space-y-2 sm:space-y-3'>
					<label className='block text-xs sm:text-sm font-medium text-orange-400 text-center md:text-left'>
						Рейтинг (мин):{' '}
						<span className='text-black'>{ratingMin.toFixed(1)}</span>
					</label>
					<NumberStepper
						value={ratingMin}
						min={0}
						max={10}
						step={0.1}
						onChange={value => onFilterChange({ ratingMin: value })}
					/>
				</div>

				{/* Year Filter */}
				<div className='space-y-2 sm:space-y-3'>
					<label className='block text-xs sm:text-sm font-medium text-orange-400 text-center md:text-left'>
						Год (мин): <span className='text-black'>{yearMin}</span>
					</label>
					<NumberStepper
						value={yearMin}
						min={1990}
						max={2025}
						step={1}
						onChange={value => onFilterChange({ yearMin: value })}
					/>
				</div>
			</div>
		</div>
	)
}
