import { Link } from 'react-router-dom'

export const NavBar = () => {
	return (
		<div className='fixed top-0 left-0 w-full bg-opacity-90 backdrop-blur-sm z-[1000] shadow-md'>
			<div className='flex items-center justify-between p-5 max-w-[90%] mx-auto w-full'>
				<h1 className='text-amber-500 text-4xl font-bold cursor-pointer'>
					<Link to='/'>Кинопоиск</Link>
				</h1>
				<div>
					<Link
						to='/favorites'
						className='bg-orange-200 px-6 py-2 rounded-2xl cursor-pointer text-gray-600 hover:bg-orange-300 transition-colors inline-block'
					>
						Мое избранное
					</Link>
				</div>
			</div>
		</div>
	)
}
