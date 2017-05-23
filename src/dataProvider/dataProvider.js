import axios from 'axios';

const host = 'http://localhost:8080/'

export function getCategoriesTreeData() {
    return axios.get(host + 'categoriesTree/')
        .then(res => res.data);
}

export function getCategoriesData() {
    return axios.get(host + 'categories/', {headers: {authorization: localStorage.getItem('token')}})
        .then(res => res.data);
}

export function getCategoryByIdData(id) {
    return axios.get(host + `categories/${id}`, {headers: {authorization: localStorage.getItem('token')}})
        .then(res => res.data);
}

export function addCategoryData(category) {
    return axios.post(host + `categories/`, JSON.stringify(category), {headers: {authorization: localStorage.getItem('token')}})
        .then(res => res.data);
}

export function updateCategoryData(category) {
    return axios.post(host + `categories/${category.id}`, JSON.stringify(category), {headers: {authorization: localStorage.getItem('token')}})
        .then(res => res.data);

}

export function deleteCategoryData(id) {
    return axios.delete(host + `categories/${id}`, {headers: {authorization: localStorage.getItem('token')}})
        .then(res => res.data);
}

export function getAttributesData() {
    return axios.get(host + 'attributes/', {headers: {authorization: localStorage.getItem('token')}})
        .then(res => res.data);
}

export function getAttributeByIdData(id) {
    return axios.get(host + `attributes/${id}`, {headers: {authorization: localStorage.getItem('token')}})
        .then(res => res.data);
}

export function addAttributeData(attribute) {
    return axios.post(host + `attributes/`, JSON.stringify(attribute), {headers: {authorization: localStorage.getItem('token')}})
        .then(res => res.data);
}


export function updateAttributeData(attribute) {
    return axios.post(host + `attributes/${attribute.id}`, JSON.stringify(attribute), {headers: {authorization: localStorage.getItem('token')}})
        .then(res => res.data);

}

export function deleteAttributeData(id) {
    return axios.delete(host + `attributes/${id}`, {headers: {authorization: localStorage.getItem('token')}})
        .then(res => res.data);
}


export function saveAttributesCategoryData(data, categoryId) {
    return axios.post(host + `categories/${categoryId}/attributes`, JSON.stringify(data), {headers: {authorization: localStorage.getItem('token')}})
        .then(res => res.data);
}

export function getGoodsData() {
    return axios.get(host + 'goods/')
        .then(res => res.data);
}

export function getGoodsCategoryData(id) {
    return axios.get(host + `categories/${id}/goods`)
        .then(res => res.data);
}

export function getGoodByIdData(id) {
    return axios.get(host + `goods/${id}`)
        .then(res => res.data);
}

export function addGoodData(good) {
    return axios.post(host + `goods/`, JSON.stringify(good), {headers: {authorization: localStorage.getItem('token')}})
        .then(res => res.data);
}

export function updateGoodData(goods) {
    return axios.post(host + `goods/${goods.id}`, JSON.stringify(goods), {headers: {authorization: localStorage.getItem('token')}})
        .then(res => res.data);

}

export function deleteGoodData(id) {
    return axios.delete(host + `goods/${id}`, {headers: {authorization: localStorage.getItem('token')}})
        .then(res => res.data);
}

export function savePropertiesGoodData(data, goodId) {
    return axios.post(host + `goods/${goodId}/properties/`, JSON.stringify(data), {headers: {authorization: localStorage.getItem('token')}})
        .then(res => res.data);
}

export function loginUserData(data) {
    return axios.post(host + `login`, JSON.stringify(data))
        .then(res => res.data);
}


export function getUsersData() {
    return axios.get(host + 'users/', {headers: {authorization: localStorage.getItem('token')}})
        .then(res => res.data);
}

export function getUserByIdData(id) {
    return axios.get(host + `users/${id}`, {headers: {authorization: localStorage.getItem('token')}})
        .then(res => res.data);
}

export function addUserData(user) {
    return axios.post(host + `users/`, JSON.stringify(user), {headers: {authorization: localStorage.getItem('token')}})
        .then(res => res.data);
}


export function updateUserData(user) {
    return axios.post(host + `users/${user.id}`, JSON.stringify(user), {headers: {authorization: localStorage.getItem('token')}})
        .then(res => res.data);

}

export function deleteUserData(id) {
    return axios.delete(host + `users/${id}`, {headers: {authorization: localStorage.getItem('token')}})
        .then(res => res.data);
}

export function changePasswordData(data) {
    return axios.post(host + `changePassword/${data.id}`, JSON.stringify(data), {headers: {authorization: localStorage.getItem('token')}})
        .then(res => res.data);
}

export function addTurnoverGoodsData(data) {
    return axios.post(host + 'turnoverGoods', JSON.stringify(data), {headers: {authorization: localStorage.getItem('token')}})
        .then(res => res.data);
}

export function findTurnoverGoodsData(data) {
    return axios.post(host + 'turnoverGoodsSearch', JSON.stringify(data), {headers: {authorization: localStorage.getItem('token')}})
        .then(res => res.data);
}

export function getTurnoverGoodByIdData(id) {
    return axios.get(host + `turnoverGoods/${id}`, {headers: {authorization: localStorage.getItem('token')}})
        .then(res => res.data);
}

export function deleteTurnoverGoodData(id) {
    return axios.delete(host + `turnoverGoods/${id}`, {headers: {authorization: localStorage.getItem('token')}})
        .then(res => res.data);
}

export function updateTurnoverGoodsData(data) {
    return axios.post(host + `turnoverGoods/${data.id}`, JSON.stringify(data), {headers: {authorization: localStorage.getItem('token')}})
        .then(res => res.data);
}

export function getAvailabilityGoodsData() {
    return axios.get(host + `availabilityGoods`, {headers: {authorization: localStorage.getItem('token')}})
        .then(res => res.data);
}