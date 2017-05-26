import {
    GET_DATABASE_TABLES_REQUEST,
    GET_DATABASE_TABLES_SUCCESS,
    GET_DATABASE_TABLES_FAIL,
    CLOSE_DATABASE_WINDOW,
    SET_DATABASE_WINDOW_STATE
} from '../constants/database'

const initialState = {
    fetching: false,
    minimized: false,
    items: []
};

export default function database(state = initialState, action) {
    switch(action.type) {
        case GET_DATABASE_TABLES_REQUEST:
            return { ...state, fetching: true, items: [] };
        case GET_DATABASE_TABLES_SUCCESS:
            return { ...state, fetching: false, items: action.payload };
        case GET_DATABASE_TABLES_FAIL:
            return { ...state, fetching: false };
        case CLOSE_DATABASE_WINDOW:
            return {
                ...state
            };
        case SET_DATABASE_WINDOW_STATE:
            return {
                ...state,
                minimized: action.payload
            };
        default:
            return state
    }
}