import { createRoot } from 'react-dom/client'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { ROUTES } from '../constaints'

import Home from './pages/home'
import LandingEditor from './components/landing-editor'
import NotFound from './pages/not-found'

createRoot(document.getElementById('root')).render(
	<div className='container'>
		<DndProvider backend={HTML5Backend}>
			<Router>
				<Routes>
					<Route path={ROUTES.HOME} element={<Home />} />
					<Route path={ROUTES.LANDING_EDITOR} element={<LandingEditor />} />
					<Route path={ROUTES.NOT_FOUND} element={<NotFound />}></Route>
				</Routes>
			</Router>
		</DndProvider>
	</div>
)
