import React, { useState, useEffect } from 'react';
import WorkspaceCard from './WorkspaceCard';
import WorkspaceNew from './WorkspaceNew';
import classNames from 'classnames';

const BASE_CLASS = 'workspace-grid';

const WorkspacePicker = props => {
	const [hidden, setHidden] = useState(true);

	const pickerClass = classNames(BASE_CLASS, {
		[`${BASE_CLASS}--hidden`]: hidden,
		[`${BASE_CLASS}--visible`]: !hidden
	});

	useEffect(() => {
		setTimeout(() => setHidden(false));
	}, []);

	return (
		<div className={pickerClass}>
			{props.workspaces.map(element => (
				<WorkspaceCard key={element.id} data={element} />
			))}
			<WorkspaceNew />
		</div>
	);
};

export default WorkspacePicker;
