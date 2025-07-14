import type { Movie } from '@/app/api/types'
import { makeAutoObservable } from 'mobx'

class FavoritesStore {
	favorites: Movie[] = []

	constructor() {
		makeAutoObservable(this)
		this.loadFavorites()
	}

	loadFavorites() {
		try {
			const storedFavorites = localStorage.getItem('favorites')
			if (storedFavorites) {
				this.favorites = JSON.parse(storedFavorites)
			}
		} catch (error) {
			console.error('Failed to load favorites from localStorage:', error)
		}
	}

	saveFavorites() {
		try {
			localStorage.setItem('favorites', JSON.stringify(this.favorites))
		} catch (error) {
			console.error('Failed to save favorites to localStorage:', error)
		}
	}

	addFavorite(movie: Movie) {
		if (!this.favorites.some(fav => fav.id === movie.id)) {
			this.favorites.push(movie)
			this.saveFavorites()
		}
	}

	removeFavorite(movieId: string) {
		this.favorites = this.favorites.filter(fav => fav.id !== movieId)
		this.saveFavorites()
	}

	isFavorite(movieId: string) {
		return this.favorites.some(fav => fav.id === movieId)
	}
}

export const favoritesStore = new FavoritesStore()
