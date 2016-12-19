import {
    GET_STATUS_REQUEST,
    GET_STATUS_SUCCESS,
    GET_STATUS_FAIL
} from '../constants/status'

const initialState = {
    fetching: false,
    server: {
        upTime: 6781324365,
        usage: {
            received: 245,
            sent: 139,
            total: 416,
        },
        connections: {
            aborted: 1,
            failed: 24,
            total: 573,
        }
    }
}

export default function status(state = initialState, action) {
    switch(action.type) {
        case GET_STATUS_REQUEST:
            return { ...state, fetching: true }
        case GET_STATUS_SUCCESS:
            return { ...state, fetching: false }
        case GET_STATUS_FAIL:
            return { ...state, fetching: false }
        default:
            return state
    }
}