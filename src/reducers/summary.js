import { GET_SUMMARY_REQUEST } from '../constants/summary'

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
        default:
            return state
    }
}