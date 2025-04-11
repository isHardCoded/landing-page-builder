import React from 'react'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import Header from '../header/index'
import Sidebar from './sidebar/index'
import Workspace from './workspace/index'
import styles from './index.module.scss'

const LandingEditor = () => {
	const [elements, setElements] = React.useState([])

	const handleDrop = item => {
		setElements(prevElements => [
			...prevElements,
			{
				id: Date.now(),
				type: item.type,
				content: `${item.type} ${prevElements.length + 1}`,
			},
		])
	}
	return (
		<DndProvider backend={HTML5Backend}>
			<Header />
			<div className={styles.container}>
				<Sidebar />
				<Workspace elements={elements} onDrop={handleDrop} />
			</div>
		</DndProvider>
	)
}

export default LandingEditor
