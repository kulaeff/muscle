import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import databases from './databases'
import status from './status'
import tables from './tables'

export default combineReducers({
    routing: routerReducer,
    databases,
    status,
    tables
})