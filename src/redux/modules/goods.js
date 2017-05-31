import {
    getGoodByIdData,
    getGoodsData,
    addGoodData,
    getGoodsCategoryData,
    updateGoodData,
    deleteGoodData,
    getGoodsForPageData,
    getGoodsCategoryForPageData
} from '../../dataProvider'
import {ADD_ERROR} from './errors'

const CHANGE_PAGE = 'CHANGE_PAGE';

const ADD_GOOD = 'ADD_GOOD';
const ADD_GOOD_SUCCESS = 'ADD_GOOD_SUCCESS';
const ADD_GOOD_FAILURE = 'ADD_GOOD_FAILURE';

const GET_GOOD = 'GET_GOOD';
const GET_GOOD_SUCCESS = 'GET_GOOD_SUCCESS';
const GET_GOOD_FAILURE = 'GET_GOOD_FAILURE';

const GET_GOODS_FOR_PAGE = 'GET_GOODS_FOR_PAGE';
const GET_GOODS_FOR_PAGE_SUCCESS = 'GET_GOODS_FOR_PAGE_SUCCESS';
const GET_GOODS_FOR_PAGE_FAILURE = 'GET_GOODS_FOR_PAGE_FAILURE';

//не используется
const GET_GOODS = 'GET_GOODS';
const GET_GOODS_SUCCESS = 'GET_GOODS_SUCCESS';
const GET_GOODS_FAILURE = 'GET_GOODS_FAILURE';

//не используется
const GET_GOODS_CATEGORY = 'GET_GOODS_CATEGORY';
const GET_GOODS_CATEGORY_SUCCESS = 'GET_GOODS_CATEGORY_SUCCESS';
const GET_GOODS_CATEGORY_FAILURE = 'GET_GOODS_CATEGORY_FAILURE';

const GET_GOODS_CATEGORY_FOR_PAGE = 'GET_GOODS_CATEGORY_FOR_PAGE';
const GET_GOODS_CATEGORY_FOR_PAGE_SUCCESS = 'GET_GOODS_CATEGORY_FOR_PAGE_SUCCESS';
const GET_GOODS_CATEGORY_FOR_PAGE_FAILURE = 'GET_GOODS_CATEGORY_FOR_PAGE_FAILURE';

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
                dispatch({type: ADD_GOOD_SUCCESS})
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
                dispatch({type: UPDATE_GOOD_SUCCESS})
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
                dispatch({type: DELETE_GOOD_SUCCESS})
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

//не используется
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

export function getGoodsForPage(pageSize, pageNumber) {
    return findByFilterValue(null, pageSize, pageNumber, '')
}

//не используется
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

export function getGoodsCategoryForPage(id, pageSize, pageNumber) {
    return findByFilterValue(id, pageSize, pageNumber, '')
}

export function changePage(id, pageSize, pageNumber, filterValue) {
    return function (dispatch) {
        dispatch({type: CHANGE_PAGE, payload: pageNumber});
        findByFilterValue(id, pageSize, pageNumber, filterValue)(dispatch);
    }
}

export function findByFilterValue(categoryId, pageSize, pageNumber, filterValue) {
    return function (dispatch) {
        try {
            if (!categoryId) {
                dispatch({type: GET_GOODS_FOR_PAGE})
                return getGoodsForPageData(pageSize, pageNumber, filterValue).then(res => {
                    dispatch({type: GET_GOODS_FOR_PAGE_SUCCESS, payload: res})
                }).catch((error) => {
                    dispatch({type: GET_GOODS_FOR_PAGE_FAILURE})
                    dispatch({type: ADD_ERROR, error: error})
                })
            } else {
                dispatch({type: GET_GOODS_CATEGORY_FOR_PAGE})
                return getGoodsCategoryForPageData(categoryId, pageSize, pageNumber, filterValue).then(res => {
                    dispatch({type: GET_GOODS_CATEGORY_FOR_PAGE_SUCCESS, payload: res})
                }).catch((error) => {
                    dispatch({type: GET_GOODS_CATEGORY_FOR_PAGE_FAILURE})
                    dispatch({type: ADD_ERROR, error: error})
                })
            }
        }
        catch (error) {
            dispatch({type: ADD_ERROR, error: error})

        }
    }
}

export function setNumberPage(pageNumber) {
    return function (dispatch) {
        dispatch({type: CHANGE_PAGE, payload: pageNumber});
    }
}

const initialState = {pageSize: 20, pageNumber: 1, countGoods: 0, goods: []}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_GOODS_SUCCESS:
            return {...state, countGoods: action.payload.length, goods: action.payload}
        case GET_GOODS_FOR_PAGE_SUCCESS:
            return {...state, countGoods: action.payload.count, goods: action.payload.goods}
        case GET_GOODS_CATEGORY_SUCCESS:
            return {...state, countGoods: action.payload.length, goods: action.payload}
        case GET_GOODS_CATEGORY_FOR_PAGE_SUCCESS:
            return {...state, countGoods: action.payload.count, goods: action.payload.goods}
        case GET_GOOD_SUCCESS:
            return {...state, good: action.payload}
        case CHANGE_PAGE:
            return {...state, pageNumber: action.payload}

        default:
            return state
    }
}
