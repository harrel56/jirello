/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { gqlFetch } from '../util/queries';

const useLazyQuery = () => {
	const doFetch = gqlQuery => {
		const onSuccess = res => {
			setState({
				loading: false,
				error: false,
				data: res[gqlQuery.operationName],
				executionCallback: executionCallback
			});
		};

		const onError = e => {
			setState({ loading: false, error: true, data: e, executionCallback: executionCallback });
		};
		gqlFetch(gqlQuery)
			.then(onSuccess)
			.catch(onError);
	};

	const executionCallback = gqlQuery => {
		doFetch(gqlQuery);
		setState({
			loading: true,
			error: false,
			data: null,
			executionCallback: executionCallback
		});
	};

	const [state, setState] = useState({
		loading: false,
		error: false,
		data: null,
		executionCallback: executionCallback
	});

	return state;
};

export default useLazyQuery;
