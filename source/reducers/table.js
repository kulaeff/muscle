import {
    CLOSE_TABLE_WINDOW,
    MINIMIZE_TABLE_WINDOW,
    RESTORE_TABLE_WINDOW,
} from '../constants/table'

const initialState = {
    minimized: false,
};

export default function table(state = initialState, action) {
    switch(action.type) {
        /*case GET_COLUMNS_REQUEST:
            return { ...state, fetching: true }
        case GET_COLUMNS_SUCCESS:
            return { ...state, fetching: false, items: action.payload }
        case GET_COLUMNS_FAIL:
            return { ...state, fetching: false }
        case GET_INDEXES_REQUEST:
            return { ...state, fetching: true }
        case GET_INDEXES_SUCCESS:
            return { ...state, fetching: false, items: action.payload }
        case GET_INDEXES_FAIL:
            return { ...state, fetching: false }*/
        case CLOSE_TABLE_WINDOW:
            return { ...state };
        case MINIMIZE_TABLE_WINDOW:
            return { ...state, minimized: true };
        case RESTORE_TABLE_WINDOW:
            return { ...state, minimized: false };
        default:
            return state
    }
}