import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import databases from './databases'
import summary from './summary'

export default combineReducers({
    routing: routerReducer,
    databases,
    summary
})