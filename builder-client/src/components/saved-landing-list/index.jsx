import React from 'react'
import axios from 'axios'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'
import { API_BASE } from '../../../constaints'

const SavedLandingsList = () => {
	const [landings, setLandings] = React.useState([])

	React.useEffect(() => {
		const fetchLandings = async () => {
			try {
				const response = await axios.get(`${API_BASE}/landingPages`)
				setLandings(response.data)
			} catch (error) {
				console.error('Error fetching landings:', error)
			}
		}
		fetchLandings()
	}, [])

	return (
		<div>
			<h2 style={{ marginBottom: 50 }}>Saved Landings</h2>
			{landings.length > 0 ? (
				<div className={styles.landingList}>
					{landings.map(landing => (
						<div key={landing.id} className={styles.landingItem}>
							<div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
								<h3>{landing.name}</h3>
								<p>{new Date(landing.createdAt).toLocaleDateString()}</p>
							</div>
							<Link to={`/editor/${landing.id}`}>Open</Link>
						</div>
					))}
				</div>
			) : (
				<div>There is no landings</div>
			)}
		</div>
	)
}

export default SavedLandingsList
