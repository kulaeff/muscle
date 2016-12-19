import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import browse from './browse'
import status from './status'

export default combineReducers({
    routing: routerReducer,
    browse,
    status
})