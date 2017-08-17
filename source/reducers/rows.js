import {
    GET_ROWS_REQUEST,
    GET_ROWS_SUCCESS,
    GET_ROWS_FAIL
} from '../constants/rows'

const initialState = {
    rows: [],
    fetching: false,
    filter: '',
    saving: false
};

export default function rows(state = initialState, action) {
    switch(action.type) {
        case GET_ROWS_REQUEST:
            return { ...state, fetching: true };
        case GET_ROWS_SUCCESS:
            return { ...state, fetching: false, rows: action.payload };
        case GET_ROWS_FAIL:
            return { ...state, fetching: false };
        default:
            return state
    }
}