import {
    GET_TABLES_REQUEST,
    GET_TABLES_SUCCESS,
    GET_TABLES_FAIL,
    SET_TABLES_FILTER_REQUEST,
    SET_TABLES_FILTER_SUCCESS,
    SET_TABLES_FILTER_FAIL
} from '../constants/tables'

const initialState = {
    fetching: false,
    items: []
}

export default function tables(state = initialState, action) {
    switch(action.type) {
        case GET_TABLES_REQUEST:
            return { ...state, fetching: true }
        case GET_TABLES_SUCCESS:
            return { ...state, fetching: false, items: action.payload.items }
        case GET_TABLES_FAIL:
            return { ...state, fetching: false }
        case SET_TABLES_FILTER_REQUEST:
            return { ...state, fetching: true }
        case SET_TABLES_FILTER_SUCCESS:
            return { ...state, fetching: false }
        case SET_TABLES_FILTER_FAIL:
            return { ...state, fetching: false }
        default:
            return state
    }
}