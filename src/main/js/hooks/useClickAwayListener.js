import { useEffect } from 'react';

export const useClickAwayListener = (ref, onClickAwayRef) => {
	const handleClick = e => {
		if (ref.current && !ref.current.contains(e.target)) {
			onClickAwayRef.current();
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClick);
		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, []);
};
