import kinoApi from '@/app/api'
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
	const [availableGenres, setAvailableGenres] = useState<string[]>([])
	const [genresError, setGenresError] = useState<string | null>(null)

	useEffect(() => {
		kinoApi
			.getGenres()
			.then(data => {
				setAvailableGenres(data.map(genre => genre.name))
				setGenresError(null)
			})
			.catch(() => {
				setGenresError(
					'Не удалось загрузить жанры. Используется пустой список.'
				)
				setAvailableGenres([])
			})
	}, [])

	const filters = useMemo(
		() => ({ genres, ratingMin, yearMin }),
		[genres, ratingMin, yearMin]
	)

	useEffect(() => {
		const newParams = {
			genres: genres.join(','),
			'rating.min': ratingMin.toString(),
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
		if (filters.ratingMin !== undefined) setRatingMin(filters.ratingMin)
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
