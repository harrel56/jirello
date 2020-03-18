import { useEffect } from 'react';

export const useClickAwayListener = (ref, onClickAway) => {
	const handleClick = e => {
		if (ref.current && !ref.current.contains(e.target)) {
			onClickAway();
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClick);
		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	});
};
