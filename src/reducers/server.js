import {
    GET_SERVER_REQUEST,
    GET_SERVER_SUCCESS,
    GET_SERVER_FAIL,
    CREATE_DATABASE_REQUEST,
    CREATE_DATABASE_SUCCESS,
    CREATE_DATABASE_FAIL,
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
        case CREATE_DATABASE_REQUEST:
            return { ...state, fetching: true }
        case CREATE_DATABASE_SUCCESS:
            return { ...state, fetching: false, items: action.payload }
        case CREATE_DATABASE_FAIL:
            return { ...state, fetching: false }
        case SET_SERVER_WINDOW_STATE:
            return { ...state, minimized: action.payload }
        default:
            return state
    }
}