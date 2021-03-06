import React from 'react';

const WorkspaceDetails = ({ title, description }) => {
	return (
		<div className='workspace-card__details'>
			<h2>{title}</h2>
			<p>{description}</p>
		</div>
	);
};

export default WorkspaceDetails;
