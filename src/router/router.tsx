import { GamePage, LeaderboardPage, PlayersPage, WellcomePage, EditPage } from '@pages'
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
		path: '/leaderboard',
		element: <LeaderboardPage />,
	},
	{
		path: '/edit',
		element: <EditPage />,
	},
	{
		path: '*',
		element: <Navigate to='/wellcome' replace />,
	},
], {
	basename: '/10k-scoreboard'
})

export default Router
