import React, { Fragment } from 'react';
import { CSSTransition } from 'react-transition-group';
import WorkspacePicker from './WorkspacePicker';
import Spinner from 'components/generic/Spinner';
import useQuery from 'hooks/useQuery';
import { workspaceGetAll } from '../../util/queries';

const WorkspacePickerContainer = () => {
	const { loading, error, data } = useQuery(workspaceGetAll());

	if (error) {
		return <span>{JSON.stringify(data)}</span>;
	} else {
		return (
			<Fragment>
				<CSSTransition in={loading} timeout={200} classNames='fade' unmountOnExit>
					<Spinner />
				</CSSTransition>
				<CSSTransition in={!loading} timeout={200} classNames='fade' unmountOnExit>
					<WorkspacePicker workspaces={data} />
				</CSSTransition>
			</Fragment>
		);
	}
};

export default WorkspacePickerContainer;
