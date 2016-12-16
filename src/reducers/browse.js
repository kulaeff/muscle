import {
    GET_BROWSE_REQUEST,
    GET_BROWSE_SUCCESS,
    GET_BROWSE_FAIL
} from '../constants/browse'

const initialState = {
    fetching: false,
    items: [
        {
            name: 'mysql',
            items: [
                {
                    name: 'columns_priv',
                    type: 2
                },
                {
                    name: 'engine_cost',
                    type: 2
                },
                {
                    name: 'event',
                    type: 2
                },
                {
                    name: 'func',
                    type: 2
                }
            ],
            type: 1,
        },
        {
            name: 'loko',
            items: [
                {
                    name: 'academy',
                    type: 2
                },
                {
                    name: 'common',
                    type: 2
                },
                {
                    name: 'crm',
                    type: 2
                },
                {
                    name: 'content',
                    type: 2
                }
            ],
            type: 1,
        }
    ]
}

export default function browse(state = initialState, action) {
    switch(action.type) {
        case GET_BROWSE_REQUEST:
            return { ...state, fetching: true }
        case GET_BROWSE_SUCCESS:
            return { ...state, fetching: false }
        case GET_BROWSE_FAIL:
            return { ...state, fetching: false }
        default:
            return state
    }
}