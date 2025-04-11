import React from 'react'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import Header from '../header/index'
import Sidebar from './sidebar/index'
import Workspace from './workspace/index'
import styles from './index.module.scss'

import { ItemTypes } from '../../utils/itemTypes'

const LandingEditor = () => {
	const [elements, setElements] = React.useState([])
	const [editingElementId, setEditingElementId] = React.useState(null)
	const [newContent, setNewContent] = React.useState('')

	const handleDrop = item => {
		setElements(prevElements => [
			...prevElements,
			{
				id: Date.now(),
				type: item.type,
				content:
					item.type === ItemTypes.IMAGE
						? ''
						: `${item.type} ${prevElements.length + 1}`,
			},
		])
	}

	const handleUpdateElement = (elementId, newContent) => {
		setElements(prev =>
			prev.map(el =>
				el.id === elementId ? { ...el, content: newContent } : el
			)
		)
		setEditingElementId(null)
	}

	return (
		<DndProvider backend={HTML5Backend}>
			<Header isHome={true} />
			<div className={styles.container}>
				<Sidebar />
				<Workspace
					elements={elements}
					onDrop={handleDrop}
					onElementUpdate={handleUpdateElement}
					editingElementId={editingElementId}
					setEditingElementId={setEditingElementId}
					newContent={newContent}
					setNewContent={setNewContent}
				/>
			</div>
		</DndProvider>
	)
}

export default LandingEditor
