import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import ActionButton from 'components/generic/ActionButton';
import WorkspaceCard from './WorkspaceCard';

const BASE_CARD_CLASS = 'workspace-new';
const BASE_BUTTON_CLASS = 'workspace-button-new';
const WorkspaceNew = () => {
	const [editionMode, setEditionMode] = useState(false);
	const [created, setCreated] = useState(false);

	const onEditSuccess = () => {
		setCreated(true);
		setEditionMode(false);
	};

	const onClick = () => {
		setCreated(false);
		setEditionMode(true);
	};

	return (
		<div style={{ position: 'relative' }}>
			<CSSTransition in={editionMode} timeout={300} classNames="slide-down" unmountOnExit enter={!created} exit={!created}>
				<WorkspaceCard className={BASE_CARD_CLASS} editionMode onEditInterrupt={() => setEditionMode(false)} onEditSuccess={onEditSuccess} />
			</CSSTransition>
			<CSSTransition in={!editionMode} timeout={300} classNames="slide-up" unmountOnExit enter={!created} exit={!created}>
				<ActionButton className={BASE_BUTTON_CLASS} onClick={onClick} />
			</CSSTransition>
		</div>
	);
};

export default WorkspaceNew;
