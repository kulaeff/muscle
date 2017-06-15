import {
    GET_TABLES_REQUEST,
    GET_TABLES_SUCCESS,
    GET_TABLES_FAIL,
    SET_CREATE_TABLE_MODAL_VISIBILITY,
    SET_TABLE_COMMENT,
    SET_TABLE_FIELDS,
    SET_TABLE_NAME
} from '../constants/tables'

const initialState = {
    fetching: false,
    filter: '',
    items: [],
    modalCreateTableVisible: false,
    saving: false,
    tableCollation: '',
    tableComment: '',
    tableFields: [],
    tableName: '',
    tableType: ''
};

export default function tables(state = initialState, action) {
    switch(action.type) {
        case GET_TABLES_REQUEST:
            return { ...state, fetching: true, items: [] };
        case GET_TABLES_SUCCESS:
            return { ...state, fetching: false, items: action.payload };
        case GET_TABLES_FAIL:
            return { ...state, fetching: false };
        case SET_CREATE_TABLE_MODAL_VISIBILITY:
            return {
                ...state,
                modalCreateTableVisible: action.payload,
                tableFields: []
            };
        case SET_TABLE_COMMENT:
            return {
                ...state,
                tableComment: action.payload
            };
        case SET_TABLE_FIELDS:
            return {
                ...state,
                tableFields: action.payload
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