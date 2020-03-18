import React from 'react';
import WorkspacePicker from './WorkspacePicker';

const WorkspacePickerContainer = () => {
	const workspaces = [
		{
			id: 'a10',
			title: 'Worskpace 1',
			description:
				'By default, we use the combination of a <div> element and a background image to display the media. It can be problematic in some situations'
		},
		{
			id: 'a12',
			title: 'Other workspace',
			description:
				'By default, we use the combination of a <div> element and a background image to display the media. It can be problematic in some situations By default, we use the combination of a <div> element and a background image to display the media. It can be problematic in some situations By default, we use the combination of a <div> element and a background image to display the media. It can be problematic in some situations'
		},
		{
			id: 'a13',
			title: 'Other workspace',
			description:
				'By default, we use the combination of a <div> element and a background image to display the media. It can be problematic in some situations'
		},
		{
			id: 'a14',
			title: 'Other workspace',
			description:
				'By default, we use the combination of a <div> element and a background image to display the media. It can be problematic in some situations'
		},
		{
			id: 'a15',
			title: 'Other workspace',
			description:
				'By default, we use the combination of a <div> element and a background image to display the media. It can be problematic in some situations'
		},
		{
			id: 'a16',
			title: 'Other workspace',
			description:
				'By default, we use the combination of a <div> element and a background image to display the media. It can be problematic in some situations'
		},
		{
			id: 'a17',
			title: 'Other workspace',
			description:
				'By default, we use the combination of a <div> element and a background image to display the media. It can be problematic in some situations'
		},
		{
			id: 'a18',
			title: 'Other workspace',
			description:
				'By default, we use the combination of a <div> element and a background image to display the media. It can be problematic in some situations'
		},
		{
			id: 'a19',
			title: 'Other workspace',
			description:
				'By default, we use the combination of a <div> element and a background image to display the media. It can be problematic in some situations'
		}
	];
	return <WorkspacePicker workspaces={workspaces} />;
};

export default WorkspacePickerContainer;
