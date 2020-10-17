/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useContext, useEffect } from 'react';
import Button from 'components/generic/Button';
import WorkspaceEdit from './WorkspaceEdit';
import WorkspaceDetails from './WorkspaceDetails';
import classNames from 'classnames';
import useLazyQuery from '../../hooks/useLazyQuery';
import { workspaceUpdate, workspaceCreate } from '../../util/queries';
import { useSnackbarSuccess, useSnackbarError } from '../../hooks/useSnackbar';

const BASE_CLASS = 'workspace-card';

const WorkspaceCard = props => {
	const isNewEntry = props.editionMode;
	const [workspaceData, setWorkspaceData] = useState(props.data ? props.data : { title: '', description: '' });
	const [editionMode, setEditionMode] = useState(isNewEntry);

	const { executionCallback: callUpdate, loading, error, data } = useLazyQuery();

	const openSnackbarSuccess = useSnackbarSuccess();
	const openSnackbarError = useSnackbarError();

	console.info(loading);
	console.info(error);
	console.info(data);
	useEffect(() => {
		if (data) {
			openSnackbarSuccess(data.title);
			setWorkspaceData(data);
		}
	}, [data]);

	useEffect(() => {
		if (error) {
			openSnackbarError(workspaceData.title);
		}
	}, [error]);

	const elementRef = useRef(null);
	const elementClass = classNames(BASE_CLASS, props.className, {
		[`${BASE_CLASS}--edit`]: editionMode
	});

	const onEdit = () => {
		elementRef.current.style.minHeight = elementRef.current.getBoundingClientRect().height + 'px';
		setEditionMode(true);
	};

	const onEditEnd = (title, description) => {
		if (isNewEntry && title === '') {
			props.onEditInterrupt();
		} else {
			title = title === '' ? workspaceData.title : title;
			const newWorkspace = { ...workspaceData, title: title, description: description };
			if (!workspaceData.id) {
				callUpdate(workspaceCreate(newWorkspace));
			} else if (JSON.stringify(workspaceData) !== JSON.stringify(newWorkspace)) {
				setWorkspaceData(newWorkspace);
				callUpdate(workspaceUpdate(newWorkspace));
			}
			setEditionMode(false);
		}
	};

	return (
		<div ref={elementRef} className={elementClass}>
			<button className={`${BASE_CLASS}__button`}>
				<img className={`${BASE_CLASS}__img`} src='jpg/splash.jpg' alt='Workspace image' height='150' />
				{editionMode ? (
					<WorkspaceEdit title={workspaceData.title} description={workspaceData.description} onEditEnd={onEditEnd} />
				) : (
						<WorkspaceDetails title={workspaceData.title} description={workspaceData.description} />
					)}
			</button>
			{editionMode || (
				<div>
					<Button text='edit' onClick={onEdit} />
				</div>
			)}
		</div>
	);
};

export default WorkspaceCard;
