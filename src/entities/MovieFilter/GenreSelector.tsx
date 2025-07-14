import { memo, useCallback, useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

interface GenreSelectorProps {
	genres: string[]
	availableGenres: string[]
	onChange: (newGenres: string[]) => void
}

export const GenreSelector = memo(
	({ genres, availableGenres, onChange }: GenreSelectorProps) => {
		const [selectedGenres, setSelectedGenres] = useState<string[]>(genres)

		useEffect(() => {
			if (JSON.stringify(selectedGenres) !== JSON.stringify(genres)) {
				setSelectedGenres(genres)
			}
		}, [genres, selectedGenres])

		const [debouncedOnChange] = useDebounce(onChange, 300)

		const handleGenreToggle = useCallback(
			(genre: string) => {
				const newGenres = selectedGenres.includes(genre)
					? selectedGenres.filter(g => g !== genre)
					: [...selectedGenres, genre]
				setSelectedGenres(newGenres)
				debouncedOnChange(newGenres)
			},
			[selectedGenres, debouncedOnChange]
		)

		return (
			<div className='w-full h-32 p-1 sm:p-2 md:p-1 border border-orange-500 rounded-lg bg-white overflow-y-auto scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-gray-100'>
				{availableGenres.map(genre => (
					<div
						key={genre}
						onClick={() => handleGenreToggle(genre)}
						onKeyDown={e => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault()
								handleGenreToggle(genre)
							}
						}}
						role='button'
						tabIndex={0}
						aria-pressed={selectedGenres.includes(genre)}
						className={`p-2 text-sm sm:text-base cursor-pointer select-none ${
							selectedGenres.includes(genre)
								? 'bg-orange-200'
								: 'bg-transparent'
						} hover:bg-orange-100 text-black focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-md`}
					>
						{genre}
					</div>
				))}
			</div>
		)
	}
)
