import React, { useState } from 'react';
import ActionButton from 'components/generic/ActionButton';
import WorkspaceCard from './WorkspaceCard';
import classNames from 'classnames';

const BASE_CARD_CLASS = 'workspace-new';
const BASE_BUTTON_CLASS = 'workspace-button-new';

const WorkspaceNew = () => {
	const [editionMode, setEditionMode] = useState(false);
	const cardClass = classNames(BASE_CARD_CLASS, {
		[`${BASE_CARD_CLASS}--visible`]: editionMode,
		[`${BASE_CARD_CLASS}--hidden`]: !editionMode
	});
	const buttonClass = classNames(BASE_BUTTON_CLASS, {
		[`${BASE_BUTTON_CLASS}--visible`]: !editionMode,
		[`${BASE_BUTTON_CLASS}--hidden`]: editionMode
	});

	return (
		<div style={{ position: 'relative' }}>
			<WorkspaceCard className={cardClass} editionMode={editionMode} />
			<ActionButton className={buttonClass} onClick={() => setEditionMode(true)} />
		</div>
	);
};

export default WorkspaceNew;
