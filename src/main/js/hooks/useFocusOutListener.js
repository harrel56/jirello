import { useEffect } from 'react';

export const useFocusOutListener = (ref, onFocusOut) => {
	const handleFocusChange = e => {
		if (ref.current && !ref.current.contains(e.target)) {
			onFocusOut();
		}
	};

	useEffect(() => {
		document.addEventListener('focus', handleFocusChange, true);
		return () => {
			document.removeEventListener('focus', handleFocusChange, true);
		};
	});
};
