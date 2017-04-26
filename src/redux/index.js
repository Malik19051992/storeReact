import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk';
import categories from './modules/categories'
import { createLogger } from 'redux-logger'

const loggerMiddleware = createLogger()
const createStoreWithMiddleware = applyMiddleware(
    thunk,
    loggerMiddleware
)(createStore)

const reducer = combineReducers({
    categoriesData: categories
})

export default initialState => createStoreWithMiddleware(reducer, initialState)
