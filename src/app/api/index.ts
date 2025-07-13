import { BASE_MOVIE_FIELDS } from './constants'
import { fetchFromApi } from './fetch'
import type {
	ApiResponse,
	GenreResponse,
	GetMoviesParams,
	Movie,
	SearchResponse
} from './types'

import { API_BASE_URL } from './constants'

export function getMovies(
	params: GetMoviesParams = {}
): Promise<ApiResponse<Movie>> {
	const {
		page = 1,
		limit = 50,
		year,
		rating = { min: 5, max: 10 },
		genres = [],
		selectFields = [...BASE_MOVIE_FIELDS, 'votes'],
		sortField = 'rating.kp',
		sortType = '-1',
		type,
		movieLength
	} = params

	const searchParams = new URLSearchParams()

	searchParams.set('page', page.toString())
	searchParams.set('limit', limit.toString())

	if (type) searchParams.set('type', type)
	if (year) searchParams.set('year', year.toString())
	if (rating) {
		searchParams.set('rating.kp>=', rating.min.toString())
		searchParams.set('rating.kp<=', rating.max.toString())
	}
	if (movieLength) searchParams.set('movieLength', movieLength.toString())

	genres.forEach(genre => searchParams.append('genres.name', genre))
	searchParams.set('sortField', sortField)
	searchParams.set('sortType', sortType)
	selectFields.forEach(field => searchParams.append('selectFields', field))
	;['name', 'poster.url', 'rating.kp'].forEach(field =>
		searchParams.append('notNullFields', field)
	)

	searchParams.set('votes.kp>=', '10000')
	searchParams.set('votes.kp<=', '10000000')

	// Логируем URL для отладки
	console.log(
		`Request URL: ${API_BASE_URL}/v1.4/movie?${searchParams.toString()}`
	)

	return fetchFromApi<ApiResponse<Movie>>(
		`/v1.4/movie?${searchParams.toString()}`
	)
}

export function getMovieById(id: string): Promise<Movie> {
	if (!id.trim()) {
		throw new Error('Movie ID is required')
	}
	return fetchFromApi<Movie>(`/v1.4/movie/${id}`)
}

export function getGenres(): Promise<GenreResponse[]> {
	return fetchFromApi<GenreResponse[]>(
		'/v1/movie/possible-values-by-field?field=genres.name'
	)
}

export function searchMovies(query: string): Promise<SearchResponse> {
	if (!query.trim()) {
		throw new Error('Search query is required')
	}

	const searchParams = new URLSearchParams()
	searchParams.set('query', query)

	return fetchFromApi<SearchResponse>(
		`/v1.4/movie/search?${searchParams.toString()}`
	)
}

const kinoApi = {
	getMovies,
	getMovieById,
	getGenres,
	searchMovies
} as const

export default kinoApi
