import {
    GET_DATABASES_REQUEST,
    GET_DATABASES_SUCCESS,
    GET_DATABASES_FAIL,
    CREATE_DATABASE_REQUEST,
    CREATE_DATABASE_SUCCESS,
    CREATE_DATABASE_FAIL,
    DELETE_DATABASE_REQUEST,
    DELETE_DATABASE_SUCCESS,
    DELETE_DATABASE_FAIL,
    SET_CREATE_DATABASE_MODAL_VISIBILITY,
    SET_DELETE_DATABASE_MODAL_VISIBILITY,
    SET_SELECTED_DATABASE,
    SET_SERVER_WINDOW_STATE,
    UPDATE_CREATE_DATABASE_TEXTBOX_NAME_VALUE,
    UPDATE_DELETE_DATABASE_TEXTBOX_NAME_VALUE
} from '../constants/server'

const initialState = {
    fetching: false,
    databases: [],
    minimized: false,
    modalCreateDatabaseTextboxNameValue: '',
    modalDeleteDatabaseTextboxNameValue: '',
    modalCreateDatabaseVisible: false,
    modalDeleteDatabaseVisible: false,
    saving: false,
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
            return { ...state, saving: true };
        case CREATE_DATABASE_SUCCESS:
            return { ...state, saving: false };
        case CREATE_DATABASE_FAIL:
            return { ...state, saving: false };
        case DELETE_DATABASE_REQUEST:
            return { ...state, saving: true };
        case DELETE_DATABASE_SUCCESS:
            return { ...state, saving: false };
        case DELETE_DATABASE_FAIL:
            return { ...state, saving: false };
        case SET_SELECTED_DATABASE:
            return {
                ...state,
                selectedDatabase: action.payload
            };
        case SET_CREATE_DATABASE_MODAL_VISIBILITY:
            return {
                ...state,
                modalCreateDatabaseVisible: action.payload
            };
        case SET_DELETE_DATABASE_MODAL_VISIBILITY:
            return {
                ...state,
                modalDeleteDatabaseVisible: action.payload
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
        case UPDATE_DELETE_DATABASE_TEXTBOX_NAME_VALUE:
            return {
                ...state,
                createDatabaseTextboxNameValue: action.payload
            };
        default:
            return state
    }
}