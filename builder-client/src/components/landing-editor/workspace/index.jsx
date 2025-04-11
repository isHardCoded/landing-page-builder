import DraggableElement from './DraggableElement'

const WorkspaceArea = ({ elements }) => {
	return (
		<div className='workspace-area'>
			{elements.map(element => (
				<DraggableElement key={element.id} element={element} />
			))}
		</div>
	)
}

export default WorkspaceArea
