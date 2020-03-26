import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import ActionButton from 'components/generic/ActionButton';
import WorkspaceCard from './WorkspaceCard';

const BASE_CARD_CLASS = 'workspace-new';
const BASE_BUTTON_CLASS = 'workspace-button-new';

const WorkspaceNew = () => {
	const [editionMode, setEditionMode] = useState(false);

	return (
		<div style={{ position: 'relative' }}>
			<CSSTransition in={editionMode} timeout={300} classNames='slide-down' unmountOnExit>
				<WorkspaceCard className={BASE_CARD_CLASS} editionMode onEditInterrupt={() => setEditionMode(false)} />
			</CSSTransition>
			<CSSTransition in={!editionMode} timeout={300} classNames='slide-up' unmountOnExit>
				<ActionButton className={BASE_BUTTON_CLASS} onClick={() => setEditionMode(true)} />
			</CSSTransition>
		</div>
	);
};

export default WorkspaceNew;
