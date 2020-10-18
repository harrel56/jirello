/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect, useContext } from 'react';
import Button from 'components/generic/Button';
import WorkspaceEdit from './WorkspaceEdit';
import WorkspaceDetails from './WorkspaceDetails';
import classNames from 'classnames';
import useLazyQuery from '../../hooks/useLazyQuery';
import { workspaceUpdate, workspaceCreate } from '../../util/queries';
import { useSnackbar, styles } from '../generic/Snackbar';
import { WorkspacesContext } from '../../context/WorkspacesContext';
import { useTransitionWatcher } from '../../hooks/useTransitionWatcher';

const BASE_CLASS = 'workspace-card';

const WorkspaceCard = (props) => {
	const isNewEntry = props.editionMode;
	const [workspaceData, setWorkspaceData] = useState(props.data ? props.data : { title: '', description: '' });
	const [editionMode, setEditionMode] = useState(isNewEntry);

	const { executionCallback: callQuery, error, data } = useLazyQuery();
	const openSnackbar = useSnackbar();
	const { addWorkspace } = useContext(WorkspacesContext);
	const elementRef = useRef();
	const imageRef = useRef();
	const { runAfterTransition, runOnTransition } = useTransitionWatcher(imageRef);

	useEffect(() => {
		if (data) {
			openSnackbar(data.title, styles.SUCCESS);
			setWorkspaceData(data);
			runAfterTransition(() => {
				addWorkspace(data);
				props.onEditSuccess();
			});
		}
	}, [data]);

	useEffect(() => {
		if (error) {
			openSnackbar(workspaceData.title, styles.ERROR);
		}
	}, [error]);

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
			const newWorkspace = {
				...workspaceData,
				title: title,
				description: description
			};
			runOnTransition(() => {
				if (!workspaceData.id) {
					setWorkspaceData(newWorkspace);
					callQuery(workspaceCreate(newWorkspace));
				} else if (JSON.stringify(workspaceData) !== JSON.stringify(newWorkspace)) {
					setWorkspaceData(newWorkspace);
					callQuery(workspaceUpdate(newWorkspace));
				}
			});
			setEditionMode(false);
		}
	};

	return (
		<div ref={elementRef} className={elementClass}>
			<button className={`${BASE_CLASS}__button`}>
				<img ref={imageRef} className={`${BASE_CLASS}__img`} src="jpg/splash.jpg" alt="Workspace image" height="150" />
				{editionMode ? (
					<WorkspaceEdit title={workspaceData.title} description={workspaceData.description} onEditEnd={onEditEnd} />
				) : (
					<WorkspaceDetails title={workspaceData.title} description={workspaceData.description} />
				)}
			</button>
			{editionMode || (
				<div>
					<Button text="edit" onClick={onEdit} />
				</div>
			)}
		</div>
	);
};

export default WorkspaceCard;
