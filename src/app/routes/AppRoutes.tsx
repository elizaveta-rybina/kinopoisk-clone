import { Home } from '@/pages'
import { MovieDetail } from '@/pages/Movie'
import { NavBar } from '@/shared'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'

const RootLayout = () => (
	<>
		<NavBar />
		<Outlet />
	</>
)

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <Home />
			},
			{
				path: 'movie/:id',
				element: <MovieDetail />
			}
		]
	}
])

export const AppRouter = () => {
	return <RouterProvider router={router} />
}
