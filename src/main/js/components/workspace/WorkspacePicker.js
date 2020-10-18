import React, { useContext } from 'react';
import WorkspaceCard from './WorkspaceCard';
import WorkspaceNew from './WorkspaceNew';
import { WorkspacesContext } from '../../context/WorkspacesContext';

const BASE_CLASS = 'workspace-grid';

const WorkspacePicker = () => {
	const { getWorkspaces } = useContext(WorkspacesContext);



	return (
		<div className={BASE_CLASS}>
			{getWorkspaces().map(element => (
				<WorkspaceCard key={element.id} data={element} />
			))}
			<WorkspaceNew />
		</div>
	);
};

export default WorkspacePicker;
