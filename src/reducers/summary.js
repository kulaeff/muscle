import GET_SUMMARY from '../constants/summary'

const initialState = {
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

export default function user(state = initialState, action) {
    switch(action.type) {
        case GET_SUMMARY:
            return { ...state, summary: action.payload }
        default:
            return state
    }
}