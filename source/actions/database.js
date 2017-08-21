import {
    MINIMIZE_DATABASE_WINDOW,
    RESTORE_DATABASE_WINDOW
} from '../constants/database'

/*------------------------------------------------------------------------------------*/
/* UI                                                                                 */
/*------------------------------------------------------------------------------------*/

/* Windows */

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