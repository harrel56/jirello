import React, { useState, createContext } from 'react';

export const WorkspacesContext = createContext();

export const WorkspacesProvider = ({ children, data }) => {
    const [workspaces, setWorkspaces] = useState(data);

    const getWorkspaces = () => {
        return workspaces;
    }
    const addWorkspace = (workspace) => {
        setWorkspaces([...workspaces, workspace]);
    }
    const ctx = {
        getWorkspaces: getWorkspaces,
        addWorkspace: addWorkspace,
        setWorkspaces: setWorkspaces
    };

    return (
        <WorkspacesContext.Provider value={ctx}>
            {children}
        </WorkspacesContext.Provider>
    )
}