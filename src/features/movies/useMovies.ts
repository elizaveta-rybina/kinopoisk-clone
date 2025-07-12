import { getMovies } from '@/app/api'
import type { ApiResponse, Movie } from '@/app/api/types'
import { useCallback, useEffect, useRef, useState } from 'react'

interface MovieFilters {
	genres: string[]
	rating: { min: number; max: number }
	yearMin: number
	yearMax: number
}

export const useMovies = (
	filters: MovieFilters = {
		genres: [],
		rating: { min: 0, max: 10 },
		yearMin: 1990,
		yearMax: 2025
	}
) => {
	const [movies, setMovies] = useState<Movie[]>([])
	const [page, setPage] = useState(1)
	const [isLoading, setIsLoading] = useState(false)
	const [hasMore, setHasMore] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const observer = useRef<IntersectionObserver | null>(null)
	const isFetched = useRef(false)

	const loadMovies = useCallback(async () => {
		if (isLoading || !hasMore || error) return
		setIsLoading(true)
		setError(null)

		try {
			const data: ApiResponse<Movie> = await getMovies({
				page,
				limit: 50,
				genres: filters.genres,
				rating: filters.rating,
				year: `${filters.yearMin}-${filters.yearMax}`
			})
			setMovies(prev => (page === 1 ? data.docs : [...prev, ...data.docs]))
			setHasMore(data.docs.length === 50)
			setPage(prev => prev + 1)
		} catch (error: any) {
			setError(error.message || 'Не удалось загрузить фильмы')
			setHasMore(false)
		} finally {
			setIsLoading(false)
		}
	}, [
		page,
		isLoading,
		hasMore,
		error,
		filters.genres,
		filters.rating.min,
		filters.rating.max,
		filters.yearMin,
		filters.yearMax
	])

	useEffect(() => {
		setMovies([])
		setPage(1)
		setHasMore(true)
		setError(null)
		isFetched.current = false
	}, [
		filters.genres,
		filters.rating.min,
		filters.rating.max,
		filters.yearMin,
		filters.yearMax
	])

	useEffect(() => {
		if (isFetched.current) return
		isFetched.current = true
		loadMovies()
	}, [loadMovies])

	const lastMovieElementRef = useCallback(
		(node: HTMLDivElement | null) => {
			if (isLoading || error) return
			if (observer.current) observer.current.disconnect()

			observer.current = new IntersectionObserver(entries => {
				if (entries[0].isIntersecting && hasMore && !error) {
					loadMovies()
				}
			})

			if (node) observer.current.observe(node)
		},
		[isLoading, hasMore, error, loadMovies]
	)

	return { movies, isLoading, hasMore, error, lastMovieElementRef }
}
