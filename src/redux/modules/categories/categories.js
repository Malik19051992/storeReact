import {
    getCategoryByIdData,
    getCategoriesTreeData,
    getCategoriesData,
    addCategoryData
} from '../../../dataProvider'

const ADD_CATEGORY = 'ADD_CATEGORY';
const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS';
const ADD_CATEGORY_FAILURE = 'ADD_CATEGORY_FAILURE';

const GET_CATEGORY = 'GET_CATEGORY';
const GET_CATEGORY_SUCCESS = 'GET_CATEGORY_SUCCESS';
const GET_CATEGORY_FAILURE = 'GET_CATEGORY_FAILURE';

const GET_CATEGORIES = 'GET_CATEGORIES';
const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES';
const GET_CATEGORIES_FAILURE = 'GET_CATEGORIES';

const GET_CATEGORIES_TREE = 'GET_CATEGORIES_TREE';
const GET_CATEGORIES_TREE_SUCCESS = 'GET_CATEGORIES_TREE_SUCCESS';
const GET_CATEGORIES_TREE_FAILURE = 'GET_CATEGORIES_TREE_FAILURE';


export function addCategory(category) {
    return function (dispatch) {
        try {
            dispatch({type: ADD_CATEGORY})
            addCategoryData(category).then(res => {
                dispatch({type: ADD_CATEGORY_SUCCESS, payload: res})
            }).catch((error) => {
                dispatch({type: ADD_CATEGORY_FAILURE, payload: error.message})
            })
        } catch (error) {
            dispatch({type: ADD_CATEGORY_FAILURE, payload: error.message})
        }
    }
}

export function getCategoryById(id) {
    return function (dispatch) {
        try {
            dispatch({type: GET_CATEGORY})
            getCategoryByIdData(id).then(res => {
                dispatch({type: GET_CATEGORY_SUCCESS, payload: res})
            }).catch((error) => {
                dispatch({type: GET_CATEGORY_FAILURE, payload: error.message})
            })
        } catch (error) {
            dispatch({type: GET_CATEGORY_FAILURE, payload: error.message})
        }
    }
}

export function getCategories() {
    return function (dispatch) {
        try {
            dispatch({type: GET_CATEGORIES})
            getCategoriesData().then(res => {
                dispatch({type: GET_CATEGORIES_SUCCESS, payload: res})
            }).catch((error) => {
                dispatch({type: GET_CATEGORIES_FAILURE, payload: error.message})
            })
        }
        catch (error) {
            dispatch({type: GET_CATEGORIES_FAILURE, payload: error.message})
        }
    }
}

export function getCategoriesTree() {
    return function (dispatch) {
        try {
            dispatch({type: GET_CATEGORIES_TREE})
            getCategoriesTreeData().then(res => {
                dispatch({type: GET_CATEGORIES_TREE_SUCCESS, payload: res})
            }).catch((error) => {
                dispatch({type: GET_CATEGORIES_TREE_FAILURE, payload: error.message})
            })
        } catch (error) {
            dispatch({type: GET_CATEGORIES_TREE_FAILURE, payload: error.message})
        }
    }
}

const initialState = {categoriesTree: [], categories: []}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_CATEGORIES_TREE_SUCCESS:
            return {...state, categoriesTree: action.payload}
        case GET_CATEGORIES_TREE_FAILURE:
            return {...state, error: action.payload}
        case GET_CATEGORIES_SUCCESS:
            return {...state, categories: action.payload}
        case GET_CATEGORIES_FAILURE:
            return {...state, error: action.payload}
        case GET_CATEGORY_SUCCESS:
            return {...state, category: action.payload}
        case GET_CATEGORY_FAILURE:
            return {...state, error: action.payload}
        case ADD_CATEGORY_SUCCESS:
            return {...state, category: action.payload}
        case ADD_CATEGORY_FAILURE:
            return {...state, error: action.payload}
        default:
            return state
    }
}
//_FAILURE SUCCESS