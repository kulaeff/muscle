import {
    CLOSE_CREATE_TABLE_MODAL,
    GET_TABLES_REQUEST,
    GET_TABLES_SUCCESS,
    GET_TABLES_FAIL,
    GET_COLLATIONS_REQUEST,
    GET_COLLATIONS_SUCCESS,
    GET_COLLATIONS_FAIL,
    GET_ENGINES_REQUEST,
    GET_ENGINES_SUCCESS,
    GET_ENGINES_FAIL,
    OPEN_CREATE_TABLE_MODAL,
    SET_CURRENT_DATABASE,
    SET_TABLE_COLLATION,
    SET_TABLE_COMMENT,
    SET_TABLE_ENGINE,
    SET_TABLE_NAME
} from '../constants/tables'

const initialState = {
    collations: [],
    collationsLoading: false,
    currentDatabase: null,
    engines: [],
    enginesLoading: false,
    fetching: false,
    filter: '',
    tables: [],
    modalCreateTableVisible: false,
    saving: false,
    tableCollation: '',
    tableComment: '',
    tableEngine: '',
    tableName: ''
};

export default function tables(state = initialState, action) {
    switch(action.type) {
        case CLOSE_CREATE_TABLE_MODAL:
            return {
                ...state,
                listBoxFieldsSelectedIndex: initialState.listBoxFieldsSelectedIndex,
                modalCreateTableVisible: false,
                tableComment: initialState.tableComment,
                tableFieldCounter: initialState.tableFieldCounter,
                tableFields: initialState.tableFields,
                tableName: initialState.tableName,
                tableType: initialState.tableType
            };
        case GET_TABLES_REQUEST:
            return { ...state, fetching: true, tables: [] };
        case GET_TABLES_SUCCESS:
            return { ...state, fetching: false, tables: action.payload };
        case GET_TABLES_FAIL:
            return { ...state, fetching: false };
        case GET_COLLATIONS_REQUEST:
            return {
                ...state,
                collationsLoading: true
            };
        case GET_COLLATIONS_SUCCESS:
            return {
                ...state,
                collations: action.payload,
                collationsLoading: false
            };
        case GET_COLLATIONS_FAIL:
            return {
                ...state,
                collationsLoading: false
            };
        case GET_ENGINES_REQUEST:
            return {
                ...state,
                enginesLoading: true
            };
        case GET_ENGINES_SUCCESS:
            return {
                ...state,
                engines: action.payload,
                enginesLoading: false
            };
        case GET_ENGINES_FAIL:
            return {
                ...state,
                enginesLoading: false
            };
        case OPEN_CREATE_TABLE_MODAL:
            return {
                ...state,
                modalCreateTableVisible: true
            };
        case SET_CURRENT_DATABASE:
            return {
                ...state,
                currentDatabase: action.payload
            };
        case SET_TABLE_COLLATION:
            return {
                ...state,
                tableCollation: action.payload
            };
        case SET_TABLE_COMMENT:
            return {
                ...state,
                tableComment: action.payload
            };
        case SET_TABLE_ENGINE:
            return {
                ...state,
                tableEngine: action.payload
            };
        case SET_TABLE_NAME:
            return {
                ...state,
                tableName: action.payload
            };
        default:
            return state
    }
}