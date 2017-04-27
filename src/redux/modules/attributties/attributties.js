import {
    getAttributtiesData,
    getAttributeByIdData,
    addAttributeData
} from '../../../dataProvider'

const GET_ATTRIBUTTIES = 'GET_ATTRIBUTTIES';
const GET_ATTRIBUTTIES_SUCCESS = 'GET_ATTRIBUTTIES_SUCCESS';
const GET_ATTRIBUTTIES_FAILURE = 'GET_ATTRIBUTTIES_FAILURE';

const ADD_ATTRIBUTE = 'ADD_ATTRIBUTE';
const ADD_ATTRIBUTE_SUCCESS = 'ADD_ATTRIBUTE_SUCCESS';
const ADD_ATTRIBUTE_FAILURE = 'ADD_ATTRIBUTE_FAILURE';

const GET_ATTRIBUTE = 'GET_ATTRIBUTE';
const GET_ATTRIBUTE_SUCCESS = 'GET_ATTRIBUTE_SUCCESS';
const GET_ATTRIBUTE_FAILURE = 'GET_ATTRIBUTE_FAILURE';


export function getAttributties() {
    return function (dispatch) {
        try {
            dispatch({type: GET_ATTRIBUTTIES})
            getAttributtiesData().then(res => {
                dispatch({type: GET_ATTRIBUTTIES_SUCCESS, payload: res})
            }).catch((error) => {
                dispatch({type: GET_ATTRIBUTTIES_FAILURE, payload: error.message})
            })
        }
        catch (error) {
            dispatch({type: GET_ATTRIBUTTIES_FAILURE, payload: error.message})
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
            dispatch({type: ADD_ATTRIBUTE_FAILURE, payload: error.message})
            return {error: error.message}
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
                dispatch({type: GET_ATTRIBUTE_FAILURE, payload: error.message})
            })
        } catch (error) {
            dispatch({type: GET_ATTRIBUTE_FAILURE, payload: error.message})
        }
    }
}


const initialState = {attributties: []}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ATTRIBUTTIES_SUCCESS:
            return {...state, attributties: action.payload}
        case GET_ATTRIBUTTIES_FAILURE:
            return {...state, error: action.payload}
        case GET_ATTRIBUTE_SUCCESS:
            return {...state, attribute: action.payload}
        case GET_ATTRIBUTE_FAILURE:
            return {...state, error: action.payload}
        case ADD_ATTRIBUTE_SUCCESS:
            return {...state, ok: action.payload}
        case ADD_ATTRIBUTE_FAILURE:
            return {...state, error: action.payload}
        default:
            return state
    }
}