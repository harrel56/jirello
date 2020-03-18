import React, { useState } from 'react';

const buttonClass = 'defaultButton';
const buttonPressedClass = 'defaultButton--pressed';

const Button = props => {
	const [pressed, setPressed] = useState(false);
	return (
		<button
			tabIndex='-1'
			className={buttonClass + (pressed ? ' ' + buttonPressedClass : '')}
			onClick={props.onClick || null}
			onMouseDown={() => setPressed(true)}
			onMouseUp={() => setPressed(false)}
			onMouseLeave={() => setPressed(false)}
		>
			<span>{props.text ? props.text.toUpperCase() : 'BUTTON'}</span>
		</button>
	);
};

export default Button;
