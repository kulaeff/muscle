import {
    GET_SUMMARY_REQUEST,
    GET_SUMMARY_SUCCESS,
    GET_SUMMARY_FAIL
} from '../constants/summary'

const initialState = {
    fetching: false,
    server: {
        usage: {
            received: {
                unit: 'Kb',
                value: 245,
            },
            sent: {
                unit: 'Kb',
                value: 139,
            },
            total: {
                unit: 'Kb',
                value: 384,
            },
        },
        connections: {
            aborted: 1,
            failed: 24,
            total: 573,
        }
    }
}

export default function summary(state = initialState, action) {
    switch(action.type) {
        case GET_SUMMARY_REQUEST:
            return { ...state, fetching: true }
        case GET_SUMMARY_SUCCESS:
            return { ...state, fetching: false }
        case GET_SUMMARY_FAIL:
            return { ...state, fetching: false }
        default:
            return state
    }
}