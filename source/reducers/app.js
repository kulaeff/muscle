import {
    GET_CREDENTIALS_REQUEST,
    GET_CREDENTIALS_SUCCESS,
    GET_CREDENTIALS_FAIL,
    REMOVE_CREDENTIALS_REQUEST,
    REMOVE_CREDENTIALS_SUCCESS,
    SAVE_CREDENTIALS_REQUEST,
    SAVE_CREDENTIALS_SUCCESS,
    SAVE_CREDENTIALS_FAIL,
    SET_PASSWORD,
    SET_USER
} from '../constants/app'

const initialState = {
    fetching: false,
    user: 'root',
    password: '',
    logged: false,
    saving: false
};

export default function app(state = initialState, action) {
    switch(action.type) {
        case GET_CREDENTIALS_REQUEST:
            return {
                ...state,
                fetching: true
            };
        case GET_CREDENTIALS_SUCCESS:
            return {
                ...state,
                fetching: false,
                logged: true,
                password: action.payload.password,
                user: action.payload.user
            };
        case GET_CREDENTIALS_FAIL:
            return {
                ...state,
                fetching: false,
                logged: false
            };
        case REMOVE_CREDENTIALS_REQUEST:
            return { ...state, fetching: true };
        case REMOVE_CREDENTIALS_SUCCESS:
            return { ...state, fetching: false, credentials: action.payload };
        case SAVE_CREDENTIALS_REQUEST:
            return {
                ...state,
                saving: true
            };
        case SAVE_CREDENTIALS_SUCCESS:
            return {
                ...state,
                logged: true,
                saving: false
            };
        case SAVE_CREDENTIALS_FAIL:
            return {
                ...state,
                saving: false
            };
        case SET_PASSWORD:
            return {
                ...state,
                password: action.payload
            };
        case SET_USER:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state
    }
}