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

const Sidebar = () => {
	return (
		<div className={styles.sidebar}>
			<h3>Elements</h3>
			<SidebarItem type={ItemTypes.HEADER} name='Header' />
			<SidebarItem type={ItemTypes.TEXT} name='Text Block' />
			<SidebarItem type={ItemTypes.BUTTON} name='Button' />
			<SidebarItem type={ItemTypes.IMAGE} name='Image' />
		</div>
	)
}

export default Sidebar
