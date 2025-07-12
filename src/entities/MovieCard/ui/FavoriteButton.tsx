import { useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

export const FavoriteButton = () => {
	const [isFavorited, setIsFavorited] = useState(false)

	const toggleFavorite = () => {
		setIsFavorited(prev => !prev)
		// Add logic here to update favorites in your app (e.g., API call or context update)
	}

	return (
		<button
			className='absolute top-2 right-2 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-amber-600'
			title={isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
			onClick={toggleFavorite}
		>
			{isFavorited ? (
				<AiFillHeart className='w-5 h-5 fill-white' />
			) : (
				<AiOutlineHeart className='w-5 h-5' />
			)}
		</button>
	)
}
