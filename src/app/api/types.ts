export interface ApiResponse<T> {
	docs: T[]
	total: number
	limit: number
	page: number
	pages: number
}

export interface Movie {
	id: string
	name: string
	year: number
	rating: {
		kp: number
		imdb: number
	}
	poster: {
		url: string
		previewUrl: string
	}
	description: string
	shortDescription: string
	genres: Array<{ name: string }>
	alternativeName: string
	type: string
	movieLength: number
	countries: Array<{ name: string }>
	ageRating: string
	backdrop: {
		url: string
		previewUrl: string
	}
	videos: {
		trailers: Array<{
			url: string
			name: string
			site: string
			type: string
		}>
	}
}

export interface Genre {
	name: string
	slug: string
}

export interface SearchResponse {
	docs: Movie[]
	total: number
	limit: number
	page: number
	pages: number
}

export interface GenreResponse {
	name: string
	slug: string
}

export type MovieField = keyof Movie
export type SortField = 'year' | 'rating.kp' | 'votes.kp' | 'name'
export type SortType = '1' | '-1'
export type MovieType = 'movie' | 'tv-series' | 'cartoon' | 'anime'

export interface GetMoviesParams {
	page?: number
	limit?: number
	year?: string
	rating?: { min: number; max: number } // Изменено на объект
	genres?: string[]
	selectFields?: MovieField[]
	sortField?: SortField // Изменено на одиночное значение
	sortType?: SortType // Изменено на одиночное значение
	type?: MovieType
	movieLength?: string | number
}
