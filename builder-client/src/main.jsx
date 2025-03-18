import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { ROUTES } from '../constaints'

createRoot(document.getElementById('root')).render(
	<Router>
		<Routes>
			<Route path='/' element={ROUTES.home} />
		</Routes>
	</Router>
)
