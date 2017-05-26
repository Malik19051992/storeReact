const SET_BREADCRUMBS = 'SET_BREADCRUMBS';
import {ADD_ERROR} from './errors'

export function setBreadcrumbs(path) {
    return function (dispatch) {
        try {
            dispatch({type: SET_BREADCRUMBS, payload: path})


        } catch (error) {
            dispatch({type: ADD_ERROR, error: error})
        }
    }
}


const initialState = {links: []}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_BREADCRUMBS:
            return {...state, links: getLinks(action.payload)}
        default:
            return state
    }
}


function getLinks(path) {
    const pathArray = path.split('/');
    let linkSum = '/';
    const result = [];
    result.push({text: 'Главная', link: linkSum});
    for (let i = 0; i < pathArray.length; i++) {
        switch (pathArray[i].toLowerCase()) {
            case 'categories':
                linkSum += 'categories/';
                result.push({text: 'Категории', link: linkSum})
                if (parseInt(pathArray[i + 1])) {
                    linkSum += pathArray[i + 1] + '/'
                    result.push({text: 'Категория', link: linkSum})
                }
                break;
            case 'createCategory'.toLowerCase():
                linkSum += 'categories/';
                result.push({text: 'Категории', link: linkSum})
                if (parseInt(pathArray[i + 1])) {
                    linkSum += 'createCategory/' + pathArray[i + 1] + '/';
                    result.push({text: 'Редактирование категории', link: linkSum})
                } else {
                    linkSum += 'createCategory/';
                    result.push({text: 'Создание категории', link: linkSum})
                }
                break;
            case 'attributes':
                linkSum += 'attributes/';
                result.push({text: 'Атрибуты', link: linkSum})
                if (parseInt(pathArray[i + 1])) {
                    linkSum += pathArray[i + 1] + '/';
                    result.push({text: 'Атрибут', link: linkSum})
                }
                break;
            case 'createAttribute'.toLowerCase():
                linkSum += 'attributes/';
                result.push({text: 'Атрибут', link: linkSum})
                if (parseInt(pathArray[i + 1])) {
                    linkSum += 'createAttribute/' + pathArray[i + 1] + '/';
                    result.push({text: 'Редактирование атрибута', link: linkSum})
                } else {
                    linkSum += 'createAttribute/';
                    result.push({text: 'Создание атрибута', link: linkSum})
                }
                break;
            case 'goods':
                linkSum += 'goods/';
                result.push({text: 'Товары', link: linkSum})
                if (parseInt(pathArray[i + 1])) {
                    linkSum += pathArray[i + 1] + '/';
                    result.push({text: 'Товар', link: linkSum})
                }
                break;
            case 'createGood'.toLowerCase():
                linkSum += 'goods/';
                result.push({text: 'Товар', link: linkSum})
                if (parseInt(pathArray[i + 1])) {
                    linkSum += 'createGood/' + pathArray[i + 1] + '/';
                    result.push({text: 'Редактирование товара', link: linkSum})
                } else {
                    linkSum += 'createGood/';
                    result.push({text: 'Создание товара', link: linkSum})
                }
                break;
            case 'users':
                linkSum += 'users/';
                result.push({text: 'Пользователь', link: linkSum})
                if (parseInt(pathArray[i + 1])) {
                    linkSum += pathArray[i + 1] + '/';
                    result.push({text: 'Пользователи', link: linkSum})
                }
                break;
            case 'createUser'.toLowerCase():
                linkSum += 'users/';
                result.push({text: 'Пользователь', link: linkSum})
                if (parseInt(pathArray[i + 1])) {
                    linkSum += 'createUser/' + pathArray[i + 1] + '/';
                    result.push({text: 'Редактирование пользователя', link: linkSum})
                } else {
                    linkSum += 'createUser/';
                    result.push({text: 'Создание пользователя', link: linkSum})
                }
                break;
            case 'arrivedGoods'.toLowerCase():
                linkSum += 'arrivedGoods/';
                result.push({text: 'Поступивший товар', link: linkSum})
                if (parseInt(pathArray[i + 1])) {
                    linkSum += pathArray[i + 1] + '/';
                    result.push({text: 'Редактирование поступления', link: linkSum})
                }
                break;
            case 'createArrivedGoods'.toLowerCase():
                linkSum += 'createArrivedGoods/';
                result.push({text: 'Поступление товара', link: linkSum})
                break;
            case 'soldGoods'.toLowerCase():
                linkSum += 'soldGoods/';
                result.push({text: 'Проданный товар', link: linkSum})
                if (parseInt(pathArray[i + 1])) {
                    linkSum += pathArray[i + 1] + '/';
                    result.push({text: 'Редактирование продажи', link: linkSum})
                }
                break;
            case 'createSoldGoods'.toLowerCase():
                linkSum += 'createSoldGoods/';
                result.push({text: 'Продажа товара', link: linkSum})
                break;
            case 'availabilityGoods'.toLowerCase():
                linkSum += 'availabilityGoods/';
                result.push({text: 'Наличие товара', link: linkSum})
                break;
            case 'termsOfUse'.toLowerCase():
                linkSum += 'termsOfUse/';
                result.push({text: 'Пользовательское соглашение', link: linkSum})
                break;


        }
    }
    return result;
}