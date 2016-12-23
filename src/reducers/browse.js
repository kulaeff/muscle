import {
    GET_BROWSE_REQUEST,
    GET_BROWSE_SUCCESS,
    GET_BROWSE_FAIL,
    SET_FILTER_REQUEST,
    SET_FILTER_SUCCESS,
    SET_FILTER_FAIL
} from '../constants/browse'

const initialState = {
    fetching: false,
    items: []
}

export default function browse(state = initialState, action) {
    switch(action.type) {
        case GET_BROWSE_REQUEST:
            return { ...state, fetching: true }
        case GET_BROWSE_SUCCESS:
            return { ...state, fetching: false, items: action.payload.items }
        case GET_BROWSE_FAIL:
            return { ...state, fetching: false }
        case SET_FILTER_REQUEST:
            return { ...state, fetching: true }
        case SET_FILTER_SUCCESS:
            return { ...state, fetching: false }
        case SET_FILTER_FAIL:
            return { ...state, fetching: false }
        default:
            return state
    }
}