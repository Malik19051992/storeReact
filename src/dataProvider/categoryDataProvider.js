import axios from 'axios';

const host = 'http://localhost:8080/'

export function getCategoriesTreeData() {
    return axios.get(host+'categoriesTree')
        .then(res => res.data);
}

export function getCategoriesData() {
    return axios.get(host+'categories/')
        .then(res => res.data);
}

export function getCategoryByIdData(id) {
    return axios.get(host+`categories/${id}`)
        .then(res => res.data);
}

export function addCategoryData(category) {
    return axios.post(host+`categories/`, JSON.stringify(category))
        .then(res => res.data);
}