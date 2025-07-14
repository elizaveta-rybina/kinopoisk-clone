import { Link } from 'react-router-dom'

export const NavBar = () => {
	return (
		<div className='fixed top-0 left-0 w-full bg-opacity-90 backdrop-blur-sm z-[1000] shadow-md'>
			<div className='flex items-center justify-between p-3 sm:p-4 md:p-5 max-w-[90%] mx-auto w-full'>
				<h1 className='text-amber-500 text-2xl sm:text-3xl md:text-4xl font-bold cursor-pointer'>
					<Link to='/'>Кинопоиск</Link>
				</h1>
				<div>
					<Link
						to='/favorites'
						className='bg-orange-200 px-3 py-1 sm:px-4 sm:py-1.5 md:px-6 md:py-2 rounded-xl sm:rounded-2xl cursor-pointer text-gray-600 hover:bg-orange-300 transition-colors inline-block text-sm sm:text-base'
					>
						Мое избранное
					</Link>
				</div>
			</div>
		</div>
	)
}
