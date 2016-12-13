import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import browse from './browse'
import summary from './summary'

export default combineReducers({
    routing: routerReducer,
    browse,
    summary
})