import {
    CLOSE_TABLE_WINDOW,
    MINIMIZE_TABLE_WINDOW,
    RESTORE_TABLE_WINDOW
} from '../constants/table'
import { push } from 'react-router-redux'

/**
 * Closes window
 */
export function closeWindow() {
    return async (dispatch) => {
        dispatch({
            type: CLOSE_TABLE_WINDOW
        });

        dispatch(push('/server'));

        //dispatch(restoreServerWindow());
    };
}

/**
 * Minimizes window
 * @function
 */
export function minimizeWindow() {
    return {
        type: MINIMIZE_TABLE_WINDOW
    }
}

/**
 * Restores window
 * @function
 */
export function restoreWindow() {
    return {
        type: RESTORE_TABLE_WINDOW
    }
}
