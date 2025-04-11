import React from 'react'
import axios from 'axios'
import Header from '../header/index'
import Sidebar from './sidebar/index'
import Workspace from './workspace/index'
import styles from './index.module.scss'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useParams, useNavigate } from 'react-router-dom'
import { ItemTypes } from '../../utils/itemTypes'
import { API_BASE } from '../../../constaints'

const LOCAL_STORAGE_KEY = 'landingEditorData'

const LandingEditor = ({ loadSavedLanding }) => {
	const { id } = useParams()
	const navigate = useNavigate()

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

	React.useEffect(() => {
		if (loadSavedLanding) {
			setElements(loadSavedLanding.elements)
		}
	}, [loadSavedLanding])

	React.useEffect(() => {
		const loadLanding = async () => {
			if (id) {
				try {
					const response = await axios.get(`${API_BASE}/landingPages/${id}`)
					setElements(response.data.elements)
				} catch (error) {
					console.error('Error loading landing:', error)
					alert('Error loading landing page')
				}
			}
		}
		loadLanding()
	}, [id])

	const handleSaveToServer = async () => {
		try {
			const name = prompt(
				'Enter landing page name:',
				id ? `Landing ${id}` : 'New Landing'
			)
			if (!name) return

			const data = {
				name,
				elements,
				updatedAt: new Date().toISOString(),
			}

			if (id) {
				await axios.patch(`${API_BASE}/landingPages/${id}`, data)
				alert('Landing page updated successfully!')
			} else {
				const response = await axios.post(API_URL, {
					...data,
					createdAt: new Date().toISOString(),
				})
				navigate(`/editor/${response.data.id}`)
				alert('Landing page saved successfully!')
			}
		} catch (error) {
			console.error('Error saving landing page:', error)
			alert('Error saving landing page')
		}
	}

	React.useEffect(() => {
		if (id) {
			const autoSave = async () => {
				try {
					await axios.patch(`${API_BASE}/landingPages/${id}`, {
						elements,
						updatedAt: new Date().toISOString(),
					})
					console.log('Autosaved successfully')
				} catch (error) {
					console.error('Autosave error:', error)
				}
			}

			const timeoutId = setTimeout(autoSave, 1000)
			return () => clearTimeout(timeoutId)
		}
	}, [elements, id])

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

	const handleDeleteElement = elementId => {
		setElements(prev => prev.filter(el => el.id !== elementId))
		setSelectedElementId(null)
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

	const escapeHTML = str => {
		return str
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;')
	}

	const generateHTML = () => {
		const elementsHTML = elements
			.map(element => {
				const style = []
				switch (element.type) {
					case ItemTypes.HEADER:
					case ItemTypes.TEXT:
						style.push('margin: 10px 0', 'padding: 10px', 'cursor: text')
						style.push(
							`color: ${element.textColor}`,
							`background-color: ${element.backgroundColor}`
						)
						break
					case ItemTypes.BUTTON:
						style.push('margin: 10px 0', 'padding: 10px', 'cursor: pointer')
						style.push(
							`color: ${element.textColor}`,
							`background-color: ${element.backgroundColor}`
						)
						style.push('border-radius: 3px', 'border: 0', 'outline: 0')
						break
					case ItemTypes.IMAGE:
						style.push('width: 200px', 'height: auto', 'cursor: pointer')
						style.push(
							`border: ${element.content ? 'none' : '2px dashed #ccc'}`
						)
						style.push('margin: 10px 0', 'padding: 10px')
						break
					default:
						break
				}
				const styleString = style.join('; ')

				let content
				switch (element.type) {
					case ItemTypes.IMAGE:
						content = element.content
							? `src="${element.content}" alt="Uploaded Image"`
							: 'src="placeholder-image.jpg" alt="Add image"'
						break
					default:
						content = escapeHTML(element.content)
				}

				switch (element.type) {
					case ItemTypes.HEADER:
						return `<h1 style="${styleString}">${content}</h1>`
					case ItemTypes.TEXT:
						return `<p style="${styleString}">${content}</p>`
					case ItemTypes.BUTTON:
						return `<button style="${styleString}">${content}</button>`
					case ItemTypes.IMAGE:
						return `<img ${content} style="${styleString}" />`
					default:
						return ''
				}
			})
			.join('\n')

		return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<link
			href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
			rel="stylesheet"
		/>
  <title>Generated Landing Page</title>
<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;

	font-family: 'Roboto', sans-serif;
}
</style>
</head>
<body style="padding: 20px;">
  <div style="display: flex; flex-direction: column; align-items: start; max-width: 1220px; margin: 0 auto;">
${elementsHTML}
</div>
</body>
</html>`
	}

	const handleSaveHTML = () => {
		const htmlString = generateHTML()
		const blob = new Blob([htmlString], { type: 'text/html' })
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = 'landing.html'
		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
		URL.revokeObjectURL(url)
	}

	return (
		<DndProvider backend={HTML5Backend}>
			<Header isHome={true} />
			<div className={styles.container}>
				<Sidebar
					selectedElementId={selectedElementId}
					elements={elements}
					onColorChange={handleColorChange}
					onDeleteElement={handleDeleteElement}
					onSave={handleSaveHTML}
					onSaveToServer={handleSaveToServer}
					id={id}
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
