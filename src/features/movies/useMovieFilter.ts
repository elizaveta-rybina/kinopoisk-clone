import { genresStore } from '@/app/store/genres'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const useMovieFilter = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [genres, setGenres] = useState<string[]>(
		searchParams.get('genres')?.split(',').filter(Boolean) || []
	)
	const [ratingMin, setRatingMin] = useState<number>(
		parseFloat(searchParams.get('rating.min') || '7.0')
	)
	const [yearMin, setYearMin] = useState<number>(
		parseInt(searchParams.get('yearMin') || '2010', 10)
	)
	const [genresError, setGenresError] = useState<string | null>(null)

	// Use genresStore for availableGenres
	const availableGenres = useMemo(
		() =>
			genresStore.genres.length > 0
				? genresStore.genres.map(genre => genre.name)
				: [],
		[genresStore.genres]
	)

	useEffect(() => {
		if (genresStore.genres.length === 0 && !genresStore.isLoading) {
			genresStore.fetchGenres().catch(err => {
				setGenresError(
					err instanceof Error
						? err.message
						: 'Не удалось загрузить жанры. Используется пустой список.'
				)
			})
		}
	}, [])

	const filters = useMemo(
		() => ({ genres, ratingMin, yearMin }),
		[genres, ratingMin, yearMin]
	)

	useEffect(() => {
		const newParams = {
			genres: genres.join(','),
			'rating.min': ratingMin.toFixed(1), // Round to 1 decimal place
			yearMin: yearMin.toString()
		}

		const currentParams = Object.fromEntries(searchParams)
		const hasChanged = Object.entries(newParams).some(
			([key, value]) => currentParams[key] !== value
		)

		if (hasChanged) {
			setSearchParams(newParams, { replace: true })
		}
	}, [filters, setSearchParams])

	const handleGenreChange = (newGenres: string[]) => {
		setGenres(newGenres)
	}

	const onFilterChange = (filters: {
		genres?: string[]
		ratingMin?: number
		yearMin?: number
	}) => {
		if (filters.genres !== undefined) setGenres(filters.genres)
		if (filters.ratingMin !== undefined) {
			// Round to 1 decimal place to fix step issue
			setRatingMin(Math.round(filters.ratingMin * 10) / 10)
		}
		if (filters.yearMin !== undefined) setYearMin(filters.yearMin)
	}

	return {
		genres,
		ratingMin,
		yearMin,
		availableGenres,
		genresError,
		handleGenreChange,
		onFilterChange
	}
}
