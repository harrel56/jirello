import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';

const BASE_CLASS = 'textarea-container';

const Textarea = props => {
	const [focused, setFocused] = useState(false);
	const textarea = useRef(null);
	const outerClass = classNames(BASE_CLASS, {
		[`${BASE_CLASS}--focused`]: focused
	});
	useEffect(() => {
		if (props.autoFocus) {
			const val = textarea.current.value;
			textarea.current.value = '';
			textarea.current.focus();
			textarea.current.value = val;
		}
	}, []);

	const style = props.autoHeight ? { flex: 'auto' } : {};

	return (
		<div style={style} className={outerClass}>
			<label className='label' htmlFor={props.name}>
				{props.name}
			</label>
			<div className='u-flex-column' style={style}>
				<textarea
					style={style}
					id={props.name}
					ref={textarea}
					className={`${BASE_CLASS}__textarea u-flex-column`}
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
