import {
    CLOSE_DATABASE_WINDOW,
    MINIMIZE_DATABASE_WINDOW,
    RESTORE_DATABASE_WINDOW
} from '../constants/database'

const initialState = {
    minimized: false
};

export default function database(state = initialState, action) {
    switch(action.type) {
        case CLOSE_DATABASE_WINDOW:
            return {
                ...state
            };
        case MINIMIZE_DATABASE_WINDOW:
            return {
                ...state,
                minimized: true
            };
        case RESTORE_DATABASE_WINDOW:
            return {
                ...state,
                minimized: false
            };
        default:
            return state
    }
}