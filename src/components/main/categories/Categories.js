import React, {Component} from 'react';
import Loading from '../../Loading'
import {Link} from 'react-router-dom';


class Categories extends Component {

    state = {
        categories: []
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.categories !== this.props.categories) {
            this.setState({categories: nextProps.categories});
        }
    }

    deleteCategory = (event) => {
        if(confirm("Вы уверены")) {
            this.props.deleteCategory(+event.target.value);
            const categories = this.state.categories;
            const temp = categories.filter((item) => item.id === +event.target.value)[0];
            if (temp) {
                categories.splice(categories.indexOf(temp), 1);
            }
            this.setState({categories: categories});
        }
    }


    render() {
        if (!this.state.categories)
            return <Loading/>
        else {
            const rows = this.state.categories.map((item) =>
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td><button onClick={()=>this.props.history.push("/categories/" + item.id)}>Детали</button></td>
                    <td><button onClick={()=>this.props.history.push(`/categories/${item.id}/attributes`)}>Привязать атрибуты</button></td>
                    <td><button onClick={()=>this.props.history.push("/createCategory/" + item.id)}>Редактировать</button></td>
                    <td><button onClick={this.deleteCategory} value={item.id}>Удалить</button></td>
                </tr>
            );
            return (
                <div>
                    <table className="data-table">
                        <tbody>
                        <tr>
                            <th>Название категории</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        {rows}
                        </tbody>
                    </table>
                    <button onClick={()=>this.props.history.push("/createCategory/")}>Добавить категорию</button>
                </div>
            )
        }

    }
}


export default Categories;

