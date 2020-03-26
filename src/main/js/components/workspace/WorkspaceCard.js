import React, { useState, useRef } from 'react';
import Button from 'components/generic/Button';
import WorkspaceEdit from './WorkspaceEdit';
import WorkspaceDetails from './WorkspaceDetails';
import classNames from 'classnames';

const BASE_CLASS = 'workspace-card';

const WorkspaceCard = props => {
	const forcedEditionMode = props.editionMode;
	const [workspaceData, setWorkspaceData] = useState(props.data ? props.data : { title: '', description: '' });
	const [editionMode, setEditionMode] = useState(forcedEditionMode);
	const elementRef = useRef(null);
	const elementClass = classNames(BASE_CLASS, props.className, {
		[`${BASE_CLASS}--edit`]: editionMode
	});

	const onEdit = () => {
		elementRef.current.style.minHeight = elementRef.current.getBoundingClientRect().height + 'px';
		setEditionMode(true);
	};

	const onEditEnd = (title, description) => {
		if (forcedEditionMode && title === '') {
			props.onEditInterrupt();
		} else {
			title = title === '' ? workspaceData.title : title;
			setWorkspaceData({ ...workspaceData, title: title, description: description });
			setEditionMode(false);
		}
	};

	return (
		<div ref={elementRef} className={elementClass}>
			<button className={`${BASE_CLASS}__button`}>
				<img className={`${BASE_CLASS}__img`} src='jpg/splash.jpg' alt='Workspace image' height='150' />
				{editionMode ? (
					<WorkspaceEdit title={workspaceData.title} description={workspaceData.description} onEditEnd={onEditEnd} />
				) : (
					<WorkspaceDetails title={workspaceData.title} description={workspaceData.description} />
				)}
			</button>
			{editionMode || (
				<div>
					<Button text='edit' onClick={onEdit} />
				</div>
			)}
		</div>
	);
};

export default WorkspaceCard;
