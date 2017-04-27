import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk';
import categories from './modules/categories'
import attributties from './modules/attributties'
import {createLogger} from 'redux-logger'

const loggerMiddleware = createLogger()
const createStoreWithMiddleware = applyMiddleware(
    thunk,
    loggerMiddleware
)(createStore)

const reducer = combineReducers({
    categoriesData: categories,
    attributtiesData: attributties
})

export default initialState => createStoreWithMiddleware(reducer, initialState)
