import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import app from './app'
import column from './column'
import table from './table'
import server from './server'
import settings from './settings'
import statusConnections from './status/connections'
import statusSummary from './status/summary'
import statusUsage from './status/usage'
import database from './database'

export default combineReducers({
    router: routerReducer,
    app,
    column,
    table,
    server,
    settings,
    statusConnections,
    statusSummary,
    statusUsage,
    database
})