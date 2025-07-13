import { useEffect, useState } from 'react'

interface GenreSelectorProps {
	genres: string[]
	availableGenres: string[]
	onChange: (newGenres: string[]) => void
}

export const GenreSelector = ({
	genres,
	availableGenres,
	onChange
}: GenreSelectorProps) => {
	const [selectedGenres, setSelectedGenres] = useState<string[]>(genres)

	useEffect(() => {
		setSelectedGenres(genres)
	}, [genres])

	const handleGenreToggle = (genre: string) => {
		const newGenres = selectedGenres.includes(genre)
			? selectedGenres.filter(g => g !== genre)
			: [...selectedGenres, genre]
		setSelectedGenres(newGenres)
		onChange(newGenres) // Pass the new array directly
	}

	return (
		<div className='w-full h-32 p-1 border border-orange-500 rounded-lg bg-white overflow-y-auto custom-scrollbar'>
			{availableGenres.map(genre => (
				<div
					key={genre}
					onClick={() => handleGenreToggle(genre)}
					className={`p-1 cursor-pointer ${
						selectedGenres.includes(genre) ? 'bg-orange-200' : 'bg-transparent'
					} hover:bg-orange-100 text-black`}
				>
					{genre}
				</div>
			))}
		</div>
	)
}
