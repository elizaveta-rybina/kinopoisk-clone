import { memo } from 'react'

interface MoviePosterProps {
	posterUrl: string
	name: string
}

export const MoviePoster = memo(({ posterUrl, name }: MoviePosterProps) => {
	return (
		<img
			src={posterUrl}
			alt={name}
			className='w-full h-full object-cover rounded-lg'
			loading='lazy'
		/>
	)
})

MoviePoster.displayName = 'MoviePoster'
