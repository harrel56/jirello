import React from 'react';
import { CSSTransition } from 'react-transition-group';
import WorkspacePicker from './WorkspacePicker';
import Spinner from 'components/generic/Spinner';
import useQuery from 'hooks/useQuery';
import { workspaceGetAll } from '../../util/queries';
import { WorkspacesProvider } from '../../context/WorkspacesContext';

const WorkspacePickerContainer = () => {
	const { loading, error, data } = useQuery(workspaceGetAll());

	if (error) {
		return <span>{JSON.stringify(data)}</span>;
	} else {
		return (
			<>
				<CSSTransition in={loading} timeout={200} classNames='fade' unmountOnExit>
					<Spinner />
				</CSSTransition>
				<CSSTransition in={!loading} timeout={200} classNames='fade' unmountOnExit>
					<WorkspacesProvider data={data}>
						<WorkspacePicker />
					</WorkspacesProvider>
				</CSSTransition>
			</>
		);
	}
};

export default WorkspacePickerContainer;
