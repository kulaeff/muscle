import {
    ADD_TABLE_FIELD,
    CLOSE_CREATE_TABLE_MODAL,
    GET_TABLES_REQUEST,
    GET_TABLES_SUCCESS,
    GET_TABLES_FAIL,
    GET_COLLATIONS_REQUEST,
    GET_COLLATIONS_SUCCESS,
    GET_COLLATIONS_FAIL,
    OPEN_CREATE_TABLE_MODAL,
    REMOVE_TABLE_FIELD,
    SET_LISTBOX_FIELDS_SELECTED_INDEX,
    SET_TABLE_COLLATION,
    SET_TABLE_COMMENT,
    SET_TABLE_NAME
} from '../constants/tables'

const initialState = {
    collations: [],
    collationsLoading: false,
    fetching: false,
    filter: '',
    items: [],
    listBoxFieldsSelectedIndex: -1,
    modalCreateTableVisible: false,
    saving: false,
    tableCollation: '',
    tableComment: '',
    tableFieldCounter: 1,
    tableFields: [],
    tableName: '',
    tableType: ''
};

export default function tables(state = initialState, action) {
    switch(action.type) {
        case ADD_TABLE_FIELD:
            return {
                ...state,
                tableFieldCounter: state.tableFieldCounter + 1,
                tableFields: action.payload
            };
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
            return { ...state, fetching: true, items: [] };
        case GET_TABLES_SUCCESS:
            return { ...state, fetching: false, items: action.payload };
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
        case OPEN_CREATE_TABLE_MODAL:
            return {
                ...state,
                modalCreateTableVisible: true
            };
        case REMOVE_TABLE_FIELD:
            return {
                ...state,
                tableFields: action.payload
            };
        case SET_LISTBOX_FIELDS_SELECTED_INDEX:
            return {
                ...state,
                listBoxFieldsSelectedIndex: action.payload
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
        case SET_TABLE_NAME:
            return {
                ...state,
                tableName: action.payload
            };
        default:
            return state
    }
}