import {
    GET_DATABASE_REQUEST,
    GET_DATABASE_SUCCESS,
    GET_DATABASE_FAIL,
    SET_DATABASE_WINDOW_STATE
} from '../constants/database'

const initialState = {
    fetching: false,
    minimized: false,
    items: []
}

export default function database(state = initialState, action) {
    switch(action.type) {
        case GET_DATABASE_REQUEST:
            return { ...state, fetching: true, items: [] }
        case GET_DATABASE_SUCCESS:
            return { ...state, fetching: false, items: action.payload }
        case GET_DATABASE_FAIL:
            return { ...state, fetching: false }
        case SET_DATABASE_WINDOW_STATE:
            return { ...state, minimized: action.payload }
        default:
            return state
    }
}