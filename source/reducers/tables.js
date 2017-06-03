import {
    GET_TABLES_REQUEST,
    GET_TABLES_SUCCESS,
    GET_TABLES_FAIL
} from '../constants/tables'

const initialState = {
    fetching: false,
    filter: '',
    items: []
};

export default function tables(state = initialState, action) {
    switch(action.type) {
        case GET_TABLES_REQUEST:
            return { ...state, fetching: true, items: [] };
        case GET_TABLES_SUCCESS:
            return { ...state, fetching: false, items: action.payload };
        case GET_TABLES_FAIL:
            return { ...state, fetching: false };
        default:
            return state
    }
}