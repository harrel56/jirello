import React, { useState, useEffect, useRef } from 'react';
import Button from 'components/generic/Button';
import WorkspaceEdit from './WorkspaceEdit';
import WorkspaceDetails from './WorkspaceDetails';
import classNames from 'classnames';

const BASE_CLASS = 'workspace-card';

const WorkspaceCard = props => {
	const forcedEditionMode = props.editionMode;
	const [worskspaceData, setWorskspaceData] = useState(props.data ? props.data : { title: '', description: '' });
	const [editionMode, setEditionMode] = useState(props.editionMode);
	const elementRef = useRef(null);
	const elementClass = classNames(BASE_CLASS, props.className, {
		[`${BASE_CLASS}--edit`]: editionMode,
		[`${BASE_CLASS}--edit-no-transition`]: forcedEditionMode
	});

	useEffect(() => {
		setEditionMode(forcedEditionMode);
	}, [forcedEditionMode]);

	const onEdit = () => {
		elementRef.current.style.minHeight = elementRef.current.getBoundingClientRect().height + 'px';
		setEditionMode(true);
	};

	const onEditEnd = (title, description) => {
		setWorskspaceData({ ...worskspaceData, title: title, description: description });
		if (!forcedEditionMode || title === '') {
			setEditionMode(false);
		}
	};

	return (
		<div ref={elementRef} className={elementClass}>
			<button className={`${BASE_CLASS}__button`}>
				<img className={`${BASE_CLASS}__img`} src='jpg/splash.jpg' alt='Workspace image' height='150' />
				{editionMode ? (
					<WorkspaceEdit title={worskspaceData.title} description={worskspaceData.description} onEditEnd={onEditEnd} />
				) : (
					<WorkspaceDetails title={worskspaceData.title} description={worskspaceData.description} />
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
