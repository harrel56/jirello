import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8080/api/graphql';

const useQuery = gqlQuery => {
	const [state, setState] = useState({ loading: true, error: false, data: null });

	const handleBody = res => {
		if (!res.ok) {
			throw res.status;
		}
		return res.json();
	};

	useEffect(() => {
		const fetchData = async () => {
			const params = {
				method: 'POST',
				body: gqlQuery.query
			};
			const result = await fetch(API_URL, params)
				.then(handleBody)
				.then(res => ({ loading: false, error: false, data: res[gqlQuery.queryName] }))
				.catch(e => ({ loading: false, error: true, data: e }));

			setState(result);
		};
		fetchData();
	}, [gqlQuery.query, gqlQuery.queryName]);

	return state;
};

export default useQuery;

export const workspaceGetAll = () => {
	const name = 'workspaceGetAll';
	return {
		query: `{
		${name} {
			id
			title
			description
		}
	}`,
		queryName: name
	};
};
