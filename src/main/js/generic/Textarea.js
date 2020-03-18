import React, { useState, useEffect, useRef } from 'react';

const Textarea = props => {
	const [focused, setFocused] = useState(false);
	const textarea = useRef(null);
	useEffect(() => {
		if (props.autoFocus) {
			const val = textarea.current.value;
			textarea.current.value = '';
			textarea.current.focus();
			textarea.current.value = val;
		}
	}, []);

	const style = props.autoHeight ? { height: '100%' } : {};
	const outerClass = 'defaultTextarea-container' + (focused ? ' defaultTextarea-container--focused' : '');

	return (
		<div style={style} className={outerClass}>
			<label className='defaultLabel' htmlFor={props.name}>
				{props.name}
			</label>
			<div style={style}>
				<textarea
					id={props.name}
					ref={textarea}
					className='defaultTextarea'
					rows='1'
					defaultValue={props.defaultValue}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
				></textarea>
			</div>
		</div>
	);
};

export default Textarea;
