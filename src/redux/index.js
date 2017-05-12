import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk';
import categories from './modules/categories'
import attributes from './modules/attributes'
import attributesCategory from './modules/attributesCategory'
import goods from './modules/goods'
import propertiesGood from './modules/propertiesGood'
import errors from './modules/errors'
import {createLogger} from 'redux-logger'

const loggerMiddleware = createLogger()
const createStoreWithMiddleware = applyMiddleware(
    thunk,
    loggerMiddleware
)(createStore)

const reducer = combineReducers({
    categoriesData: categories,
    attributesData: attributes,
    attributesCategoryData: attributesCategory,
    goodsData: goods,
    propertiesGoodData: propertiesGood,
    errorsData: errors
})

export default initialState => createStoreWithMiddleware(reducer, initialState)
