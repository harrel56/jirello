import React from 'react';
import WorkspacePickerContainer from 'components/workspace/WorkspacePickerContainer';
import { SnackbarProvider } from './components/generic/Snackbar';

const App = () => {
	return <SnackbarProvider><WorkspacePickerContainer /></SnackbarProvider>;
};

export default App;
