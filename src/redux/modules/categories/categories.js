import axios from 'axios';

const ADD_CATEGORY = 'CATEGORY_ADD';
const GET_CATEGORY = 'CATEGORY_GET';
const GET_CATEGORIES = 'CATEGORIES_GET';
const GET_CATEGORIES_TREE = 'CATEGORIES_TREE_GET';

export function addCategory(name) {
    return {
        type: ADD_CATEGORY,
        name
    };
}

export function getCategory(id) {
    return {
        type: GET_CATEGORY,
        id
    };
}

export function getCategories(categories) {
    return {
        type: GET_CATEGORIES,
        categories
    };
}

export function getCategoriesTree() {
    return function (dispatch) {
        dispatch({ type:GET_CATEGORIES_TREE })
        axios.get('http://localhost:8080/categoriesTree').then(res => {
            dispatch({ type:GET_CATEGORIES_TREE, categoriesTree: res.data})
        }).catch((error) => {
            console.error(error);
        });
    }
}

const initialState = {categoriesTree: null}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_CATEGORIES:
            return {...state, categories: action.getCategory}
        case GET_CATEGORIES_TREE:
            return {...state, categoriesTree: action.getCategoriesTree}
        default:
            return state
    }
}

