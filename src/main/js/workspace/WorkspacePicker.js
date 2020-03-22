/* eslint-disable react/prop-types */
import React from 'react';
import WorkspaceCard from './WorkspaceCard';
import WorkspaceNew from './WorkspaceNew';

const WorkspacePicker = props => {
	return (
		<div className='workspace-grid'>
			{props.workspaces.map(element => (
				<WorkspaceCard key={element.id} data={element} />
			))}
			<WorkspaceNew />
		</div>
	);
};

export default WorkspacePicker;
