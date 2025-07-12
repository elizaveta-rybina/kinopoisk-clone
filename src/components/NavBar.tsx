const NavBar = () => {
	return (
		<div className='flex items-center justify-between p-5 z-[100] w-full absolute'>
			<h1 className='text-amber-500 text-5xl font-bold cursor-pointer'>
				Кинопоиск
			</h1>
			<div className=''>
				<button className='bg-orange-200 px-6 py-2 rounded-2xl cursor-pointer text-gray-600'>
					Мое избранное
				</button>
			</div>
		</div>
	)
}

export default NavBar
