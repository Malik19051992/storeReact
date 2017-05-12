import {
    getAttributesData,
    getAttributeByIdData,
    addAttributeData,
    updateAttributeData,
    deleteAttributeData
} from '../../../dataProvider'
import {ADD_ERROR} from '../errors'

const ADD_ATTRIBUTE = 'ADD_ATTRIBUTE';
const ADD_ATTRIBUTE_SUCCESS = 'ADD_ATTRIBUTE_SUCCESS';
const ADD_ATTRIBUTE_FAILURE = 'ADD_ATTRIBUTE_FAILURE';

const GET_ATTRIBUTE = 'GET_ATTRIBUTE';
const GET_ATTRIBUTE_SUCCESS = 'GET_ATTRIBUTE_SUCCESS';
const GET_ATTRIBUTE_FAILURE = 'GET_ATTRIBUTE_FAILURE';

const GET_ATTRIBUTES = 'GET_ATTRIBUTES';
const GET_ATTRIBUTES_SUCCESS = 'GET_ATTRIBUTES_SUCCESS';
const GET_ATTRIBUTES_FAILURE = 'GET_ATTRIBUTES_FAILURE';

const UPDATE_ATTRIBUTE = 'UPDATE_ATTRIBUTE';
const UPDATE_ATTRIBUTE_SUCCESS = 'UPDATE_ATTRIBUTE_SUCCESS';
const UPDATE_ATTRIBUTE_FAILURE = 'UPDATE_ATTRIBUTE_FAILURE';

const DELETE_ATTRIBUTE = 'DELETE_ATTRIBUTE';
const DELETE_ATTRIBUTE_SUCCESS = 'DELETE_ATTRIBUTE_SUCCESS';
const DELETE_ATTRIBUTE_FAILURE = 'DELETE_ATTRIBUTE_FAILURE';


export function getAttributes() {
    return function (dispatch) {
        try {
            dispatch({type: GET_ATTRIBUTES})
            getAttributesData().then(res => {
                dispatch({type: GET_ATTRIBUTES_SUCCESS, payload: res})
            }).catch((error) => {
                dispatch({type: GET_ATTRIBUTES_FAILURE})
                dispatch({type: ADD_ERROR, error: error})
            })
        }
        catch (error) {
            dispatch({type: GET_ATTRIBUTES_FAILURE})
            dispatch({type: ADD_ERROR, error: error})
        }
    }
}

export function updateAttribute(attribute) {
    return function (dispatch) {
        try {
            dispatch({type: UPDATE_ATTRIBUTE})
            return updateAttributeData(attribute).then(res => {
                dispatch({type:UPDATE_ATTRIBUTE_SUCCESS, payload: res})
                return res;
            })
        } catch (error) {
            dispatch({type: UPDATE_ATTRIBUTE_FAILURE})
            dispatch({type: ADD_ERROR, error: error})
        }
    }
}

export function deleteAttribute(id) {
    return function (dispatch) {
        try {
            dispatch({type: DELETE_ATTRIBUTE})
            return deleteAttributeData(id).then(res => {
                dispatch({type: DELETE_ATTRIBUTE_SUCCESS, payload: res})
                return res;
            })
        } catch (error) {
            dispatch({type: DELETE_ATTRIBUTE_FAILURE})
            dispatch({type: ADD_ERROR, error: error})
        }
    }
}



export function addAttribute(attribute) {
    return function (dispatch) {
        try {
            dispatch({type: ADD_ATTRIBUTE})
            return addAttributeData(attribute).then(res => {
                dispatch({type: ADD_ATTRIBUTE_SUCCESS, payload: res})
                return res;
            })
        } catch (error) {
            dispatch({type: ADD_ATTRIBUTE_FAILURE})
            dispatch({type: ADD_ERROR, error: error})
        }
    }
}

export function getAttributeById(id) {
    return function (dispatch) {
        try {
            dispatch({type: GET_ATTRIBUTE})
            getAttributeByIdData(id).then(res => {
                dispatch({type: GET_ATTRIBUTE_SUCCESS, payload: res})
            }).catch((error) => {
                dispatch({type: GET_ATTRIBUTE_FAILURE})
                dispatch({type: ADD_ERROR, error: error})
            })
        } catch (error) {
            dispatch({type: GET_ATTRIBUTE_FAILURE})
            dispatch({type: ADD_ERROR, error: error})
        }
    }
}


const initialState = {attributes: []}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ATTRIBUTES_SUCCESS:
            return {...state, attributes: action.payload}
        case GET_ATTRIBUTE_SUCCESS:
            return {...state, attribute: action.payload}
        case ADD_ATTRIBUTE_SUCCESS:
            return {...state, ok: action.payload}
        case DELETE_ATTRIBUTE_SUCCESS:
            return {...state, ok: action.payload}
        case UPDATE_ATTRIBUTE_SUCCESS:
            return {...state, ok: action.payload}
        default:
            return state
    }
}