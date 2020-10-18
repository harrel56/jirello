import { useEffect } from 'react';

export const useFocusOutListener = (ref, onFocusOutRef) => {
	const handleFocusChange = e => {
		if (ref.current && !ref.current.contains(e.target)) {
			onFocusOutRef.current();
		}
	};

	const handleWindowBlur = () => {
		onFocusOutRef.current();
	};

	useEffect(() => {
		document.addEventListener('focus', handleFocusChange, true);
		window.addEventListener('blur', handleWindowBlur);
		return () => {
			document.removeEventListener('focus', handleFocusChange, true);
			window.removeEventListener('blur', handleWindowBlur);
		};
	}, []);
};
