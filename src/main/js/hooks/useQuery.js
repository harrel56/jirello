/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { gqlFetch } from '../util/queries';

const useQuery = gqlQuery => {
	const [state, setState] = useState({ loading: true, error: false, data: null });

	useEffect(() => {
		const onSuccess = res => {
			setState({ loading: false, error: false, data: res[gqlQuery.operationName] });
		};

		const onError = e => {
			setState({ loading: false, error: true, data: e });
		};
		gqlFetch(gqlQuery)
			.then(onSuccess)
			.catch(onError);
	}, []);

	return state;
};

export default useQuery;
