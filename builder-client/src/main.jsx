import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { ROUTES } from '../constaints'

import Home from './pages/home'

createRoot(document.getElementById('root')).render(
	<Router>
		<Routes>
			<Route path={ROUTES.HOME} element={<Home />} />
		</Routes>
	</Router>
)
