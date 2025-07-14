import { genresStore } from '@/app/store/genres'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

interface Filters {
	genres: string[]
	ratingMin: number
	ratingMax: number
	yearMin: number
	yearMax: number
}

const DEFAULT_FILTERS: Filters = {
	genres: [],
	ratingMin: 7.0,
	ratingMax: 10.0,
	yearMin: 2010,
	yearMax: 2025
}

export const useMovieFilter = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [filters, setFilters] = useState<Filters>(() => {
		const genresParam = searchParams.get('genres')
		return {
			genres: genresParam
				? genresParam.split(',').filter(Boolean)
				: DEFAULT_FILTERS.genres,
			ratingMin: Number.parseFloat(
				searchParams.get('rating.min') ?? DEFAULT_FILTERS.ratingMin.toString()
			),
			ratingMax: Number.parseFloat(
				searchParams.get('rating.max') ?? DEFAULT_FILTERS.ratingMax.toString()
			),
			yearMin: Number.parseInt(
				searchParams.get('year.min') ?? DEFAULT_FILTERS.yearMin.toString(),
				10
			),
			yearMax: Number.parseInt(
				searchParams.get('year.max') ?? DEFAULT_FILTERS.yearMax.toString(),
				10
			)
		}
	})
	const [genresError, setGenresError] = useState<string | null>(null)

	const availableGenres = useMemo(
		() => genresStore.genres.map(genre => genre.name),
		[genresStore.genres]
	)

	useEffect(() => {
		if (genresStore.genres.length === 0 && !genresStore.isLoading) {
			genresStore.fetchGenres().catch(err => {
				setGenresError(
					err instanceof Error ? err.message : 'Failed to load genres'
				)
			})
		}
	}, [])

	useEffect(() => {
		const newParams: Record<string, string> = {
			'rating.min': filters.ratingMin.toFixed(1),
			'rating.max': filters.ratingMax.toFixed(1),
			'year.min': filters.yearMin.toString(),
			'year.max': filters.yearMax.toString()
		}
		if (filters.genres.length > 0) {
			newParams.genres = filters.genres.join(',')
		}

		const currentParams = Object.fromEntries(searchParams)
		const hasChanged =
			Object.keys(newParams).some(
				key => currentParams[key] !== newParams[key]
			) ||
			(filters.genres.length === 0 && currentParams.genres !== undefined)

		if (hasChanged) {
			setSearchParams(newParams, { replace: true })
		}
	}, [filters, setSearchParams])

	const handleGenreChange = useCallback((newGenres: string[]) => {
		setFilters(prev => ({ ...prev, genres: newGenres }))
	}, [])

	const onFilterChange = useCallback((newFilters: Partial<Filters>) => {
		setFilters(prev => ({
			...prev,
			...newFilters,
			ratingMin:
				newFilters.ratingMin !== undefined
					? Math.round(newFilters.ratingMin * 10) / 10
					: prev.ratingMin,
			ratingMax:
				newFilters.ratingMax !== undefined
					? Math.round(newFilters.ratingMax * 10) / 10
					: prev.ratingMax
		}))
	}, [])

	return {
		...filters,
		availableGenres,
		genresError,
		handleGenreChange,
		onFilterChange
	}
}
