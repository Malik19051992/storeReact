import axios from 'axios';

const host = 'http://localhost:8080/'

export function getCategoriesTreeData() {
    return axios.get(host + 'categoriesTree/')
        .then(res => res.data);
}

export function getCategoriesData() {
    return axios.get(host + 'categories/')
        .then(res => res.data);
}

export function getCategoryByIdData(id) {
    return axios.get(host + `categories/${id}`)
        .then(res => res.data);
}

export function addCategoryData(category) {
    return axios.post(host + `categories/`, JSON.stringify(category))
        .then(res => res.data);
}

export function updateCategoryData(category) {
    return axios.post(host + `categories/${category.id}`, JSON.stringify(category))
        .then(res => res.data);

}

export function deleteCategoryData(id) {
    return axios.delete(host + `categories/${id}`)
        .then(res => res.data);
}

export function getAttributesData() {
    return axios.get(host + 'attributes/')
        .then(res => res.data);
}

export function getAttributeByIdData(id) {
    return axios.get(host + `attributes/${id}`)
        .then(res => res.data);
}

export function addAttributeData(attribute) {
    return axios.post(host + `attributes/`, JSON.stringify(attribute))
        .then(res => res.data);
}


export function updateAttributeData(attribute) {
    return axios.post(host + `attributes/${attribute.id}`, JSON.stringify(attribute))
        .then(res => res.data);

}

export function deleteAttributeData(id) {
    return axios.delete(host + `attributes/${id}`)
        .then(res => res.data);
}


export function saveAttributesCategoryData(data, categoryId) {
    return axios.post(host + `categories/${categoryId}/attributes`, JSON.stringify(data))
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
    return axios.post(host + `goods/`, JSON.stringify(good))
        .then(res => res.data);
}

export function updateGoodData(goods) {
    return axios.post(host + `goods/${goods.id}`, JSON.stringify(goods))
        .then(res => res.data);

}

export function deleteGoodData(id) {
    return axios.delete(host + `goods/${id}`)
        .then(res => res.data);
}

export function savePropertiesGoodData(data, goodId) {
    return axios.post(host + `goods/${goodId}/properties/`, JSON.stringify(data))
        .then(res => res.data);
}
