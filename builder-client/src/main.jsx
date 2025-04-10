import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { ROUTES } from '../constaints'

import Home from './pages/home'
import LandingEditor from './components/landing-editor'

createRoot(document.getElementById('root')).render(
	<div className='container'>
		<Router>
			<Routes>
				<Route path={ROUTES.HOME} element={<Home />} />
				<Route path={ROUTES.LANDING_EDITOR} element={<LandingEditor />} />
			</Routes>
		</Router>
	</div>
)
