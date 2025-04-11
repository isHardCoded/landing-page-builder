const DraggableElement = ({ element }) => {
	const renderElement = () => {
		switch (element.type) {
			case 'header':
				return <h1>Заголовок (редактируемый)</h1>
			case 'paragraph':
				return <p>Текст параграфа (редактируемый)</p>
			case 'button':
				return <button>Кнопка</button>
			case 'image':
				return <img src='placeholder.jpg' alt='Placeholder' />
			default:
				return null
		}
	}

	return (
		<div className='draggable-element' draggable>
			{renderElement()}
		</div>
	)
}

export default DraggableElement
