import { getGenres } from '@/app/api'
import { makeAutoObservable } from 'mobx'

interface GenreResponse {
	name: string
	slug: string
}

class GenresStore {
	genres: GenreResponse[] = []
	isLoading = false
	error: string | null = null

	constructor() {
		makeAutoObservable(this)
	}

	async fetchGenres() {
		if (this.genres.length > 0 || this.isLoading) return

		this.isLoading = true
		this.error = null

		try {
			const data = await getGenres()
			this.genres = data
		} catch (err) {
			this.error = err instanceof Error ? err.message : 'Failed to fetch genres'
		} finally {
			this.isLoading = false
		}
	}
}

export const genresStore = new GenresStore()
