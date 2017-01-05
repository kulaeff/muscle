import {
    GET_COLUMNS_REQUEST,
    GET_COLUMNS_SUCCESS,
    GET_COLUMNS_FAIL,
    SET_COLUMNS_WINDOW_STATE
} from '../constants/columns'

const initialState = {
    fetching: false,
    minimized: false,
    items: []
}

export default function columns(state = initialState, action) {
    switch(action.type) {
        case GET_COLUMNS_REQUEST:
            return { ...state, fetching: true }
        case GET_COLUMNS_SUCCESS:
            return { ...state, fetching: false, items: action.payload.items }
        case GET_COLUMNS_FAIL:
            return { ...state, fetching: false }
        case SET_COLUMNS_WINDOW_STATE:
            return { ...state, minimized: action.payload }
        default:
            return state
    }
}