import {
    GET_STATUS_REQUEST,
    GET_STATUS_SUCCESS,
    GET_STATUS_FAIL
} from '../constants/status'

const initialState = {
    fetching: false,
    server: {
        upTime: 0,
        usage: {
            received: 0,
            sent: 0,
            total: 0,
        },
        connections: {
            aborted: 0,
            failed: 0,
            total: 0,
        }
    }
}

export default function status(state = initialState, action) {
    switch(action.type) {
        case GET_STATUS_REQUEST:
            return { ...state, fetching: true }
        case GET_STATUS_SUCCESS:
            return { ...state, fetching: false, server: action.payload.server }
        case GET_STATUS_FAIL:
            return { ...state, fetching: false }
        default:
            return state
    }
}