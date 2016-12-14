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

export default function user(state = initialState) {
    return state
}