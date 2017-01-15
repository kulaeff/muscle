import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import app from './app'
import column from './column'
import columns from './columns'
import databases from './databases'
import settings from './settings'
import status from './status'
import tables from './tables'

export default combineReducers({
    routing: routerReducer,
    app,
    column,
    columns,
    databases,
    settings,
    status,
    tables
})