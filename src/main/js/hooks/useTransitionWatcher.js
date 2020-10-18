import { useEffect, useRef } from 'react';

export const useTransitionWatcher = (ref) => {
	const transitionRef = useRef(false);
	const onStart = useRef();
	const onEnd = useRef();

	const transitionStart = () => {
		transitionRef.current = true;
		if (onStart.current) {
			onStart.current();
		}
	};
	const transitionEnd = () => {
		transitionRef.current = false;
		if (onEnd.current) {
			onEnd.current();
		}
	};

	useEffect(() => {
		ref.current.addEventListener('transitionrun', transitionStart);
		ref.current.addEventListener('transitioncancel', transitionEnd);
		ref.current.addEventListener('transitionend', transitionEnd);
		return () => {
			ref.current.removeEventListener('transitionrun', transitionStart);
			ref.current.removeEventListener('transitioncancel', transitionEnd);
			ref.current.removeEventListener('transitionend', transitionEnd);
		};
	}, []);

	const onTransitionStart = (handler) => {
		onStart.current = handler;
	};
	const onTransitionEnd = (handler) => {
		onEnd.current = handler;
	};
	const runAfterTransition = (handler) => {
		if (transitionRef.current) {
			onTransitionEnd(() => {
				handler();
				onTransitionEnd(null);
			});
		} else {
			handler();
		}
	};
	const runOnTransition = (handler) => {
		if (!transitionRef.current) {
			onTransitionStart(() => {
				handler();
				onTransitionStart(null);
			});
		} else {
			handler();
		}
	};
	const isInTransition = () => transitionRef.current;

	return {
		onTransitionStart: onTransitionStart,
		onTransitionEnd: onTransitionEnd,
		isInTransition: isInTransition,
		runAfterTransition: runAfterTransition,
		runOnTransition: runOnTransition
	};
};
