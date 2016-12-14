import {
    GET_SUMMARY_REQUEST,
    GET_SUMMARY_SUCCESS,
    //GET_SUMMARY_FAIL
} from '../constants/summary'

export function getSummary() {
    return async (dispatch) => {
        dispatch({
            type: GET_SUMMARY_REQUEST
        })

        const a = 1000

        setTimeout(() => {
            dispatch({
                type: GET_SUMMARY_SUCCESS,
                payload: {}
            })
        }, a)
        /*try {
            const response = await api.getSummary()

            dispatch({
                type: GET_SUMMARY_SUCCESS,
                payload: response
            })
        } catch(ex) {
            dispatch({
                type: GET_SUMMARY_FAIL,
                payload: ex
            })
        }*/
    }
}