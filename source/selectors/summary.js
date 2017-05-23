import { createSelector } from 'reselect'

const
    receivedSelector = state => state.server.usage.received,
    sentSelector = state => state.server.usage.sent,

    totalUsageSelector = createSelector(
        [receivedSelector, sentSelector],
        (received, sent) => ({
            total: {
                unit: '',
                value: received.value + sent.value
            }
        })
    )

export {
    totalUsageSelector
}