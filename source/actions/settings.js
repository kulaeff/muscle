import {
    GET_SETTINGS_REQUEST,
    GET_SETTINGS_SUCCESS,
    GET_SETTINGS_FAIL,
    SAVE_SETTINGS_REQUEST,
    SAVE_SETTINGS_SUCCESS,
    SAVE_SETTINGS_FAIL
} from '../constants/settings'

export function getSettings() {
    return async (dispatch) => {
        dispatch({
            type: GET_SETTINGS_REQUEST
        })

        try {
            const settings = {
                useSmartFolding: JSON.parse(localStorage.getItem('useSmartFolding'))
            }

            dispatch({
                type: GET_SETTINGS_SUCCESS,
                payload: settings
            })
        } catch(ex) {
            dispatch({
                type: GET_SETTINGS_FAIL,
                payload: ex
            })
        }
    }
}

export function saveSettings(item, value) {
    return async (dispatch, getState) => {
        dispatch({
            type: SAVE_SETTINGS_REQUEST
        })

        try {
            const state = getState().settings

            state.useSmartFolding = value

            localStorage.setItem(item, value)

            dispatch({
                type: SAVE_SETTINGS_SUCCESS,
                payload: state
            })
        } catch(ex) {
            dispatch({
                type: SAVE_SETTINGS_FAIL,
                payload: ex
            })
        }
    }
}