const ROUTES = {
	HOME: '/',
	LANDING_EDITOR: '/editor',
	CURRENT_LANDING_EDITOR: '/editor/:id',
	CONTACTS: '/contacts',
	NOT_FOUND: '*',
}

export const API_BASE =
	import.meta.env.VITE_API_URL || 'https://landing-server-dvh5.onrender.com'
const DEFAULT_HEADERS = null

export { ROUTES, DEFAULT_HEADERS, API_BASE }
