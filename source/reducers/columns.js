import {
    GET_COLUMNS_REQUEST,
    GET_COLUMNS_SUCCESS,
    GET_COLUMNS_FAIL
} from '../constants/columns'

const initialState = {
    columns: [],
    fetching: false,
    filter: '',
    saving: false
};

export default function columns(state = initialState, action) {
    switch(action.type) {
        case GET_COLUMNS_REQUEST:
            return { ...state, fetching: true };
        case GET_COLUMNS_SUCCESS:
            return { ...state, fetching: false, columns: action.payload };
        case GET_COLUMNS_FAIL:
            return { ...state, fetching: false };
        default:
            return state
    }
}