import React, { useState, createContext, useRef, useContext } from 'react';
import classNames from 'classnames';
import { FiCheckCircle } from 'react-icons/fi';
import { CSSTransition } from 'react-transition-group';

const BASE_CLASS = 'snackbar';
const SnackbarContext = createContext();

export const styles = {
	SUCCESS: 'success',
	ERROR: 'error',
};

export const useSnackbar = () => {
	const open = useContext(SnackbarContext);
	return (msg, style) => {
		open(msg, style);
	};
};

export const SnackbarProvider = ({ children }) => {
	const [opened, setOpened] = useState(false);
	const [message, setMessage] = useState('');
	const [style, setStyle] = useState(null);
	const closeTimeout = useRef();

	const elementClass = classNames(BASE_CLASS, {
		[`${BASE_CLASS}--${styles.SUCCESS}`]: style === styles.SUCCESS,
		[`${BASE_CLASS}--${styles.ERROR}`]: style === styles.ERROR,
	});

	const openSnackbar = (msg, style) => {
		if (msg) {
			clearTimeout(closeTimeout.current);
			setMessage(msg);
			setOpened(true);
			setStyle(style);
			closeTimeout.current = setTimeout(() => setOpened(false), 6000);
		}
	};

	const onClick = () => {
		if (opened) {
			setOpened(false);
		}
	};

	return (
		<SnackbarContext.Provider value={openSnackbar}>
			{children}
			<CSSTransition in={opened} timeout={200} classNames="fade" unmountOnExit>
				<Snackbar className={elementClass} msg={message} onClick={onClick} />
			</CSSTransition>
		</SnackbarContext.Provider>
	);
};

const Snackbar = ({ className, msg, onClick }) => {
	return (
		<div className={className} onClick={onClick}>
			<FiCheckCircle size="1.5em" />
			<span>{msg}</span>
		</div>
	);
};
