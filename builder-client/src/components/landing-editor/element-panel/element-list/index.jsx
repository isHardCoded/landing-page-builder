import ElementButton from '../element-button/index'

const ElementsList = ({ onAddElement }) => {
	const ELEMENTS = [
		{ type: 'header', label: 'Заголовок' },
		{ type: 'paragraph', label: 'Текст' },
		{ type: 'button', label: 'Кнопка' },
		{ type: 'image', label: 'Изображение' },
	]

	return (
		<div className='elements-list'>
			{ELEMENTS.map(el => (
				<ElementButton
					key={el.type}
					type={el.type}
					label={el.label}
					onClick={onAddElement}
				/>
			))}
		</div>
	)
}

export default ElementsList
