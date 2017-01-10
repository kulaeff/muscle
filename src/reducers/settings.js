import {
    GET_SETTINGS_REQUEST,
    GET_SETTINGS_SUCCESS,
    GET_SETTINGS_FAIL
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
                useSmartFolding: action.payload.useSmartFolding
            }
        case GET_SETTINGS_FAIL:
            return { ...state }
        default:
            return state
    }
}