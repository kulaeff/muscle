import { push, replace } from 'react-router-redux'
import {
    CLOSE_CREATE_DATABASE_MODAL,
    CLOSE_DELETE_DATABASE_MODAL,
    CLOSE_EDIT_DATABASE_MODAL,
    CREATE_DATABASE_REQUEST,
    CREATE_DATABASE_SUCCESS,
    CREATE_DATABASE_FAIL,
    DELETE_DATABASE_REQUEST,
    DELETE_DATABASE_SUCCESS,
    DELETE_DATABASE_FAIL,
    GET_DATABASES_REQUEST,
    GET_DATABASES_SUCCESS,
    GET_DATABASES_FAIL,
    GET_DATABASE_REQUEST,
    GET_DATABASE_SUCCESS,
    GET_DATABASE_FAIL,
    OPEN_CREATE_DATABASE_MODAL,
    OPEN_DELETE_DATABASE_MODAL,
    OPEN_EDIT_DATABASE_MODAL,
    SET_DATABASE_NAME,
    SET_DATABASE_OLD_NAME,
    SET_FILTER,
    SET_SERVER_WINDOW_STATE,
    UPDATE_DATABASE_REQUEST,
    UPDATE_DATABASE_SUCCESS,
    UPDATE_DATABASE_FAIL,
} from '../constants/server'

/*------------------------------------------------------------------------------------*/
/* DATA                                                                               */
/*------------------------------------------------------------------------------------*/

/**
 * Fetches the list of databases
 * @param {string} token Filter
 * @returns {function}
 */
export function getDatabases(token = '') {
    return async (dispatch, getState, api) => {
        dispatch({
            type: GET_DATABASES_REQUEST
        });

        try {
            const response = await api.getDatabases(token);

            dispatch({
                type: GET_DATABASES_SUCCESS,
                payload: response.data
            });
        } catch(ex) {
            dispatch({
                type: GET_DATABASES_FAIL,
                payload: ex
            });
        }
    }
}

/**
 * Fetches details for a database with specified name
 * @returns {function}
 */
export function getDatabase() {
    return async (dispatch, getState, api) => {
        dispatch({
            type: GET_DATABASE_REQUEST
        });

        const name = getState().server.databaseName;

        api.getDatabase(name)
            .then(response => {
                dispatch({
                    type: GET_DATABASE_SUCCESS,
                    payload: response.data[0]
                });
            })
            .catch(error => {
                dispatch({
                    type: GET_DATABASE_FAIL,
                    payload: error
                });
            });
    }
}

/**
 * Creates the database with specified name
 */
export function createDatabase() {
    return async (dispatch, getState, api) => {
        dispatch({
            type: CREATE_DATABASE_REQUEST
        });

        const name = getState().server.databaseName;

        api.createDatabase(name)
            .then(response => {
                if (response.data.status === 'ok') {
                    dispatch({
                        type: CREATE_DATABASE_SUCCESS
                    });

                    dispatch(closeCreateDatabaseModal());
                    dispatch(getDatabases());
                    dispatch(push(`/server/${name}`));
                } else {
                    dispatch({
                        type: CREATE_DATABASE_FAIL
                    });

                    dispatch(closeCreateDatabaseModal());
                }
            })
            .catch(error => {
                dispatch({
                    type: CREATE_DATABASE_FAIL,
                    payload: error
                });
            });
    }
}

/**
 * Deletes selected database
 */
export function deleteDatabase() {
    return async (dispatch, getState, api) => {
        dispatch({
            type: DELETE_DATABASE_REQUEST
        });

        const
            state = getState(),
            name = state.server.databaseName,
            currentIndex = state.server.databases.findIndex(database => database === name),
            nextIndex = currentIndex === state.server.databases.length - 1 ? currentIndex - 1 : currentIndex + 1;

        api.deleteDatabase(name)
            .then(response => {
                if (response.data.status === 'ok') {
                    dispatch({
                        type: DELETE_DATABASE_SUCCESS
                    });

                    dispatch(closeDeleteDatabaseModal());
                    dispatch(getDatabases());
                    dispatch(replace(`/server/${state.server.databases[nextIndex]}`));
                }
            })
            .catch(error => {
                dispatch({
                    type: DELETE_DATABASE_FAIL,
                    payload: error
                });
            });
    }
}

/**
 * Updates (renames) selected database
 */
export function updateDatabase() {
    return async (dispatch, getState, api) => {
        dispatch({
            type: UPDATE_DATABASE_REQUEST
        });

        const
            state = getState(),
            newName = state.server.databaseName,
            oldName = state.server.databaseName_;

        api.updateDatabase(oldName, newName)
            .then(response => {
                if (response.data.status === 'ok') {
                    dispatch({
                        type: UPDATE_DATABASE_SUCCESS
                    });

                    dispatch(closeEditDatabaseModal());
                    dispatch(getDatabases());
                    dispatch(replace(`/server/${newName}/tables`));
                }
            })
            .catch(error => {
                dispatch({
                    type: UPDATE_DATABASE_FAIL,
                    payload: error
                });
            });
    }
}

/*------------------------------------------------------------------------------------*/
/* UI                                                                                 */
/*------------------------------------------------------------------------------------*/

/* Windows */

/**
 * Minimizes window
 */
export function initWindow() {
    return async (dispatch) => {
        const minimized = JSON.parse(sessionStorage.getItem('windowServerMinimized'));

        if (minimized) {
            dispatch({
                type: SET_SERVER_WINDOW_STATE,
                payload: minimized
            });
        }
    };
}

/**
 * Minimizes window
 */
export function minimizeWindow() {
    return async (dispatch) => {
        sessionStorage.setItem('windowServerMinimized', JSON.stringify(true));

        dispatch({
            type: SET_SERVER_WINDOW_STATE,
            payload: true
        });
    };
}

/**
 * Restores window
 */
export function restoreWindow() {
    return async (dispatch) => {
        sessionStorage.setItem('windowServerMinimized', JSON.stringify(false));

        dispatch({
            type: SET_SERVER_WINDOW_STATE,
            payload: false
        });
    };
}

/* Modals */

/**
 * Closes Create Database modal
 */
export function closeCreateDatabaseModal() {
    return {
        type: CLOSE_CREATE_DATABASE_MODAL
    };
}

/**
 * Closes Delete Database modal
 */
export function closeDeleteDatabaseModal() {
    return {
        type: CLOSE_DELETE_DATABASE_MODAL
    };
}

/**
 * Closes Delete Database modal
 */
export function closeEditDatabaseModal() {
    return {
        type: CLOSE_EDIT_DATABASE_MODAL
    };
}

/**
 * Shows Create Database modal
 */
export function openCreateDatabaseModal() {
    return {
        type: OPEN_CREATE_DATABASE_MODAL
    };
}

/**
 * Shows Delete Database modal
 */
export function openDeleteDatabaseModal() {
    return {
        type: OPEN_DELETE_DATABASE_MODAL
    };
}

/**
 * Shows Edit Database modal
 */
export function openEditDatabaseModal() {
    return async (dispatch, getState) => {
        dispatch({
            type: OPEN_EDIT_DATABASE_MODAL
        });

        dispatch({
            type: SET_DATABASE_OLD_NAME,
            payload: getState().server.databaseName
        });

        dispatch(getDatabase());
    };
}

/* Textboxes */

/**
 * Stores current filter
 * @param {string} token Token
 */
export function setFilter(token) {
    return {
        type: SET_FILTER,
        payload: token
    }
}

/* Internals */

/**
 * Stores current database name
 * @param {string} name Name
 */
export function setDatabaseName(name) {
    return {
        type: SET_DATABASE_NAME,
        payload: name
    }
}