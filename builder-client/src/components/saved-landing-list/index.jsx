import React from 'react'
import axios from 'axios'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'
import { API_BASE } from '../../../constaints'

const SavedLandingsList = () => {
	const [landings, setLandings] = React.useState([])

	const fetchLandings = async () => {
		try {
			const response = await axios.get(`${API_BASE}/landingPages`)
			setLandings(response.data)
		} catch (error) {
			console.error('Error fetching landings:', error)
		}
	}

	React.useEffect(() => {
		fetchLandings()
	}, [])

	const handleDelete = async id => {
		if (window.confirm('Are you sure you want to delete this landing page?')) {
			try {
				await axios.delete(`${API_BASE}/landingPages/${id}`)
				fetchLandings()
				alert('Landing page deleted successfully!')
			} catch (error) {
				console.error('Error deleting landing page:', error)
				alert('Error deleting landing page')
			}
		}
	}

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
							<div>
								<Link to={`/editor/${landing.id}`}>Open</Link>
								<button
									onClick={() => handleDelete(landing.id)}
									className={styles.deleteButton}
								>
									Delete
								</button>
							</div>
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
