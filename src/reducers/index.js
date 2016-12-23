import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import databases from './databases'
import status from './status'

export default combineReducers({
    routing: routerReducer,
    databases,
    status
})