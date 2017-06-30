import {
    CLOSE_CREATE_DATABASE_MODAL,
    CLOSE_DELETE_DATABASE_MODAL,
    CLOSE_EDIT_DATABASE_MODAL,
    CREATE_DATABASE_REQUEST,
    CREATE_DATABASE_SUCCESS,
    CREATE_DATABASE_FAIL,
    DELETE_DATABASE_REQUEST,
    DELETE_DATABASE_SUCCESS,
    DELETE_DATABASE_FAIL,
    GET_DATABASES_REQUEST,
    GET_DATABASES_SUCCESS,
    GET_DATABASES_FAIL,
    GET_DATABASE_REQUEST,
    GET_DATABASE_SUCCESS,
    GET_DATABASE_FAIL,
    OPEN_CREATE_DATABASE_MODAL,
    OPEN_DELETE_DATABASE_MODAL,
    OPEN_EDIT_DATABASE_MODAL,
    SET_DATABASE_NAME,
    SET_DATABASE_OLD_NAME,
    SET_FILTER,
    SET_SERVER_WINDOW_STATE,
    UPDATE_DATABASE_REQUEST,
    UPDATE_DATABASE_SUCCESS,
    UPDATE_DATABASE_FAIL,
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
    databaseName: '',
    databaseName_: '',
    filter: ''
};

export default function server(state = initialState, action) {
    switch(action.type) {
        case CLOSE_CREATE_DATABASE_MODAL:
            return {
                ...state,
                modalCreateDatabaseVisible: false,
                databaseName: '',
                databaseName_: ''
            };
        case CLOSE_DELETE_DATABASE_MODAL:
            return {
                ...state,
                modalDeleteDatabaseVisible: false,
                databaseName: ''
            };
        case CLOSE_EDIT_DATABASE_MODAL:
            return {
                ...state,
                modalEditDatabaseVisible: false,
                databaseName: '',
                databaseName_: ''
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
        case OPEN_CREATE_DATABASE_MODAL:
            return {
                ...state,
                modalCreateDatabaseVisible: true
            };
        case OPEN_DELETE_DATABASE_MODAL:
            return {
                ...state,
                modalDeleteDatabaseVisible: true
            };
        case OPEN_EDIT_DATABASE_MODAL:
            return {
                ...state,
                modalEditDatabaseVisible: true
            };
        case SET_DATABASE_NAME:
            return {
                ...state,
                databaseName: action.payload
            };
        case SET_DATABASE_OLD_NAME:
            return {
                ...state,
                databaseName_: action.payload
            };
        case SET_SERVER_WINDOW_STATE:
            return {
                ...state,
                minimized: action.payload
            };
        case SET_FILTER:
            return {
                ...state,
                filter: action.payload
            };
        case UPDATE_DATABASE_REQUEST:
            return { ...state, saving: true };
        case UPDATE_DATABASE_SUCCESS:
            return { ...state, saving: false };
        case UPDATE_DATABASE_FAIL:
            return { ...state, saving: false };
        default:
            return state
    }
}