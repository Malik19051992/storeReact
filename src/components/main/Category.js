import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Category extends Component {
    state = {
        category: {
            attributties:[]
        }
    }

    componentDidMount() {
        this.getCategories();
    }

    getCategories() {
        return axios.get(`http://localhost:8080/categories/${this.props.match.params.id}`).then(res => {
            this.setState({category: res.data});
        }).catch((error) => {
            console.error(error);
        });
    }


    render() {
        const attrs = this.state.category.attributties.map(item => {
            return (<tr>
                <td>{item.name}</td>
                <td>{item.type}</td>
            </tr>)
        });
        return (
            < div >
                {this.props.match.params.id}
                <table>
                    <tr>
                        <th>Название категории</th>
                        <td>{this.state.category.name}</td>
                    </tr>
                </table>
                <h2>Атрибуты</h2>
                <table>
                    <tr>
                        <th>Название атрибута</th>
                        <th>Тип</th>
                    </tr>
                    {attrs}
                </table>
            </div>
        )
    }
}

export default Category;
