import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk';
import categories from './modules/categories'

const createStoreWithMiddleware = applyMiddleware(
    thunk
)(createStore)

const reducer = combineReducers({
    categories
})

export default initialState => createStoreWithMiddleware(reducer, initialState)
