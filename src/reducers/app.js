import {
    GET_CREDENTIALS_REQUEST,
    GET_CREDENTIALS_SUCCESS,
    GET_CREDENTIALS_FAIL,
    REMOVE_CREDENTIALS_REQUEST,
    REMOVE_CREDENTIALS_SUCCESS,
    SAVE_CREDENTIALS_REQUEST,
    SAVE_CREDENTIALS_SUCCESS,
    SAVE_CREDENTIALS_FAIL
} from '../constants/app'

const initialState = {
    fetching: false,
    credentials: {
        user: null,
        password: null
    }
}

export default function app(state = initialState, action) {
    switch(action.type) {
        case GET_CREDENTIALS_REQUEST:
            return { ...state, fetching: true }
        case GET_CREDENTIALS_SUCCESS:
            return { ...state, fetching: false, credentials: action.payload }
        case GET_CREDENTIALS_FAIL:
            return { ...state, fetching: false, credentials: action.payload }
        case REMOVE_CREDENTIALS_REQUEST:
            return { ...state, fetching: true }
        case REMOVE_CREDENTIALS_SUCCESS:
            return { ...state, fetching: false, credentials: action.payload }
        case SAVE_CREDENTIALS_REQUEST:
            return { ...state, fetching: true }
        case SAVE_CREDENTIALS_SUCCESS:
            return { ...state, fetching: false, credentials: action.payload }
        case SAVE_CREDENTIALS_FAIL:
            return { ...state, fetching: false, credentials: action.payload }
        default:
            return state
    }
}