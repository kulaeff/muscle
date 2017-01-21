import {
    GET_STATUS_CONNECTIONS_REQUEST,
    GET_STATUS_CONNECTIONS_SUCCESS,
    GET_STATUS_CONNECTIONS_FAIL
} from '../../constants/status/connections'

const initialState = {
    fetching: false,
    connections: {
        upTime: 0,
        usage: 0,
        connections: 0
    }
}

export default function statusConnections(state = initialState, action) {
    switch(action.type) {
        case GET_STATUS_CONNECTIONS_REQUEST:
            return { ...state, fetching: true }
        case GET_STATUS_CONNECTIONS_SUCCESS:
            return { ...state, fetching: false, connections: action.payload.connections }
        case GET_STATUS_CONNECTIONS_FAIL:
            return { ...state, fetching: false }
        default:
            return state
    }
}