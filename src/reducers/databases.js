import {
    GET_DATABASES_REQUEST,
    GET_DATABASES_SUCCESS,
    GET_DATABASES_FAIL,
    SET_DATABASES_FILTER_REQUEST,
    SET_DATABASES_FILTER_SUCCESS,
    SET_DATABASES_FILTER_FAIL,
    SET_DATABASES_WINDOW_STATE
} from '../constants/databases'

const initialState = {
    fetching: false,
    minimized: false,
    items: []
}

export default function databases(state = initialState, action) {
    switch(action.type) {
        case GET_DATABASES_REQUEST:
            return { ...state, fetching: true }
        case GET_DATABASES_SUCCESS:
            return { ...state, fetching: false, items: action.payload.items }
        case GET_DATABASES_FAIL:
            return { ...state, fetching: false }
        case SET_DATABASES_FILTER_REQUEST:
            return { ...state, fetching: true }
        case SET_DATABASES_FILTER_SUCCESS:
            return { ...state, fetching: false }
        case SET_DATABASES_FILTER_FAIL:
            return { ...state, fetching: false }
        case SET_DATABASES_WINDOW_STATE:
            return { ...state, minimized: action.payload }
        default:
            return state
    }
}