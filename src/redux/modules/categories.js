import {
    getCategoryByIdData,
    getCategoriesTreeData,
    getCategoriesData,
    addCategoryData,
    deleteCategoryData,
    updateCategoryData
} from '../../dataProvider'
import {ADD_ERROR} from './errors'


const ADD_CATEGORY = 'ADD_CATEGORY';
const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS';
const ADD_CATEGORY_FAILURE = 'ADD_CATEGORY_FAILURE';

const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
const UPDATE_CATEGORY_SUCCESS = 'UPDATE_CATEGORY_SUCCESS';
const UPDATE_CATEGORY_FAILURE = 'UPDATE_CATEGORY_FAILURE';

const GET_CATEGORY = 'GET_CATEGORY';
const GET_CATEGORY_SUCCESS = 'GET_CATEGORY_SUCCESS';
const GET_CATEGORY_FAILURE = 'GET_CATEGORY_FAILURE';

const GET_CATEGORIES = 'GET_CATEGORIES';
const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
const GET_CATEGORIES_FAILURE = 'GET_CATEGORIES_FAILURE';

const GET_CATEGORIES_TREE = 'GET_CATEGORIES_TREE';
const GET_CATEGORIES_TREE_SUCCESS = 'GET_CATEGORIES_TREE_SUCCESS';
const GET_CATEGORIES_TREE_FAILURE = 'GET_CATEGORIES_TREE_FAILURE';

const DELETE_CATEGORY = 'DELETE_CATEGORY';
const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS';
const DELETE_CATEGORY_FAILURE = 'DELETE_CATEGORY_FAILURE';


export function addCategory(category) {
    return function (dispatch) {
        try {
            dispatch({type: ADD_CATEGORY})
            return addCategoryData(category).then(res => {
                dispatch({type: ADD_CATEGORY_SUCCESS, payload: res})
                return res;
            })
        } catch (error) {
            dispatch({type: ADD_CATEGORY_FAILURE, payload: error})
            dispatch({type: ADD_ERROR, error: error})
        }
    }
}

export function updateCategory(category) {
    return function (dispatch) {
        try {
            dispatch({type: UPDATE_CATEGORY})
            return updateCategoryData(category).then(res => {
                dispatch({type: UPDATE_CATEGORY_SUCCESS, payload: res})
                return res;
            }).catch((error) => {
                dispatch({type: UPDATE_CATEGORY})
                dispatch({type: ADD_ERROR, error: error})
            })
        } catch (error) {
            dispatch({type: UPDATE_CATEGORY_FAILURE})
            dispatch({type: ADD_ERROR, error: error})
        }
    }
}

export function deleteCategory(id) {
    return function (dispatch) {
        try {
            dispatch({type: DELETE_CATEGORY})
            return deleteCategoryData(id).then(res => {
                dispatch({type: DELETE_CATEGORY_SUCCESS, payload: res})
                return res;
            }).catch((error) => {
                dispatch({type: DELETE_CATEGORY_FAILURE})
                dispatch({type: ADD_ERROR, error: error})
            })
        } catch (error) {
            dispatch({type: DELETE_CATEGORY_FAILURE})
            dispatch({type: ADD_ERROR, error: error})
        }
    }
}

export function getCategoryById(id) {
    return function (dispatch) {
        try {
            dispatch({type: GET_CATEGORY})
            return getCategoryByIdData(id).then(res => {
                dispatch({type: GET_CATEGORY_SUCCESS, payload: res})
                return res;
            }).catch((error) => {
                dispatch({type: GET_CATEGORY_FAILURE})
                dispatch({type: ADD_ERROR, error: error})
            })
        } catch (error) {
            dispatch({type: GET_CATEGORY_FAILURE})
            dispatch({type: ADD_ERROR, error: error})

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
                dispatch({type: GET_CATEGORIES_FAILURE})
                dispatch({type: ADD_ERROR, error: error})
            })
        }
        catch (error) {
            dispatch({type: GET_CATEGORIES_FAILURE})
            dispatch({type: ADD_ERROR, error: error})
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
                dispatch({type: GET_CATEGORIES_TREE_FAILURE})
                dispatch({type: ADD_ERROR, error: error})
            })
        } catch (error) {
            dispatch({type: GET_CATEGORIES_TREE_FAILURE})
            dispatch({type: ADD_ERROR, error: error})
        }
    }
}

const initialState = {categoriesTree: [], categories: []}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_CATEGORIES_TREE_SUCCESS:
            return {...state, categoriesTree: action.payload}
        case GET_CATEGORIES_SUCCESS:
            return {...state, categories: action.payload}
        case GET_CATEGORY_SUCCESS:
            return {...state, category: action.payload}
        case ADD_CATEGORY_SUCCESS:
            return {...state, ok: action.payload}
        case DELETE_CATEGORY_SUCCESS:
            return {...state, ok: action.payload}
        case UPDATE_CATEGORY_SUCCESS:
            return {...state, ok: action.payload}
        default:
            return state
    }
}
