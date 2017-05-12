import {
    saveAttributesCategoryData,
    getCategoryByIdData,
    getAttributesData
} from '../../../dataProvider'
import {ADD_ERROR} from '../errors'

const SAVE_ATTRIBUTES_CATEGORY = 'SAVE_ATTRIBUTES_CATEGORY';
const SAVE_ATTRIBUTES_CATEGORY_SUCCESS = 'SAVE_ATTRIBUTES_CATEGORY_SUCCESS';
const SAVE_ATTRIBUTES_CATEGORY_FAILURE = 'SAVE_ATTRIBUTES_CATEGORY_FAILURE';

const GET_CATEGORY_AND_ATTRIBUTES = 'GET_CATEGORY_AND_ATTRIBUTES';
const GET_CATEGORY_AND_ATTRIBUTES_SUCCESS = 'GET_CATEGORY_AND_ATTRIBUTES_SUCCESS';
const GET_CATEGORY_AND_ATTRIBUTES_FAILURE = 'GET_CATEGORY_AND_ATTRIBUTES_FAILURE';

export function saveAttributesCategory(data, categoryId) {
    return function (dispatch) {
        try {
            dispatch({type: SAVE_ATTRIBUTES_CATEGORY})
            return saveAttributesCategoryData(data, categoryId).then(res => {
                dispatch({type: SAVE_ATTRIBUTES_CATEGORY_SUCCESS, payload: res})
                return res;
            })
        } catch (error) {
            dispatch({type: SAVE_ATTRIBUTES_CATEGORY_FAILURE})
            dispatch({type: ADD_ERROR, error: error})
        }
    }
}

export function getCategoryByIdAndAttributes(id) {
    return function (dispatch) {
        try {
            dispatch({type: GET_CATEGORY_AND_ATTRIBUTES})
            getCategoryByIdData(id).then(resCategory => {
                getAttributesData().then(resAttributes => {
                    dispatch({
                        type: GET_CATEGORY_AND_ATTRIBUTES_SUCCESS,
                        payload: {category: resCategory, attributes: resAttributes}
                    })
                })
            }).catch((error) => {
                dispatch({type: GET_CATEGORY_AND_ATTRIBUTES_FAILURE})
                dispatch({type: ADD_ERROR, error: error})
            })
        } catch (error) {
            dispatch({type: GET_CATEGORY_AND_ATTRIBUTES_FAILURE})
            dispatch({type: ADD_ERROR, error: error})
        }
    }
}

const initialState = {attributes: [], category: null}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SAVE_ATTRIBUTES_CATEGORY_SUCCESS:
            return {...state, result: action.payload}
        case GET_CATEGORY_AND_ATTRIBUTES_SUCCESS:
            return {...state, attributes: action.payload.attributes, category: action.payload.category}
        default:
            return state
    }
}