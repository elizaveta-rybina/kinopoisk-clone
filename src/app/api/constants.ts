export const API_BASE_URL = 'https://api.kinopoisk.dev/v1.4'
export const API_KEY = import.meta.env.VITE_KINOPOISK_API_KEY

if (!API_KEY) {
	throw new Error(
		'VITE_KINOPOISK_API_KEY is not defined in environment variables'
	)
}

export const headers = {
	accept: 'application/json',
	'X-API-KEY': API_KEY
} as const

export type MovieField =
	| 'id'
	| 'name'
	| 'year'
	| 'rating'
	| 'poster'
	| 'description'
	| 'genres'
	| 'alternativeName'
	| 'type'
	| 'shortDescription'
	| 'movieLength'
	| 'countries'
	| 'ageRating'
	| 'backdrop'
	| 'videos'

export const BASE_MOVIE_FIELDS: MovieField[] = [
	'id',
	'name',
	'year',
	'rating',
	'poster',
	'description',
	'genres'
]
