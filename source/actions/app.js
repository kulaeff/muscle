import {
    GET_CREDENTIALS_REQUEST,
    GET_CREDENTIALS_SUCCESS,
    GET_CREDENTIALS_FAIL,
    REMOVE_CREDENTIALS_REQUEST,
    REMOVE_CREDENTIALS_SUCCESS,
    SAVE_CREDENTIALS_REQUEST,
    SAVE_CREDENTIALS_SUCCESS,
    SAVE_CREDENTIALS_FAIL,
    SET_PASSWORD,
    SET_USER
} from '../constants/app'
import { push } from 'react-router-redux'

/**
 * Remove credentials from sessionStorage (logout)
 * @function
 */
export function removeCredentials() {
    return async (dispatch) => {
        dispatch({
            type: REMOVE_CREDENTIALS_REQUEST
        });

        sessionStorage.removeItem('user');
        sessionStorage.removeItem('password');

        dispatch({
            type: REMOVE_CREDENTIALS_SUCCESS
        })
    }
}

/**
 * Validates credentials and save them to session storage if the validation was successful
 * @function
  */
export function saveCredentials() {
    return async (dispatch, getState, api) => {
        dispatch({
            type: SAVE_CREDENTIALS_REQUEST
        });

        const
            state = getState(),
            user = state.app.user,
            password = state.app.password;

        await api.checkCredentials(user, password)
            .then(response => {
                if (response.data.status === 'ok') {
                    sessionStorage.setItem('user', state.app.user);
                    sessionStorage.setItem('password', state.app.password);

                    api.axios.defaults.auth = {
                        username: user,
                        password
                    };

                    dispatch({
                        type: SAVE_CREDENTIALS_SUCCESS,
                    });

                    dispatch(push('/server'));
                } else {
                    dispatch({
                        type: SAVE_CREDENTIALS_FAIL,
                        payload: response.data.status
                    })
                }
            })
            .catch(ex => {
                dispatch({
                    type: SAVE_CREDENTIALS_FAIL,
                    payload: ex
                })
            });
    }
}

/**
 * Gets credentials from sessionStorage
 * @function
 */
export function getCredentials() {
    return async (dispatch) => {
        dispatch({
            type: GET_CREDENTIALS_REQUEST
        });

        const
            user = sessionStorage.getItem('user'),
            password = sessionStorage.getItem('password');

        if (user !== null && password !== null) {
            dispatch({
                type: GET_CREDENTIALS_SUCCESS,
                payload: {
                    user,
                    password
                }
            })
        } else {
            dispatch({
                type: GET_CREDENTIALS_FAIL,
            })
        }
    }
}

/**
 * Stores user name
 * @param {string} user A user
 * @returns {object}
 */
export function setUser(user) {
    return {
        type: SET_USER,
        payload: user
    };
}

/**
 * Stores user name
 * @see saveCredentials
 * @param {string} password A password
 * @returns {object}
 */
export function setPassword(password) {
    return {
        type: SET_PASSWORD,
        payload: password
    };
}