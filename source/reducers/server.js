import {
    GET_DATABASES_REQUEST,
    GET_DATABASES_SUCCESS,
    GET_DATABASES_FAIL,
    GET_DATABASE_REQUEST,
    GET_DATABASE_SUCCESS,
    GET_DATABASE_FAIL,
    CREATE_DATABASE_REQUEST,
    CREATE_DATABASE_SUCCESS,
    CREATE_DATABASE_FAIL,
    DELETE_DATABASE_REQUEST,
    DELETE_DATABASE_SUCCESS,
    DELETE_DATABASE_FAIL,
    UPDATE_DATABASE_REQUEST,
    UPDATE_DATABASE_SUCCESS,
    UPDATE_DATABASE_FAIL,
    SET_CREATE_DATABASE_MODAL_VISIBILITY,
    SET_DELETE_DATABASE_MODAL_VISIBILITY,
    SET_EDIT_DATABASE_MODAL_VISIBILITY,
    SET_SELECTED_DATABASE,
    SET_SERVER_WINDOW_STATE,
    UPDATE_DATABASE_NAME,
    UPDATE_FILTER
} from '../constants/server'

const initialState = {
    fetching: false,
    databases: [],
    minimized: false,
    modalTextboxDatabaseNameValue: '',
    modalCreateDatabaseVisible: false,
    modalDeleteDatabaseVisible: false,
    modalEditDatabaseVisible: false,
    saving: false,
    selectedDatabase: null,
    textboxFilterValue: ''
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
        case GET_DATABASE_REQUEST:
            return { ...state, saving: true };
        case GET_DATABASE_SUCCESS:
            return {
                ...state,
                modalTextboxDatabaseNameValue: action.payload,
                saving: false
            };
        case GET_DATABASE_FAIL:
            return { ...state, saving: false };
        case UPDATE_DATABASE_REQUEST:
            return { ...state, saving: true };
        case UPDATE_DATABASE_SUCCESS:
            return { ...state, saving: false };
        case UPDATE_DATABASE_FAIL:
            return { ...state, saving: false };
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
        case SET_EDIT_DATABASE_MODAL_VISIBILITY:
            return {
                ...state,
                modalEditDatabaseVisible: action.payload
            };
        case SET_SERVER_WINDOW_STATE:
            return {
                ...state,
                minimized: action.payload
            };
        case UPDATE_DATABASE_NAME:
            return {
                ...state,
                modalTextboxDatabaseNameValue: action.payload
            };
        case UPDATE_FILTER:
            return {
                ...state,
                textboxFilterValue: action.payload
            };
        default:
            return state
    }
}