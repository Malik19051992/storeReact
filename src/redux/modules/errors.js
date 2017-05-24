export const ADD_ERROR = 'ADD_ERROR';
const REMOVE_ERROR = 'REMOVE_ERROR';
const REMOVE_ALL_ERRORS = 'REMOVE_ALL_ERRORS';
const GET_ERROR = 'GET_ERROR';

export function removeError(index) {
    return function (dispatch) {
        dispatch({type: REMOVE_ERROR, index: index})
    }
}
export function removeAllErrors() {
    return function (dispatch) {
        dispatch({type: REMOVE_ALL_ERRORS})
    }
}

export function getError(index) {
    return function (dispatch) {
        dispatch({type: GET_ERROR, index: index})
    }
}

const initialState = {errorsArray: [], error: null}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case ADD_ERROR:
            return {...state, errorsArray: state.errorsArray.concat([action.error])};

        case GET_ERROR:
            return {...state, error: state.errorsArray[action.index]};

        case REMOVE_ERROR:
            if (state.errorsArray.length > 0)
                return {
                    ...state,
                    errorsArray: state.errorsArray.filter((error, i) => i !== action.index)
                };
            else
                return {...state};

        case REMOVE_ERROR:
            return {...state, errorsArray: []};


        default:
            return state;
    }
}