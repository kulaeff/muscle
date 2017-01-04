import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import column from './column'
import columns from './columns'
import databases from './databases'
import status from './status'
import tables from './tables'

export default combineReducers({
    routing: routerReducer,
    column,
    columns,
    databases,
    status,
    tables
})