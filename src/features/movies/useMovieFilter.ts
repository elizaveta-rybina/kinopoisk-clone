import { getGenres } from '@/app/api'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

// Mock genres for fallback when API limit is exceeded
const mockGenres = [
	'Action',
	'Comedy',
	'Drama',
	'Sci-Fi',
	'Horror',
	'Romance',
	'Thriller',
	'Adventure'
]

export const useMovieFilter = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [genres, setGenres] = useState<string[]>(
		searchParams.get('genres')?.split(',').filter(Boolean) || []
	)
	const [rating, setRating] = useState<{ min: number; max: number }>({
		min: parseFloat(searchParams.get('rating.min') || '0'),
		max: parseFloat(searchParams.get('rating.max') || '10')
	})
	const [yearMin, setYearMin] = useState<number>(
		parseInt(searchParams.get('yearMin') || '1990', 10)
	)
	const [yearMax, setYearMax] = useState<number>(
		parseInt(searchParams.get('yearMax') || '2025', 10)
	)
	const [availableGenres, setAvailableGenres] = useState<string[]>([])
	const [genresError, setGenresError] = useState<string | null>(null)

	// Fetch genres on mount with fallback to mock data
	useEffect(() => {
		getGenres()
			.then(data => {
				setAvailableGenres(data.map(genre => genre.name))
				setGenresError(null)
			})
			.catch(error => {
				console.error('Failed to load genres:', error)
				setGenresError(
					'Не удалось загрузить жанры. Используется резервный список.'
				)
				setAvailableGenres(mockGenres)
			})
	}, [])

	// Memoize filters to ensure stable reference
	const filters = useMemo(
		() => ({ genres, rating, yearMin, yearMax }),
		[genres, rating, yearMin, yearMax]
	)

	// Update search params on filter change
	useEffect(() => {
		const newParams = {
			genres: filters.genres.join(','),
			'rating.min': filters.rating.min.toString(),
			'rating.max': filters.rating.max.toString(),
			yearMin: filters.yearMin.toString(),
			yearMax: filters.yearMax.toString()
		}

		const currentParams = Object.fromEntries(searchParams)
		const hasChanged = Object.entries(newParams).some(
			([key, value]) => currentParams[key] !== value
		)

		if (hasChanged) {
			setSearchParams(newParams, { replace: true })
		}
	}, [filters, setSearchParams])

	const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selected = Array.from(
			e.target.selectedOptions,
			option => option.value
		)
		setGenres(selected)
	}

	// Callback to update filters from external sources (e.g., range inputs)
	const onFilterChange = (filters: {
		genres?: string[]
		rating?: { min: number; max: number }
		yearMin?: number
		yearMax?: number
	}) => {
		if (filters.genres !== undefined) setGenres(filters.genres)
		if (filters.rating !== undefined) setRating(filters.rating)
		if (filters.yearMin !== undefined) setYearMin(filters.yearMin)
		if (filters.yearMax !== undefined) setYearMax(filters.yearMax)
	}

	return {
		genres,
		rating,
		yearMin,
		yearMax,
		availableGenres,
		genresError,
		handleGenreChange,
		onFilterChange,
		filters
	}
}
