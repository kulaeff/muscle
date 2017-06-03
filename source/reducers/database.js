import {
    CLOSE_DATABASE_WINDOW,
    SET_DATABASE_WINDOW_STATE
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
        case SET_DATABASE_WINDOW_STATE:
            return {
                ...state,
                minimized: action.payload
            };
        default:
            return state
    }
}