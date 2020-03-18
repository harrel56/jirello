import React, { useRef } from 'react';
import Textarea from '../generic/Textarea';
import Spacer from '../generic/Spacer';
import { useClickAwayListener } from '../hooks/useClickAwayListener';
import { useFocusOutListener } from '../hooks/useFocusOutListener';

const WorkspaceEdit = ({ title, description, onEditEnd }) => {
	const mainDiv = useRef(null);
	useClickAwayListener(mainDiv, onEditEnd);
	useFocusOutListener(mainDiv, onEditEnd);

	return (
		<div ref={mainDiv} tabIndex='-1' className='workspace-details'>
			<Textarea name='Title' defaultValue={title} autoFocus />
			<Spacer height='40' />
			<Textarea name='Description' defaultValue={description} autoHeight />
		</div>
	);
};

export default WorkspaceEdit;
