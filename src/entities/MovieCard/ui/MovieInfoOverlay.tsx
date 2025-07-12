interface MovieInfoOverlayProps {
	name: string
	rating?: number
	year?: number
}

export const MovieInfoOverlay = ({
	name,
	rating,
	year
}: MovieInfoOverlayProps) => {
	return (
		<div className='absolute bottom-0 w-full bg-black bg-opacity-80 backdrop-blur-[3px] p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-lg shadow-inner'>
			<h3 className='text-base font-bold text-white truncate mb-1'>{name}</h3>
			<p className='text-sm text-gray-200'>
				Рейтинг: {rating?.toFixed(1) ?? 'N/A'}
			</p>
			<p className='text-sm text-gray-200'>Год: {year ?? 'N/A'}</p>
		</div>
	)
}
