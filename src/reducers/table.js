import {
    GET_COLUMNS_REQUEST,
    GET_COLUMNS_SUCCESS,
    GET_COLUMNS_FAIL,
    GET_INDEXES_REQUEST,
    GET_INDEXES_SUCCESS,
    GET_INDEXES_FAIL,
    SET_COLUMNS_WINDOW_STATE
} from '../constants/table'

const initialState = {
    fetching: false,
    minimized: false,
    items: []
}

export default function table(state = initialState, action) {
    switch(action.type) {
        case GET_COLUMNS_REQUEST:
            return { ...state, fetching: true }
        case GET_COLUMNS_SUCCESS:
            return { ...state, fetching: false, items: action.payload.items }
        case GET_COLUMNS_FAIL:
            return { ...state, fetching: false }
        case GET_INDEXES_REQUEST:
            return { ...state, fetching: true }
        case GET_INDEXES_SUCCESS:
            return { ...state, fetching: false, items: action.payload.items }
        case GET_INDEXES_FAIL:
            return { ...state, fetching: false }
        case SET_COLUMNS_WINDOW_STATE:
            return { ...state, minimized: action.payload }
        default:
            return state
    }
}