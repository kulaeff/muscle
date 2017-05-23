import {
    GET_DATABASES_REQUEST,
    GET_DATABASES_SUCCESS,
    GET_DATABASES_FAIL,
    CREATE_DATABASE_REQUEST,
    CREATE_DATABASE_SUCCESS,
    CREATE_DATABASE_FAIL,
    DELETE_DATABASE_REQUEST,
    DELETE_DATABASE_SUCCESS,
    DELETE_DATABASE_FAIL,
    SET_CREATE_DATABASE_MODAL_VISIBILITY,
    SET_DELETE_DATABASE_MODAL_VISIBILITY,
    SET_SELECTED_DATABASE,
    SET_SERVER_WINDOW_STATE,
    UPDATE_CREATE_DATABASE_TEXTBOX_NAME_VALUE,
    UPDATE_DELETE_DATABASE_TEXTBOX_NAME_VALUE
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
 * Creates the database with specified name
 * @param {string} name Database name
 */
export function createDatabase(name) {
    return async (dispatch, getState, api) => {
        dispatch({
            type: CREATE_DATABASE_REQUEST
        });

        api.createDatabase(name)
            .then(response => {
                if (response.data.status === 'ok') {
                    dispatch({
                        type: CREATE_DATABASE_SUCCESS
                    });

                    dispatch(closeModalCreateDatabase());
                    dispatch(getDatabases());
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

        dispatch({
            type: UPDATE_CREATE_DATABASE_TEXTBOX_NAME_VALUE,
            payload: ''
        });
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

/* Textboxes */

/**
 * Updates database name textbox value
 * @param {string} name Name
 */
export function updateCreateDatabaseTextboxName(name) {
    return async (dispatch) => {
        dispatch({
            type: UPDATE_CREATE_DATABASE_TEXTBOX_NAME_VALUE,
            payload: name
        });
    };
}

/**
 * Updates database name textbox value
 * @param {string} name Name
 */
export function updateDeleteDatabaseTextboxName(name) {
    return async (dispatch) => {
        dispatch({
            type: UPDATE_DELETE_DATABASE_TEXTBOX_NAME_VALUE,
            payload: name
        });
    };
}
