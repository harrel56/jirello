import React from 'react';
import WorkspacePicker from './WorkspacePicker';
import useQuery, { workspaceGetAll } from 'hooks/useQuery';
import Spinner from 'components/generic/Spinner';

const WorkspacePickerContainer = () => {
	const { loading, error, data } = useQuery(workspaceGetAll());

	if (loading) {
		return <Spinner />;
	} else if (error) {
		return <span>{JSON.stringify(data)}</span>;
	} else {
		return <WorkspacePicker workspaces={data} />;
	}
};

export default WorkspacePickerContainer;
