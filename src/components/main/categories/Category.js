import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Loading from '../../Loading'


class Category extends Component {

    state = {
        category: null
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.category)
            if (nextProps.category !== this.props.category) {
                this.setState({category: nextProps.category});
            }
    }

    render() {
        if (!this.state.category)
            return <Loading/>
        else {
            const attrs = this.state.category.attributes.map(item =>
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.type}</td>
                </tr>
            );
            const goods = this.state.category.goods.map(item =>
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                </tr>
            )
            return (
                < div >
                    <table className="data-table">
                        <tbody>
                        <tr>
                            <th>Название категории</th>
                            <td>{this.state.category.name}</td>
                        </tr>
                        </tbody>
                    </table>
                    <h2>Атрибуты</h2>
                    <table className="data-table">
                        <tbody>
                        <tr>
                            <th>Название атрибута</th>
                            <th>Тип</th>
                        </tr>
                        {attrs}
                        </tbody>
                    </table>
                    <h2>Товары</h2>
                    <table className="data-table">
                        <tbody>
                        <tr>
                            <th>Название товара</th>
                            <th>Цена</th>
                        </tr>
                        {attrs}
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}

export default Category;

