import {
    savePropertiesGoodData
} from '../../dataProvider'
import {ADD_ERROR} from './errors'

const SAVE_PROPERTIES_GOOD = 'SAVE_PROPERTIES_GOOD';
const SAVE_PROPERTIES_GOOD_SUCCESS = 'SAVE_PROPERTIES_GOOD_SUCCESS';
const SAVE_PROPERTIES_GOOD_FAILURE = 'SAVE_PROPERTIES_GOOD_FAILURE';

export function savePropertiesGood(data, goodId) {
    return function (dispatch) {
        try {
            dispatch({type: SAVE_PROPERTIES_GOOD})
            return savePropertiesGoodData(data, goodId).then(res => {
                dispatch({type: SAVE_PROPERTIES_GOOD_SUCCESS, payload: res})
                return res;
            })
        } catch (error) {
            dispatch({type: SAVE_PROPERTIES_GOOD_FAILURE})
            dispatch({type: ADD_ERROR, error: error})
        }
    }
}


const initialState = {properties: []}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SAVE_PROPERTIES_GOOD_SUCCESS:
            return {...state, result: action.payload}
        default:
            return state
    }
}