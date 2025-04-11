const ElementButton = ({ type, label, onClick }) => {
	return (
		<button className='element-button' onClick={() => onClick(type)}>
			{label}
		</button>
	)
}

export default ElementButton
