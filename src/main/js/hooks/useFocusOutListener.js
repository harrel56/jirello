import { useEffect } from 'react';

export const useFocusOutListener = (ref, onFocusOut) => {
	const handleFocusChange = e => {
		if (ref.current && !ref.current.contains(e.target)) {
			onFocusOut();
		}
	};

	const handleWindowBlur = () => {
		onFocusOut();
	};

	useEffect(() => {
		document.addEventListener('focus', handleFocusChange, true);
		window.addEventListener('blur', handleWindowBlur);
		return () => {
			document.removeEventListener('focus', handleFocusChange, true);
			window.removeEventListener('blur', handleWindowBlur);
		};
	});
};
