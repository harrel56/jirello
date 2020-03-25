import React from 'react';

const BASE_CLASS = 'spinner';

const Spinner = () => {
	return (
		<div className={BASE_CLASS + '-container'}>
			<div className={BASE_CLASS}>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export default Spinner;
