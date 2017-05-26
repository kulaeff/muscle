import {
    GET_DATABASES_REQUEST,
    GET_DATABASES_SUCCESS,
    GET_DATABASES_FAIL,
    GET_DATABASE_REQUEST,
    GET_DATABASE_SUCCESS,
    GET_DATABASE_FAIL,
    CREATE_DATABASE_REQUEST,
    CREATE_DATABASE_SUCCESS,
    CREATE_DATABASE_FAIL,
    DELETE_DATABASE_REQUEST,
    DELETE_DATABASE_SUCCESS,
    DELETE_DATABASE_FAIL,
    UPDATE_DATABASE_REQUEST,
    UPDATE_DATABASE_SUCCESS,
    UPDATE_DATABASE_FAIL,
    SET_CREATE_DATABASE_MODAL_VISIBILITY,
    SET_DELETE_DATABASE_MODAL_VISIBILITY,
    SET_EDIT_DATABASE_MODAL_VISIBILITY,
    SET_SELECTED_DATABASE,
    SET_SERVER_WINDOW_STATE,
    UPDATE_DATABASE_NAME
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

        const
            state = getState(),
            index = state.server.selectedDatabase,
            name = state.server.databases[index];

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

        const name = getState().server.modalTextboxDatabaseNameValue;

        api.createDatabase(name)
            .then(response => {
                if (response.data.status === 'ok') {
                    dispatch({
                        type: CREATE_DATABASE_SUCCESS
                    });

                    dispatch(closeModalCreateDatabase());
                    dispatch(getDatabases());
                } else {
                    dispatch({
                        type: CREATE_DATABASE_FAIL
                    });

                    dispatch(closeModalCreateDatabase());
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
            index = state.server.selectedDatabase,
            name = state.server.databases[index];

        api.deleteDatabase(name)
            .then(response => {
                console.log(response);
                if (response.data.status === 'ok') {
                    dispatch({
                        type: DELETE_DATABASE_SUCCESS
                    });

                    dispatch(closeModalDeleteDatabase());
                    dispatch(getDatabases());
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
 * Updates selected database
 */
export function updateDatabase() {
    return async (dispatch, getState, api) => {
        dispatch({
            type: UPDATE_DATABASE_REQUEST
        });

        const
            state = getState(),
            index = state.server.selectedDatabase,
            name = state.server.databases[index];

        api.updateDatabase(name, state.server.modalTextboxDatabaseNameValue)
            .then(response => {
                if (response.data.status === 'ok') {
                    dispatch({
                        type: UPDATE_DATABASE_SUCCESS
                    });

                    dispatch(closeModalEditDatabase());
                    dispatch(getDatabases());
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

/**
 * Selects the database with specified index
 * @param {number} index Index
 */
export function selectDatabase(index) {
    return async (dispatch) => {
        dispatch({
            type: SET_SELECTED_DATABASE,
            payload: index
        });

        if (JSON.parse(localStorage.getItem('useSmartFolding'))) {
            sessionStorage.setItem('windowServerMinimized', JSON.stringify(true));

            dispatch({
                type: SET_SERVER_WINDOW_STATE,
                payload: true
            });
        }
    };
}

/* Modals */

/**
 * Closes Create Database modal
 */
export function closeModalCreateDatabase() {
    return async (dispatch) => {
        dispatch({
            type: SET_CREATE_DATABASE_MODAL_VISIBILITY,
            payload: false
        });

        dispatch(updateDatabaseName(''));
    };
}

/**
 * Closes Delete Database modal
 */
export function closeModalDeleteDatabase() {
    return async (dispatch) => {
        dispatch({
            type: SET_DELETE_DATABASE_MODAL_VISIBILITY,
            payload: false
        });
    };
}

/**
 * Closes Delete Database modal
 */
export function closeModalEditDatabase() {
    return async (dispatch) => {
        dispatch({
            type: SET_EDIT_DATABASE_MODAL_VISIBILITY,
            payload: false
        });

        dispatch(updateDatabaseName(''));
    };
}

/**
 * Shows Create Database modal
 */
export function showModalCreateDatabase() {
    return async (dispatch) => {
        dispatch({
            type: SET_CREATE_DATABASE_MODAL_VISIBILITY,
            payload: true
        });
    };
}

/**
 * Shows Delete Database modal
 */
export function showModalDeleteDatabase() {
    return async (dispatch) => {
        dispatch({
            type: SET_DELETE_DATABASE_MODAL_VISIBILITY,
            payload: true
        });
    };
}

/**
 * Shows Edit Database modal
 */
export function showModalEditDatabase() {
    return async (dispatch) => {
        dispatch({
            type: SET_EDIT_DATABASE_MODAL_VISIBILITY,
            payload: true
        });

        dispatch(getDatabase());
    };
}

/* Textboxes */

/**
 * Updates database name
 * @param {string} name Name
 */
export function updateDatabaseName(name) {
    return async (dispatch) => {
        dispatch({
            type: UPDATE_DATABASE_NAME,
            payload: name
        });
    };
}