import {
    GET_SETTINGS_REQUEST,
    GET_SETTINGS_SUCCESS,
    GET_SETTINGS_FAIL
} from '../constants/settings'

const initialState = {
    fetching: false,
    server: {
    }
}

export default function settings(state = initialState, action) {
    switch(action.type) {
        case GET_SETTINGS_REQUEST:
            return { ...state, fetching: true }
        case GET_SETTINGS_SUCCESS:
            return { ...state, fetching: false, server: action.payload.server }
        case GET_SETTINGS_FAIL:
            return { ...state, fetching: false }
        default:
            return state
    }
}