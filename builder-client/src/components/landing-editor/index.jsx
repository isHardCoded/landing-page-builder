import React from 'react'
import Header from './../../components/header/index'

import styles from './index.module.scss'
import ElementsList from './element-panel/element-list'
import WorkspaceArea from './workspace'

const LandingBuilder = () => {
	const [elements, setElements] = React.useState([])

	const addElement = type => {
		const newElement = {
			id: Date.now(),
			type,
			props: {},
		}
		console.log(newElement)
		setElements([...elements, newElement])
	}

	return (
		<>
			<Header />
			<div className={styles.container}>
				<div className={styles.leftPanel}>
					<ElementsList onAddElement={addElement} />
				</div>
				<div className={styles.workspace}>
					<WorkspaceArea elements={elements} />
				</div>
			</div>
		</>
	)
}

export default LandingBuilder
