import React from 'react'

import { useDrop } from 'react-dnd'
import { ItemTypes } from '../../../utils/itemTypes'

import styles from '../index.module.scss'

const Workspace = ({ elements, onDrop }) => {
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

	const renderElement = element => {
		const baseStyle = {
			margin: '10px 0',
			padding: '10px',
			border: '1px solid #ddd',
		}

		switch (element.type) {
			case ItemTypes.HEADER:
				return <h1 style={baseStyle}>{element.content}</h1>
			case ItemTypes.TEXT:
				return <p style={baseStyle}>{element.content}</p>
			case ItemTypes.BUTTON:
				return <button style={baseStyle}>{element.content}</button>
			case ItemTypes.IMAGE:
				return (
					<img
						src='placeholder-image.jpg'
						alt='placeholder'
						style={{ ...baseStyle, width: '200px', height: 'auto' }}
					/>
				)
			default:
				return null
		}
	}

	React.useEffect(() => {
		console.log('Current elements:', elements)
	}, [elements])

	return (
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

			{elements.map(element => (
				<div key={element.id} className={styles.element}>
					{renderElement(element)}
				</div>
			))}
		</div>
	)
}

export default Workspace
