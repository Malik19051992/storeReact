import {
    getAvailabilityGoodsData,
    addTurnoverGoodsData,
    findTurnoverGoodsData,
    getTurnoverGoodByIdData,
    updateTurnoverGoodsData,
    deleteTurnoverGoodData

} from '../../dataProvider'
import {ADD_ERROR} from './errors'

const ADD_TURNOVER_GOOD = 'ADD_TURNOVER_GOOD';
const ADD_TURNOVER_GOOD_SUCCESS = 'ADD_TURNOVER_GOOD_SUCCESS';
const ADD_TURNOVER_GOOD_FAILURE = 'ADD_TURNOVER_GOOD_FAILURE';

const UPDATE_TURNOVER_GOOD = 'UPDATE_TURNOVER_GOOD';
const UPDATE_TURNOVER_GOOD_SUCCESS = 'UPDATE_TURNOVER_GOOD_SUCCESS';
const UPDATE_TURNOVER_GOOD_FAILURE = 'UPDATE_TURNOVER_GOOD_FAILURE';

const DELETE_TURNOVER_GOOD = 'DELETE_TURNOVER_GOOD';
const DELETE_TURNOVER_GOOD_SUCCESS = 'DELETE_TURNOVER_GOOD_SUCCESS';
const DELETE_TURNOVER_GOOD_FAILURE = 'DELETE_TURNOVER_GOOD_FAILURE';

const GET_AVAILABILITY_GOODS = 'GET_AVAILABILITY_GOODS';
const GET_AVAILABILITY_GOODS_SUCCESS = 'GET_AVAILABILITY_GOODS_SUCCESS';
const GET_AVAILABILITY_GOODS_FAILURE = 'GET_AVAILABILITY_GOODS_FAILURE';

const GET_TURNOVER_GOOD_BY_ID = 'GET_TURNOVER_GOOD_BY_ID';
const GET_TURNOVER_GOOD_BY_ID_SUCCESS = 'GET_TURNOVER_GOOD_BY_ID_SUCCESS';
const GET_TURNOVER_GOOD_BY_ID_FAILURE = 'GET_TURNOVER_GOOD_BY_ID_FAILURE';

const FIND_TURNOVER_GOODS = 'FIND_TURNOVER_GOODS';
const FIND_TURNOVER_GOODS_SUCCESS = 'FIND_TURNOVER_GOODS_SUCCESS';
const FIND_TURNOVER_GOODS_FAILURE = 'FIND_TURNOVER_GOODS_FAILURE';

export function addTurnoverGoods(turnoverGoods) {
    return function (dispatch) {
        try {
            dispatch({type: ADD_TURNOVER_GOOD})
            return addTurnoverGoodsData(turnoverGoods).then(res => {
                dispatch({type: ADD_TURNOVER_GOOD_SUCCESS, payload: res})
                return res;
            })
        } catch (error) {
            dispatch({type: ADD_TURNOVER_GOOD_FAILURE})
            dispatch({type: ADD_ERROR, error: error})
        }
    }
}

export function updateTurnoverGoods(turnoverGoods) {
    return function (dispatch) {
        try {
            dispatch({type: UPDATE_TURNOVER_GOOD})
            return updateTurnoverGoodsData(turnoverGoods).then(res => {
                dispatch({type: UPDATE_TURNOVER_GOOD_SUCCESS, payload: res})
                return res;
            })
        } catch (error) {
            dispatch({type: UPDATE_TURNOVER_GOOD_FAILURE})
            dispatch({type: ADD_ERROR, error: error})
        }
    }
}

export function deleteTurnoverGood(id) {
    return function (dispatch) {
        try {
            dispatch({type: DELETE_TURNOVER_GOOD})
            return deleteTurnoverGoodData(id).then(res => {
                dispatch({type: DELETE_TURNOVER_GOOD_SUCCESS, payload: res})
                return res;
            })
        } catch (error) {
            dispatch({type: DELETE_TURNOVER_GOOD_FAILURE})
            dispatch({type: ADD_ERROR, error: error})
        }
    }
}

export function findTurnoverGoods(searchData) {
    return function (dispatch) {
        try {
            dispatch({type: FIND_TURNOVER_GOODS})
            return findTurnoverGoodsData(searchData).then(res => {
                dispatch({type: FIND_TURNOVER_GOODS_SUCCESS, payload: res})
                return res;
            })
        } catch (error) {
            dispatch({type: FIND_TURNOVER_GOODS_FAILURE})
            dispatch({type: ADD_ERROR, error: error})
        }
    }
}

export function getTurnoverGoodById(id) {
    return function (dispatch) {
        try {
            dispatch({type: GET_TURNOVER_GOOD_BY_ID})
            return getTurnoverGoodByIdData(id).then(res => {
                dispatch({type: GET_TURNOVER_GOOD_BY_ID_SUCCESS, payload: res})
            }).catch((error) => {
                dispatch({type: GET_TURNOVER_GOOD_BY_ID_FAILURE})
                dispatch({type: ADD_ERROR, error: error})
            })
        }
        catch (error) {
            dispatch({type: GET_TURNOVER_GOODS_FAILURE})
            dispatch({type: ADD_ERROR, error: error})
        }
    }
}


export function getAvailabilityGoods() {
    return function (dispatch) {
        try {
            dispatch({type: GET_AVAILABILITY_GOODS})
            return getAvailabilityGoodsData().then(res => {
                dispatch({type: GET_AVAILABILITY_GOODS_SUCCESS, payload: res})
            }).catch((error) => {
                dispatch({type: GET_AVAILABILITY_GOODS_FAILURE})
                dispatch({type: ADD_ERROR, error: error})
            })
        }
        catch (error) {
            dispatch({type: GET_AVAILABILITY_GOODS_FAILURE})
            dispatch({type: ADD_ERROR, error: error})
        }
    }
}


const initialState = {searchResult: []}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TURNOVER_GOOD_SUCCESS:
            return {...state, ok: action.payload}
        case UPDATE_TURNOVER_GOOD_SUCCESS:
            return {...state, ok: action.payload}
        case DELETE_TURNOVER_GOOD_SUCCESS:
            return {...state, ok: action.payload}
        case FIND_TURNOVER_GOODS_SUCCESS:
            return {...state, searchResult: action.payload}
        case GET_TURNOVER_GOOD_BY_ID_SUCCESS:
            return {...state, turnoverGood: action.payload}
        case GET_AVAILABILITY_GOODS_SUCCESS:
            return {...state, availabilityGoods: action.payload}
        default:
            return state
    }
}