import {ADD_ERROR} from './errors'
import {
    loginUserData,
    getUsersData,
    getUserByIdData,
    addUserData,
    updateUserData,
    deleteUserData,
    changePasswordData
} from '../../dataProvider'
import jwtDecode from 'jwt-decode';


const LOGIN_USER = "LOGIN_USER";
const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";
const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
const LOGOUT_USER = "LOGOUT_USER";

const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE';

const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
const FETCH_PROTECTED_DATA_REQUEST = "FETCH_PROTECTED_DATA_REQUEST";
const RECEIVE_PROTECTED_DATA = "RECEIVE_PROTECTED_DATA";

const ADD_USER = 'ADD_USER';
const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
const ADD_USER_FAILURE = 'ADD_USER_FAILURE';

const GET_USER = 'GET_USER';
const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
const GET_USER_FAILURE = 'GET_USER_FAILURE';

const GET_USERS = 'GET_USERS';
const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'GET_USERS_FAILURE';

const UPDATE_USER = 'UPDATE_USER';
const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

const DELETE_USER = 'DELETE_USER';
const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';


export function loginUser(data) {
    return function (dispatch) {
        try {
            dispatch({type: LOGIN_USER})
            return loginUserData(data).then(res => {
                dispatch({type: LOGIN_USER_SUCCESS, payload: res.token})

            }).catch((error) => {
                dispatch({type: LOGIN_USER_FAILURE})
            })

        } catch (error) {
            dispatch({type: LOGIN_USER_FAILURE})
        }
    }

}

export function logoutUser() {
    return function (dispatch) {
        try {
            dispatch({type: LOGOUT_USER})
        } catch (error) {
            dispatch({type: ADD_ERROR, error: error})
        }
    }
}

export function changePassword(data) {
    return function (dispatch) {
        try {
            dispatch({type: CHANGE_PASSWORD})
            return changePasswordData(data).then(res => {
                dispatch({type: CHANGE_PASSWORD_SUCCESS, payload: res})
                return res;
            })
        } catch (error) {
            dispatch({type: CHANGE_PASSWORD_FAILURE})
        }
    }
}


export function addUser(user) {
    return function (dispatch) {
        try {
            dispatch({type: ADD_USER})
            return addUserData(user).then(res => {
                dispatch({type: ADD_USER_SUCCESS, payload: res})
                return res;
            })
        } catch (error) {
            dispatch({type: ADD_USER_FAILURE})
            dispatch({type: ADD_ERROR, error: error})
        }
    }
}


export function updateUser(user) {
    return function (dispatch) {
        try {
            dispatch({type: UPDATE_USER})
            return updateUserData(user).then(res => {
                dispatch({type: UPDATE_USER_SUCCESS, payload: res})
                return res;
            })
        } catch (error) {
            dispatch({type: UPDATE_USER_FAILURE})
            dispatch({type: ADD_ERROR, error: error})
        }
    }
}

export function deleteUser(id) {
    return function (dispatch) {
        try {
            dispatch({type: DELETE_USER})
            return deleteUserData(id).then(res => {
                dispatch({type: DELETE_USER_SUCCESS, payload: res})
                return res;
            })
        } catch (error) {
            dispatch({type: DELETE_USER_FAILURE})
            dispatch({type: ADD_ERROR, error: error})
        }
    }
}

export function getUserById(id) {
    return function (dispatch) {
        try {
            dispatch({type: GET_USER})
            return getUserByIdData(id).then(res => {
                dispatch({type: GET_USER_SUCCESS, payload: res})
            }).catch((error) => {
                dispatch({type: GET_USER_FAILURE})
                dispatch({type: ADD_ERROR, error: error})
            })
        } catch (error) {
            dispatch({type: GET_USER_FAILURE})
            dispatch({type: ADD_ERROR, error: error})
        }
    }
}

export function getUsers() {
    return function (dispatch) {
        try {
            dispatch({type: GET_USERS})
            return getUsersData().then(res => {
                dispatch({type: GET_USERS_SUCCESS, payload: res})
            }).catch((error) => {
                dispatch({type: GET_USERS_FAILURE})
                dispatch({type: ADD_ERROR, error: error})
            })
        }
        catch (error) {
            dispatch({type: GET_USERS_FAILURE})
            dispatch({type: ADD_ERROR, error: error})
        }
    }
}


export default function reducer(state = getInitialState(), action) {
    switch (action.type) {
        case LOGIN_USER_SUCCESS: {
            const token = action.payload;
            const user = jwtDecode(token);
            localStorage.setItem('token', token);
            return {
                ...state,
                id: user.id,
                userName: user.name,
                login: user.login,
                role: user.role,
                token: token,
                isAuthenticated: true,
                wrongLoginOrPassword: false
            }
        }
        case LOGIN_USER_FAILURE: {
            return {...state, wrongLoginOrPassword: true}
        }
        case LOGOUT_USER: {
            localStorage.removeItem('token');
            return {
                ...state,
                userName: null,
                login: null,
                role: null,
                token: null,
                isAuthenticated: false,
            }
        }
        case GET_USERS_SUCCESS:
            return {...state, users: action.payload}
        case GET_USER_SUCCESS:
            return {...state, user: action.payload}
        case ADD_USER_SUCCESS:
            return {...state, ok: action.payload}
        case DELETE_USER_SUCCESS:
            return {...state, ok: action.payload}
        case UPDATE_USER_SUCCESS:
            return {...state, ok: action.payload}
        case CHANGE_PASSWORD_SUCCESS:
            return {...state, ok: action.payload}

        default:
            return state
    }
}

function getInitialState() {
    const token = localStorage.getItem('token');
    if (token) {
        const user = jwtDecode(token);
        return {
            token: token,
            id: user.id,
            userName: user.name,
            login: user.login,
            role: user.role,
            isAuthenticated: true,
            users: []
        }
    }
    else {
        return {
            id: null,
            token: null,
            userName: null,
            login: null,
            isAuthenticated: false,
            users: []
        }
    }
}


