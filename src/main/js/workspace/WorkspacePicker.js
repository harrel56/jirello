/* eslint-disable react/prop-types */
import React from 'react';
import WorkspaceCard from './WorkspaceCard';

const WorkspacePicker = props => {
	return (
		<div className='workspace-grid'>
			{props.workspaces.map(element => (
				<WorkspaceCard key={element.id} data={element} />
			))}
		</div>
	);
};

export default WorkspacePicker;
