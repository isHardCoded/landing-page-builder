import React from 'react'
import ImageElement from './image-element'

import { useDrop } from 'react-dnd'
import { ItemTypes } from '../../../utils/itemTypes'

import styles from '../index.module.scss'

const Workspace = ({
	elements,
	onDrop,
	onElementUpdate,
	editingElementId,
	setEditingElementId,
	newContent,
	setNewContent,
	setSelectedElementId,
}) => {
	const [{ canDrop, isOver }, drop] = useDrop(() => ({
		accept: Object.values(ItemTypes),
		drop: (item, monitor) => {
			onDrop(item, monitor)
		},
		collect: monitor => ({
			isOver: !!monitor.isOver(),
			canDrop: !!monitor.canDrop(),
		}),
	}))

	const handleTextEdit = element => {
		setEditingElementId(element.id)
		setNewContent(element.content)
	}

	const handleBlurOrEnter = (e, element) => {
		if (e.type === 'keydown' && e.key !== 'Enter') return
		onElementUpdate(element.id, newContent)
	}

	const renderElement = element => {
		const baseStyle = {
			margin: '10px 0',
			padding: '10px',
			cursor: 'text',
			color: element.textColor,
			backgroundColor: element.backgroundColor,
		}

		switch (element.type) {
			case ItemTypes.HEADER:
				return editingElementId === element.id ? (
					<input
						type='text'
						value={newContent}
						onChange={e => setNewContent(e.target.value)}
						onBlur={e => handleBlurOrEnter(e, element)}
						onKeyDown={e => handleBlurOrEnter(e, element)}
						autoFocus
						style={{
							...baseStyle,
							color: element.textColor,
							backgroundColor: element.backgroundColor,
						}}
					/>
				) : (
					<h1
						style={baseStyle}
						onDoubleClick={() => handleTextEdit(element)}
						onClick={() => setSelectedElementId(element.id)}
					>
						{element.content}
					</h1>
				)
			case ItemTypes.TEXT:
				return editingElementId === element.id ? (
					<input
						type='text'
						value={newContent}
						onChange={e => setNewContent(e.target.value)}
						onBlur={e => handleBlurOrEnter(e, element)}
						onKeyDown={e => handleBlurOrEnter(e, element)}
						autoFocus
						style={{
							...baseStyle,
							color: element.textColor,
							backgroundColor: element.backgroundColor,
						}}
					/>
				) : (
					<p
						style={baseStyle}
						onDoubleClick={() => handleTextEdit(element)}
						onClick={() => setSelectedElementId(element.id)}
					>
						{element.content}
					</p>
				)
			case ItemTypes.BUTTON:
				return editingElementId === element.id ? (
					<input
						type='text'
						value={newContent}
						onChange={e => setNewContent(e.target.value)}
						onBlur={e => handleBlurOrEnter(e, element)}
						onKeyDown={e => handleBlurOrEnter(e, element)}
						autoFocus
						style={{
							...baseStyle,
							color: element.textColor,
							backgroundColor: element.backgroundColor,
						}}
					/>
				) : (
					<button
						style={baseStyle}
						onDoubleClick={() => handleTextEdit(element)}
						onClick={() => setSelectedElementId(element.id)}
					>
						{element.content}
					</button>
				)
			case ItemTypes.IMAGE:
				return (
					<ImageElement element={element} onElementUpdate={onElementUpdate} />
				)
			default:
				return null
		}
	}

	React.useEffect(() => {
		console.log('Current elements:', elements)
	}, [elements])

	return (
		<>
			<div
				ref={drop}
				className={styles.workspace}
				style={{
					backgroundColor: isOver ? '#f0f0f0' : '#fff',
					border: canDrop ? '2px dashed #666' : '2px dashed transparent',
					minHeight: '500px',
				}}
			>
				{elements.length === 0 && (
					<div className={styles.placeholder}>Перетащите элементы сюда</div>
				)}

				{elements.map((element, index) => (
					<div
						key={element.id}
						className={styles.element}
						style={{ order: index }}
					>
						{renderElement(element)}
					</div>
				))}
			</div>
		</>
	)
}

export default Workspace
