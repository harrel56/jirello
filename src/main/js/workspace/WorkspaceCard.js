import React, { useState } from 'react';
import Button from '../generic/Button';
import WorkspaceEdit from './WorkspaceEdit';
import WorkspaceDetails from './WorkspaceDetails';

const WorkspaceCard = props => {
	const { title, description } = props.data;
	const [editionMode, setEditionMode] = useState(false);

	return (
		<div className={'workspace-element' + (editionMode ? ' workspace-element--edit' : '')}>
			<button className='workspace-button'>
				<img src='jpg/splash.jpg' alt='Workspace image' height='150' />
				{editionMode ? (
					<WorkspaceEdit title={title} description={description} onEditEnd={() => setEditionMode(false)} />
				) : (
					<WorkspaceDetails title={title} description={description} />
				)}
			</button>
			{editionMode || (
				<div>
					<Button text='edit' onClick={() => setEditionMode(true)} />
				</div>
			)}
		</div>
	);
};

export default WorkspaceCard;
