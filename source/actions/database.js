import { push } from 'react-router-redux'
import {
    CLOSE_DATABASE_WINDOW,
    SET_DATABASE_WINDOW_STATE
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
        type: SET_DATABASE_WINDOW_STATE,
        payload: true
    }
}

/**
 * Restores window
  */
export function restoreWindow() {
    return {
        type: SET_DATABASE_WINDOW_STATE,
        payload: false
    }
}