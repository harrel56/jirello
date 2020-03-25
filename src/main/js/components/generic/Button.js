import React, { useState } from 'react';
import classNames from 'classnames';

const BASE_CLASS = 'button';

const Button = props => {
	const [pressed, setPressed] = useState(false);
	const buttonClass = classNames(BASE_CLASS, {
		[`${BASE_CLASS}--pressed`]: pressed
	});
	return (
		<button
			tabIndex='-1'
			className={buttonClass}
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
