const API_URL = 'http://localhost:8080/api/graphql';

export const gqlFetch = gqlQuery => {
	const handleBody = res => {
		if (!res.ok) {
			throw res.status;
		}
		return res.json();
	};

	const params = {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(gqlQuery)
	};
	return fetch(API_URL, params).then(handleBody);
};

export const workspaceGetAll = () => {
	const name = 'workspaceGetAll';
	const query = `
	{
		${name} {
			id
			title
			description
		}
	}`;
	return {
		query: query,
		operationName: name,
		variables: {}
	};
};

export const workspaceUpdate = ({ id, ...workspace }) => {
	const name = 'workspaceUpdate';
	const paramName = 'workspaceJson';
	const query = `
	mutation($${paramName}: WorkspaceInput!) {
		${name}(id: "${id}", workspace: $${paramName}) {
			title
			description
		}
	}`;
	return {
		query: query,
		operationName: name,
		variables: { [`${paramName}`]: workspace }
	};
};

export const workspaceCreate = (workspace) => {
	const name = 'workspaceCreate';
	const paramName = 'workspaceJson';
	const query = `
	mutation($${paramName}: WorkspaceInput!) {
		${name}(workspace: $${paramName}) {
			title
			description
		}
	}`;
	return {
		query: query,
		operationName: name,
		variables: { [`${paramName}`]: workspace }
	};
};
