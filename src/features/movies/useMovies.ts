import { getMovies } from '@/app/api'
import type { ApiResponse, Movie } from '@/app/api/types'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

interface MovieFilters {
	genres?: string[]
	rating?: { min: number; max: number }
	yearMin?: number
	yearMax?: number
}

const DEFAULT_FILTERS: MovieFilters = {
	genres: [],
	rating: { min: 0, max: 10 },
	yearMin: 1990,
	yearMax: 2025
}

const PAGE_LIMIT = 50

export const useMovies = (filters: MovieFilters = DEFAULT_FILTERS) => {
	const [movies, setMovies] = useState<Movie[]>([])
	const [page, setPage] = useState(1)
	const [isLoading, setIsLoading] = useState(false)
	const [hasMore, setHasMore] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const observer = useRef<IntersectionObserver | null>(null)
	const isInitialFetch = useRef(true)

	const memoizedFilters = useMemo(
		() => ({
			genres: filters.genres ?? DEFAULT_FILTERS.genres,
			rating: filters.rating ?? DEFAULT_FILTERS.rating,
			year: `${filters.yearMin ?? DEFAULT_FILTERS.yearMin}-${
				filters.yearMax ?? DEFAULT_FILTERS.yearMax
			}`
		}),
		[filters.genres, filters.rating, filters.yearMin, filters.yearMax]
	)

	const loadMovies = useCallback(async () => {
		if (isLoading || !hasMore || error) return

		setIsLoading(true)
		try {
			const { docs }: ApiResponse<Movie> = await getMovies({
				page,
				limit: PAGE_LIMIT,
				...memoizedFilters
			})

			setMovies(prev => (page === 1 ? docs : [...prev, ...docs]))
			setHasMore(docs.length === PAGE_LIMIT)
			setPage(prev => prev + 1)
		} catch (err) {
			setError((err as Error).message || 'Failed to load movies')
			setHasMore(false)
		} finally {
			setIsLoading(false)
		}
	}, [page, hasMore, error, memoizedFilters])

	// Reset state on filter change
	useEffect(() => {
		setMovies([])
		setPage(1)
		setHasMore(true)
		setError(null)
		isInitialFetch.current = true
	}, [memoizedFilters])

	// Initial load
	useEffect(() => {
		if (!isInitialFetch.current) return
		isInitialFetch.current = false
		loadMovies()
	}, [loadMovies])

	// Infinite scroll observer
	const lastMovieElementRef = useCallback(
		(node: HTMLDivElement | null) => {
			if (isLoading || !hasMore || error) return
			observer.current?.disconnect()

			observer.current = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting) {
						loadMovies()
					}
				},
				{ threshold: 0.1 }
			)

			if (node) observer.current.observe(node)
		},
		[isLoading, hasMore, error, loadMovies]
	)

	return { movies, isLoading, hasMore, error, lastMovieElementRef }
}
