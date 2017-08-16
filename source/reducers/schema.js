import {
    GET_COLUMNS_REQUEST,
    GET_COLUMNS_SUCCESS,
    GET_COLUMNS_FAIL,
    GET_INDEXES_REQUEST,
    GET_INDEXES_SUCCESS,
    GET_INDEXES_FAIL
} from '../constants/schema'

const initialState = {
    minimized: false,
};

export default function schema(state = initialState, action) {
    switch(action.type) {
        case GET_COLUMNS_REQUEST:
            return { ...state, fetching: true };
        case GET_COLUMNS_SUCCESS:
            return { ...state, fetching: false, items: action.payload };
        case GET_COLUMNS_FAIL:
            return { ...state, fetching: false };
        case GET_INDEXES_REQUEST:
            return { ...state, fetching: true };
        case GET_INDEXES_SUCCESS:
            return { ...state, fetching: false, items: action.payload };
        case GET_INDEXES_FAIL:
            return { ...state, fetching: false };
        default:
            return state
    }
}