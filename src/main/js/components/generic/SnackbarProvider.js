import React, { useState, createContext, useRef } from 'react';
import classNames from 'classnames';

const BASE_CLASS = 'snackbar';

export const styles = {
    SUCCESS: 'success',
    ERROR: 'error'
}
export const SnackbarContext = createContext();

const SnackbarProvider = ({ children }) => {
    const [opened, setOpened] = useState(false);
    const [message, setMessage] = useState('');
    const [style, setStyle] = useState(null);
    const closeTimeout = useRef();

    const elementClass = classNames(BASE_CLASS, {
        [`${BASE_CLASS}--${styles.SUCCESS}`]: style === styles.SUCCESS,
        [`${BASE_CLASS}--${styles.ERROR}`]: style === styles.ERROR
    });

    const openSnackbar = (msg, style) => {
        if (msg) {
            clearTimeout(closeTimeout.current);
            setMessage(msg);
            setOpened(true);
            setStyle(style);
            closeTimeout.current = setTimeout(() => setOpened(false), 10000);
        }
    }

    return <SnackbarContext.Provider value={openSnackbar}><>{children}</>
        {opened && <div className={elementClass}><span>{message}</span></div>}</SnackbarContext.Provider>;
}

export default SnackbarProvider;