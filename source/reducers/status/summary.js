import {
    GET_STATUS_SUMMARY_REQUEST,
    GET_STATUS_SUMMARY_SUCCESS,
    GET_STATUS_SUMMARY_FAIL
} from '../../constants/status/summary'

const initialState = {
    fetching: false,
    summary: {
        connections: 0,
        queries: 0,
        upTime: 0,
        usage: 0,
        user: ''
    }
}

export default function statusSummary(state = initialState, action) {
    switch(action.type) {
        case GET_STATUS_SUMMARY_REQUEST:
            return { ...state, fetching: true }
        case GET_STATUS_SUMMARY_SUCCESS:
            return { ...state, fetching: false, summary: action.payload }
        case GET_STATUS_SUMMARY_FAIL:
            return { ...state, fetching: false }
        default:
            return state
    }
}