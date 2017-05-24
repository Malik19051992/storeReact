import {
    getGoodByIdData,
    getGoodsData,
    addGoodData,
    getGoodsCategoryData,
    updateGoodData,
    deleteGoodData
} from '../../dataProvider'
import {ADD_ERROR} from './errors'

const ADD_GOOD = 'ADD_GOOD';
const ADD_GOOD_SUCCESS = 'ADD_GOOD_SUCCESS';
const ADD_GOOD_FAILURE = 'ADD_GOOD_FAILURE';

const GET_GOOD = 'GET_GOOD';
const GET_GOOD_SUCCESS = 'GET_GOOD_SUCCESS';
const GET_GOOD_FAILURE = 'GET_GOOD_FAILURE';

const GET_GOODS = 'GET_GOODS';
const GET_GOODS_SUCCESS = 'GET_GOODS_SUCCESS';
const GET_GOODS_FAILURE = 'GET_GOODS_FAILURE';

const GET_GOODS_CATEGORY = 'GET_GOODS_CATEGORY';
const GET_GOODS_CATEGORY_SUCCESS = 'GET_GOODS_CATEGORY_SUCCESS';
const GET_GOODS_CATEGORY_FAILURE = 'GET_GOODS_CATEGORY_FAILURE';

const UPDATE_GOOD = 'UPDATE_GOOD';
const UPDATE_GOOD_SUCCESS = 'UPDATE_GOOD_SUCCESS';
const UPDATE_GOOD_FAILURE = 'UPDATE_GOOD_FAILURE';

const DELETE_GOOD = 'DELETE_GOOD';
const DELETE_GOOD_SUCCESS = 'DELETE_GOOD_SUCCESS';
const DELETE_GOOD_FAILURE = 'DELETE_GOOD_FAILURE';



export function addGood(good) {
    return function (dispatch) {
        try {
            dispatch({type: ADD_GOOD})
            return addGoodData(good).then(res => {
                dispatch({type: ADD_GOOD_SUCCESS, payload: res})
                return res;
            })
        } catch (error) {
            dispatch({type: ADD_GOOD_FAILURE})
            dispatch({type: ADD_ERROR, error: error})
        }
    }
}


export function updateGood(good) {
    return function (dispatch) {
        try {
            dispatch({type: UPDATE_GOOD})
            return updateGoodData(good).then(res => {
                dispatch({type:UPDATE_GOOD_SUCCESS, payload: res})
                return res;
            })
        } catch (error) {
            dispatch({type: UPDATE_GOOD_FAILURE})
            dispatch({type: ADD_ERROR, error: error})
        }
    }
}

export function deleteGood(id) {
    return function (dispatch) {
        try {
            dispatch({type: DELETE_GOOD})
            return deleteGoodData(id).then(res => {
                dispatch({type: DELETE_GOOD_SUCCESS, payload: res})
                return res;
            })
        } catch (error) {
            dispatch({type: DELETE_GOOD_FAILURE})
            dispatch({type: ADD_ERROR, error: error})
        }
    }
}

export function getGoodById(id) {
    return function (dispatch) {
        try {
            dispatch({type: GET_GOOD})
            return getGoodByIdData(id).then(res => {
                dispatch({type: GET_GOOD_SUCCESS, payload: res})
            }).catch((error) => {
                dispatch({type: GET_GOOD_FAILURE})
                dispatch({type: ADD_ERROR, error: error})
            })
        } catch (error) {
            dispatch({type: GET_GOOD_FAILURE})
            dispatch({type: ADD_ERROR, error: error})
        }
    }
}

export function getGoods() {
    return function (dispatch) {
        try {
            dispatch({type: GET_GOODS})
            return getGoodsData().then(res => {
                dispatch({type: GET_GOODS_SUCCESS, payload: res})
            }).catch((error) => {
                dispatch({type: GET_GOODS_FAILURE})
                dispatch({type: ADD_ERROR, error: error})
            })
        }
        catch (error) {
            dispatch({type: GET_GOODS_FAILURE})
            dispatch({type: ADD_ERROR, error: error})
        }
    }
}

export function getGoodsCategory(id) {
    return function (dispatch) {
        try {
            dispatch({type: GET_GOODS_CATEGORY})
            return getGoodsCategoryData(id).then(res => {
                dispatch({type: GET_GOODS_CATEGORY_SUCCESS, payload: res})
            }).catch((error) => {
                dispatch({type: GET_GOODS_CATEGORY_FAILURE})
                dispatch({type: ADD_ERROR, error: error})
            })
        }
        catch (error) {
            dispatch({type: GET_GOODS_CATEGORY_FAILURE})
            dispatch({type: ADD_ERROR, error: error})
        }
    }
}

const initialState = {goods: []}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_GOODS_SUCCESS:
            return {...state, goods: action.payload}
        case GET_GOODS_CATEGORY_SUCCESS:
            return {...state, goods: action.payload}
        case GET_GOOD_SUCCESS:
            return {...state, good: action.payload}
        case ADD_GOOD_SUCCESS:
            return {...state, ok: action.payload}
        case DELETE_GOOD_SUCCESS:
            return {...state, ok: action.payload}
        case UPDATE_GOOD_SUCCESS:
            return {...state, ok: action.payload}
        default:
            return state
    }
}
