import { WellcomePage } from '@pages'
import { createBrowserRouter } from 'react-router-dom'

const Router = createBrowserRouter([
	{
		path: '/',
		element: <WellcomePage />,
	},
])

export default Router
