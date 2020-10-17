import { useContext } from 'react';
import { SnackbarContext, styles } from '../components/generic/SnackbarProvider';

export const useSnackbarSuccess = () => {
    const open = useContext(SnackbarContext);
    return (msg) => {
        open(msg, styles.SUCCESS);
    };
}

export const useSnackbarError = () => {
    const open = useContext(SnackbarContext);
    return (msg) => {
        open(msg, styles.ERROR);
    };
}
