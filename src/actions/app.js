import {
    GET_CREDENTIALS_REQUEST,
    GET_CREDENTIALS_SUCCESS,
    GET_CREDENTIALS_FAIL,
    SAVE_CREDENTIALS_REQUEST,
    SAVE_CREDENTIALS_SUCCESS,
    SAVE_CREDENTIALS_FAIL
} from '../constants/app'

/**
 * Checks credentials and save them to sessionStorage
 * @function
 * @param {string} user User name
 * @param {string} password Password
 */
export function saveCredentials(user, password) {
    return async (dispatch, getState, api) => {
        dispatch({
            type: SAVE_CREDENTIALS_REQUEST
        })

        try {
            const response = await api.checkCredentials(user, password)

            sessionStorage.setItem('user', response.data.user)
            sessionStorage.setItem('password', response.data.password)

            dispatch({
                type: SAVE_CREDENTIALS_SUCCESS,
                payload: response.data
            })
        } catch(ex) {
            dispatch({
                type: SAVE_CREDENTIALS_FAIL,
                payload: ex
            })
        }
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
        })

        const
            user = sessionStorage.getItem('user'),
            password = sessionStorage.getItem('password')

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
                payload: {
                    user,
                    password
                }
            })
        }
    }
}