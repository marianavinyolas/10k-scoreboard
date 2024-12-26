import { GamePage, PlayersPage, WellcomePage } from '@pages'
import { createBrowserRouter, Navigate } from 'react-router-dom'

const Router = createBrowserRouter([
	{
		path: '/',
		element: <Navigate to='/wellcome' replace />,
	},
	{
		path: '/wellcome',
		element: <WellcomePage />,
	},
	{
		path: '/players',
		element: <PlayersPage />,
	},
	{
		path: '/game',
		element: <GamePage />,
	},
	{
		path: '*',
		element: <Navigate to='/wellcome' replace />,
	},
])

export default Router
