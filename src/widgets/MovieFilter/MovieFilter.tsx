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
		<div className='shadow-2xl p-6 w-full rounded max-w-xs space-y-8 bg-white'>
			<h2 className='text-2xl font-semibold text-black'>Фильтры</h2>

			{genresError && (
				<p className='text-sm text-red-400 rounded-md px-3'>{genresError}</p>
			)}

			{/* Genre Filter */}
			<div className='space-y-2'>
				<label className='block text-sm font-medium text-orange-400'>
					Жанры
				</label>
				<GenreSelector
					genres={genres}
					availableGenres={availableGenres}
					onChange={handleGenreChange}
				/>
			</div>

			{/* Rating Filter */}
			<div className='space-y-3'>
				<label className='block text-sm font-medium text-orange-400'>
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
			<div className='space-y-3'>
				<label className='block text-sm font-medium text-orange-400'>
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
	)
}
