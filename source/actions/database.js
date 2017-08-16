import { push } from 'react-router-redux'
import {
    CLOSE_DATABASE_WINDOW,
    MINIMIZE_DATABASE_WINDOW,
    RESTORE_DATABASE_WINDOW
} from '../constants/database'
import {
    restoreWindow as restoreServerWindow
} from '../actions/server'

/*------------------------------------------------------------------------------------*/
/* UI                                                                                 */
/*------------------------------------------------------------------------------------*/

/* Windows */

/**
 * Closes window
 */
export function closeWindow() {
    return async (dispatch) => {
        dispatch({
            type: CLOSE_DATABASE_WINDOW
        });

        dispatch(push('/server'));

        dispatch(restoreServerWindow());
    };
}

/**
 * Minimizes window
  */
export function minimizeWindow() {
    return {
        type: MINIMIZE_DATABASE_WINDOW
    }
}

/**
 * Restores window
  */
export function restoreWindow() {
    return {
        type: RESTORE_DATABASE_WINDOW
    }
}