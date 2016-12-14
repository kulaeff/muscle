import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'

export default function configureStore(api) {
    const store = createStore(
        rootReducer, applyMiddleware(thunk.withExtraArgument(api))
    )

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers')

            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}