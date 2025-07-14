import { genresStore } from '@/app/store/genres'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

interface Filters {
	genres: string[]
	ratingMin: number
	yearMin: number
}

const DEFAULT_FILTERS: Filters = {
	genres: [],
	ratingMin: 7.0,
	yearMin: 2010
}

export const useMovieFilter = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [filters, setFilters] = useState<Filters>(() => ({
		genres:
			searchParams.get('genres')?.split(',').filter(Boolean) ??
			DEFAULT_FILTERS.genres,
		ratingMin: Number.parseFloat(
			searchParams.get('rating.min') ?? DEFAULT_FILTERS.ratingMin.toString()
		),
		yearMin: Number.parseInt(
			searchParams.get('yearMin') ?? DEFAULT_FILTERS.yearMin.toString(),
			10
		)
	}))
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
		const newParams = {
			genres: filters.genres.join(','),
			'rating.min': filters.ratingMin.toFixed(1),
			yearMin: filters.yearMin.toString()
		}

		const currentParams = Object.fromEntries(searchParams)
		const hasChanged = Object.entries(newParams).some(
			([key, value]) => value && currentParams[key] !== value
		)

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
					: prev.ratingMin
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
