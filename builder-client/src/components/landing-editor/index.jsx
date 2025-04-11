import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Header from '../header/index'
import Sidebar from './sidebar/index'
import Workspace from './workspace/index'
import styles from './index.module.scss'
import { ItemTypes } from '../../utils/itemTypes'

const LOCAL_STORAGE_KEY = 'landingEditorData'

const LandingEditor = () => {
	const [elements, setElements] = React.useState(() => {
		const savedData = localStorage.getItem(LOCAL_STORAGE_KEY)
		return savedData ? JSON.parse(savedData) : []
	})

	const [editingElementId, setEditingElementId] = React.useState(null)
	const [selectedElementId, setSelectedElementId] = React.useState(null)
	const [newContent, setNewContent] = React.useState('')

	React.useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(elements))
	}, [elements])

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
				textColor: '#000000',
				backgroundColor: '#FFFFFF',
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

	const handleColorChange = (elementId, colorType, colorValue) => {
		setElements(prev =>
			prev.map(el =>
				el.id === elementId ? { ...el, [colorType]: colorValue } : el
			)
		)
	}

	return (
		<DndProvider backend={HTML5Backend}>
			<Header isHome={true} />
			<div className={styles.container}>
				<Sidebar
					selectedElementId={selectedElementId}
					elements={elements}
					onColorChange={handleColorChange}
				/>
				<Workspace
					elements={elements}
					onDrop={handleDrop}
					onElementUpdate={handleUpdateElement}
					editingElementId={editingElementId}
					setEditingElementId={setEditingElementId}
					newContent={newContent}
					setNewContent={setNewContent}
					setSelectedElementId={setSelectedElementId}
				/>
			</div>
		</DndProvider>
	)
}

export default LandingEditor
