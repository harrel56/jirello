import React, { useState, useEffect, useRef } from 'react';
import Button from '../generic/Button';
import WorkspaceEdit from './WorkspaceEdit';
import WorkspaceDetails from './WorkspaceDetails';
import classNames from 'classnames';

const BASE_CLASS = 'workspace-card';

const WorkspaceCard = props => {
	const { title, description } = props.data ? props.data : { title: '', description: '' };
	const forcedEditionMode = props.editionMode;
	const [editionMode, setEditionMode] = useState(props.editionMode);
	const elementRef = useRef(null);
	const elementClass = classNames(BASE_CLASS, props.className, {
		[`${BASE_CLASS}--edit`]: editionMode,
		[`${BASE_CLASS}--`]: forcedEditionMode
	});

	useEffect(() => {
		setEditionMode(forcedEditionMode);
	}, [forcedEditionMode]);

	const onEdit = () => {
		elementRef.current.style.minHeight = elementRef.current.getBoundingClientRect().height + 'px';
		setEditionMode(true);
	};

	const onEditEnd = () => {
		if (!forcedEditionMode) {
			setEditionMode(false);
		}
	};

	return (
		<div ref={elementRef} className={elementClass}>
			<button className={`${BASE_CLASS}__button`}>
				<img className={`${BASE_CLASS}__img`} src='jpg/splash.jpg' alt='Workspace image' height='150' />
				{editionMode ? (
					<WorkspaceEdit title={title} description={description} onEditEnd={onEditEnd} />
				) : (
					<WorkspaceDetails title={title} description={description} />
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
