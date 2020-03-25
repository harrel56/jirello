import React from 'react';
import { FiPlus } from 'react-icons/fi';

const ActionButton = ({ className = '', onClick = () => '' }) => {
	return (
		<button className={'actionButton ' + className} onClick={onClick} tabIndex='-1'>
			<FiPlus size='2.25em' color='white' />
		</button>
	);
};

export default ActionButton;
