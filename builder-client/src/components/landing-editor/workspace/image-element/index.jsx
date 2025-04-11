import React from 'react'

const ImageElement = ({ element, onElementUpdate, onClick }) => {
	const fileInputRef = React.useRef(null)

	const handleImageClick = e => {
		onClick()
		if (!element.content) {
			fileInputRef.current.click()
		}
	}

	const handleFileChange = e => {
		const file = e.target.files[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = event => {
				onElementUpdate(element.id, event.target.result)
			}
			reader.readAsDataURL(file)
		}
	}

	return (
		<>
			<input
				type='file'
				accept='image/*'
				ref={fileInputRef}
				style={{ display: 'none' }}
				onChange={handleFileChange}
			/>
			<img
				src={element.content || 'placeholder-image.jpg'}
				alt='Добавьте изображение'
				style={{
					width: '200px',
					height: 'auto',
					cursor: 'pointer',
					border: element.content ? 'none' : '2px dashed #ccc',
					margin: '10px 0',
					padding: '10px',
				}}
				onClick={handleImageClick}
			/>
		</>
	)
}

export default ImageElement
