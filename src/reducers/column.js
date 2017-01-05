import {
    GET_COLUMN_REQUEST,
    GET_COLUMN_SUCCESS,
    GET_COLUMN_FAIL
} from '../constants/column'

const initialState = {
    fetching: false,
    fields: {}
}

export default function column(state = initialState, action) {
    switch(action.type) {
        case GET_COLUMN_REQUEST:
            return { ...state, fetching: true }
        case GET_COLUMN_SUCCESS:
            return { ...state, fetching: false, fields: action.payload }
        case GET_COLUMN_FAIL:
            return { ...state, fetching: false }
        default:
            return state
    }
}