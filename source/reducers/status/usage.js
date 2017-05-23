import {
    GET_STATUS_USAGE_REQUEST,
    GET_STATUS_USAGE_SUCCESS,
    GET_STATUS_USAGE_FAIL
} from '../../constants/status/usage'

const initialState = {
    fetching: false,
    usage: {
        upTime: 0,
        usage: 0,
        connections: 0
    }
}

export default function statusUsage(state = initialState, action) {
    switch(action.type) {
        case GET_STATUS_USAGE_REQUEST:
            return { ...state, fetching: true }
        case GET_STATUS_USAGE_SUCCESS:
            return { ...state, fetching: false, usage: action.payload.usage }
        case GET_STATUS_USAGE_FAIL:
            return { ...state, fetching: false }
        default:
            return state
    }
}