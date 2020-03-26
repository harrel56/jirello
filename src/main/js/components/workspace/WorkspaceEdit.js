import React, { useState, useRef } from 'react';
import Textarea from 'components/generic/Textarea';
import Spacer from 'components/generic/Spacer';
import { useClickAwayListener } from 'hooks/useClickAwayListener';
import { useFocusOutListener } from 'hooks/useFocusOutListener';

const WorkspaceEdit = props => {
	const [title, setTitle] = useState(props.title);
	const [description, setDescription] = useState(props.description);
	const mainDiv = useRef(null);

	const onEditEnd = () => {
		props.onEditEnd(title, description);
	};

	useClickAwayListener(mainDiv, onEditEnd);
	useFocusOutListener(mainDiv, onEditEnd);

	return (
		<div ref={mainDiv} tabIndex='-1' className='workspace-card__details'>
			<Textarea name='Title' defaultValue={title} onChange={e => setTitle(e.target.value)} autoFocus />
			<Spacer height='40' />
			<Textarea
				name='Description'
				defaultValue={description}
				onChange={e => setDescription(e.target.value)}
				autoHeight
			/>
		</div>
	);
};

export default WorkspaceEdit;
