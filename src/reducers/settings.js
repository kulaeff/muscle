import {
    GET_SETTINGS_REQUEST,
    GET_SETTINGS_SUCCESS,
    GET_SETTINGS_FAIL,
    SAVE_SETTINGS_REQUEST,
    SAVE_SETTINGS_SUCCESS,
    SAVE_SETTINGS_FAIL
} from '../constants/settings'

const initialState = {
    useSmartFolding: true
}

export default function settings(state = initialState, action) {
    switch(action.type) {
        case GET_SETTINGS_REQUEST:
            return { ...state }
        case GET_SETTINGS_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        case GET_SETTINGS_FAIL:
            return { ...state }
        case SAVE_SETTINGS_REQUEST:
            return { ...state }
        case SAVE_SETTINGS_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        case SAVE_SETTINGS_FAIL:
            return { ...state }
        default:
            return state
    }
}