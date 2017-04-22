import {
    GET_SERVER_REQUEST,
    GET_SERVER_SUCCESS,
    GET_SERVER_FAIL,
    SET_SERVER_WINDOW_STATE
} from '../constants/server'

const initialState = {
    fetching: false,
    minimized: false,
    items: []
}

export default function server(state = initialState, action) {
    switch(action.type) {
        case GET_SERVER_REQUEST:
            return { ...state, fetching: true }
        case GET_SERVER_SUCCESS:
            return { ...state, fetching: false, items: action.payload }
        case GET_SERVER_FAIL:
            return { ...state, fetching: false }
        case SET_SERVER_WINDOW_STATE:
            return { ...state, minimized: action.payload }
        default:
            return state
    }
}