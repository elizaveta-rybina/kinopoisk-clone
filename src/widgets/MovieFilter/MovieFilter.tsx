import { useMovieFilter } from '@/features/movies'

export const MovieFilter = () => {
	const {
		genres,
		rating,
		yearMin,
		yearMax,
		availableGenres,
		genresError,
		handleGenreChange,
		onFilterChange
	} = useMovieFilter()

	return (
		<div className='mt-10 shadow-xl p-6 w-full max-w-xs space-y-8'>
			<h2 className='text-2xl font-semibold text-black'>Фильтры</h2>

			{genresError && (
				<p className='text-sm text-red-400 bg-red-900/30 rounded-md px-3 py-2'>
					{genresError}
				</p>
			)}

			{/* Genre Filter */}
			<div className='space-y-2'>
				<label className='block text-sm font-medium text-orange-400'>
					Жанры
				</label>
				<select
					multiple
					value={genres}
					onChange={handleGenreChange}
					className='w-full h-32 p-2 bg-black/50 text-white border border-orange-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 custom-scrollbar'
				>
					{availableGenres.map(genre => (
						<option
							key={genre}
							value={genre}
							className='bg-black text-white hover:bg-orange-600'
						>
							{genre}
						</option>
					))}
				</select>
			</div>

			{/* Rating Range Filter */}
			<div className='space-y-3'>
				<label className='block text-sm font-medium text-orange-400'>
					Рейтинг:{' '}
					<span className='text-white'>
						{rating.min.toFixed(1)} - {rating.max.toFixed(1)}
					</span>
				</label>
				<div className='space-y-2'>
					<input
						type='range'
						min='0'
						max='10'
						step='0.1'
						value={rating.min}
						onChange={e =>
							onFilterChange({
								rating: { ...rating, min: parseFloat(e.target.value) }
							})
						}
						className='w-full accent-orange-500 cursor-pointer'
					/>
					<input
						type='range'
						min='0'
						max='10'
						step='0.1'
						value={rating.max}
						onChange={e =>
							onFilterChange({
								rating: { ...rating, max: parseFloat(e.target.value) }
							})
						}
						className='w-full accent-orange-500 cursor-pointer'
					/>
				</div>
			</div>

			{/* Year Range Filter */}
			<div className='space-y-3'>
				<label className='block text-sm font-medium text-orange-400'>
					Год:{' '}
					<span className='text-white'>
						{yearMin} - {yearMax}
					</span>
				</label>
				<div className='space-y-2'>
					<input
						type='range'
						min='1990'
						max='2025'
						step='1'
						value={yearMin}
						onChange={e =>
							onFilterChange({
								yearMin: parseInt(e.target.value, 10)
							})
						}
						className='w-full accent-orange-500 cursor-pointer'
					/>
					<input
						type='range'
						min='1990'
						max='2025'
						step='1'
						value={yearMax}
						onChange={e =>
							onFilterChange({
								yearMax: parseInt(e.target.value, 10)
							})
						}
						className='w-full accent-orange-500 cursor-pointer'
					/>
				</div>
			</div>
		</div>
	)
}
