import { favoritesStore } from '@/app/store/favorites'
import { MovieCard } from '@/widgets'
import { observer } from 'mobx-react-lite'

export const FavoritesPage = observer(() => {
	const favorites = favoritesStore.favorites

	if (favorites.length === 0) {
		return <div className='p-6 text-gray-800'>Нет избранных фильмов.</div>
	}

	return (
		<div className='grid pt-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6'>
			{favorites.map(movie => (
				<MovieCard key={movie.id} movie={movie} />
			))}
		</div>
	)
})
