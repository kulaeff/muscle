import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import app from './app'
import columns from './columns'
import database from './database'
import rows from './rows'
import server from './server'
import settings from './settings'
import statusConnections from './status/connections'
import statusSummary from './status/summary'
import statusUsage from './status/usage'
import table from './table'
import tables from './tables'

export default combineReducers({
    router: routerReducer,
    app,
    columns,
    database,
    rows,
    server,
    settings,
    statusConnections,
    statusSummary,
    statusUsage,
    table,
    tables
})