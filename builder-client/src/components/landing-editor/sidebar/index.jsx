import { useDrag } from 'react-dnd'
import { ItemTypes } from '../../../utils/itemTypes'

import styles from '../index.module.scss'

const SidebarItem = ({ type, name }) => {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: type,
		item: { type: type },
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
	}))

	return (
		<div
			ref={drag}
			className={styles.sidebarItem}
			style={{ opacity: isDragging ? 0.5 : 1 }}
		>
			{name}
		</div>
	)
}

const Sidebar = ({
	selectedElementId,
	elements,
	onColorChange,
	onDeleteElement,
	onSave,
	onSaveToServer,
	id,
}) => {
	const selectedElement = elements.find(el => el.id === selectedElementId)
	const isColorEditable =
		selectedElement &&
		[ItemTypes.HEADER, ItemTypes.TEXT, ItemTypes.BUTTON].includes(
			selectedElement.type
		)
	return (
		<div className={styles.sidebar}>
			<h3>Elements</h3>
			<SidebarItem type={ItemTypes.HEADER} name='Header' />
			<SidebarItem type={ItemTypes.TEXT} name='Text Block' />
			<SidebarItem type={ItemTypes.BUTTON} name='Button' />
			<SidebarItem type={ItemTypes.IMAGE} name='Image' />
			<button onClick={onSave} className={styles.saveButton}>
				Save as HTML
			</button>
			<button onClick={onSaveToServer} className={styles.saveButton}>
				{id ? 'Save Changes' : 'Save New'}
			</button>
			{selectedElement && (
				<div className={styles.propertiesPanel}>
					<h3>Properties</h3>

					{isColorEditable && (
						<>
							<div className={styles.colorPicker}>
								<label>Text Color</label>
								<input
									type='color'
									value={selectedElement.textColor}
									onChange={e =>
										onColorChange(
											selectedElement.id,
											'textColor',
											e.target.value
										)
									}
								/>
							</div>
							<div className={styles.colorPicker}>
								<label>Background Color</label>
								<input
									type='color'
									value={selectedElement.backgroundColor}
									onChange={e =>
										onColorChange(
											selectedElement.id,
											'backgroundColor',
											e.target.value
										)
									}
								/>
							</div>
						</>
					)}

					<button
						className={styles.deleteButton}
						onClick={() => onDeleteElement(selectedElement.id)}
						style={{ padding: 10 }}
					>
						Delete element
					</button>
				</div>
			)}
		</div>
	)
}

export default Sidebar
