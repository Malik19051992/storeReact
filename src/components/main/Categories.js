import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Categories extends Component {
    state = {
        categories: []
    }

    componentDidMount() {
        this.getCategories();
    }

    getCategories() {
        return axios.get('http://localhost:8080/categories').then(res => {
            this.setState({categories: res.data});
        }).catch((error) => {
            console.error(error);
        });
    }


    render() {

        const rows = this.state.categories.map(function (item) {
            return (<tr>
                <td>{item.name}</td>
                <td><Link to={"/categories/" + item.id}>Детали</Link></td>
            </tr>)
        });
        return (
            <table>
                <tr>
                    <th>Название категории</th>
                    <th></th>
                </tr>
                {rows}
            </table>
        )
    }
}

export default Categories;
