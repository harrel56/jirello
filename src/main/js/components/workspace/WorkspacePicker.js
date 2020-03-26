import React from 'react';
import WorkspaceCard from './WorkspaceCard';
import WorkspaceNew from './WorkspaceNew';

const BASE_CLASS = 'workspace-grid';

const WorkspacePicker = props => {
	return (
		<div className={BASE_CLASS}>
			{props.workspaces.map(element => (
				<WorkspaceCard key={element.id} data={element} />
			))}
			<WorkspaceNew />
		</div>
	);
};

export default WorkspacePicker;
