import {
    GET_DATABASES_REQUEST,
    GET_DATABASES_SUCCESS,
    GET_DATABASES_FAIL,
    CREATE_DATABASE_REQUEST,
    CREATE_DATABASE_SUCCESS,
    CREATE_DATABASE_FAIL,
    SET_CREATE_DATABASE_MODAL_VISIBILITY,
    SET_SELECTED_DATABASE,
    SET_SERVER_WINDOW_STATE,
    UPDATE_CREATE_DATABASE_TEXTBOX_NAME_VALUE
} from '../constants/server'

const initialState = {
    createDatabaseModalVisible: false,
    createDatabaseTextboxNameValue: '',
    fetching: false,
    databases: [],
    minimized: false,
    selectedDatabase: null
};

export default function server(state = initialState, action) {
    switch(action.type) {
        case GET_DATABASES_REQUEST:
            return {
                ...state,
                fetching: true
            };
        case GET_DATABASES_SUCCESS:
            return {
                ...state,
                fetching: false,
                databases: action.payload
            };
        case GET_DATABASES_FAIL:
            return {
                ...state,
                fetching: false
            };
        case CREATE_DATABASE_REQUEST:
            return { ...state, fetching: true };
        case CREATE_DATABASE_SUCCESS:
            return { ...state, fetching: false, items: action.payload };
        case CREATE_DATABASE_FAIL:
            return { ...state, fetching: false };
        case SET_SELECTED_DATABASE:
            return {
                ...state,
                selectedDatabase: action.payload
            };
        case SET_CREATE_DATABASE_MODAL_VISIBILITY:
            return {
                ...state,
                createDatabaseModalVisible: action.payload
            };
        case SET_SERVER_WINDOW_STATE:
            return {
                ...state,
                minimized: action.payload
            };
        case UPDATE_CREATE_DATABASE_TEXTBOX_NAME_VALUE:
            return {
                ...state,
                createDatabaseTextboxNameValue: action.payload
            };
        default:
            return state
    }
}