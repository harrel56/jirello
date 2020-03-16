import React from 'react';

export const WorkspacePicker = props => {
	return (
		<div className='workspace-grid'>
			{props.workspaces.map((element, idx) => (
				<div key={idx} className='workspace-element'>
					<button>
						<img src='jpg/splash.jpg' alt='Workspace image' height='150' />
						<div className='workspace-details'>
							<h2>{element.title}</h2>
							<p>{element.description}</p>
						</div>
					</button>
					<div>
						<button className='workspace-actions'>EDIT</button>
					</div>
				</div>
			))}
		</div>
	);
};
