import React, {Component} from 'react';
import Loading from '../../Loading'
import {Link} from 'react-router-dom';


class Categories extends Component {

    state = {
        categories: [],
        filterValue: '',
        filteredCategories: []

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.categories !== this.props.categories) {
            this.setState({categories: nextProps.categories, filteredCategories: nextProps.categories});
        }
    }

    deleteCategory = (event) => {
        if (confirm("Вы уверены")) {
            this.props.deleteCategory(+event.target.value);
            const categories = this.state.categories;
            const temp = categories.filter((item) => item.id === +event.target.value)[0];
            if (temp) {
                categories.splice(categories.indexOf(temp), 1);
            }
            this.setState({categories: categories});
        }
    }

    filterChange = (event) => {
        const filterValue = event.target.value.toLowerCase();
        this.setState({
            filterValue: filterValue,
            filteredCategories: this.state.categories.filter(item => ~item.name.toLowerCase().indexOf(filterValue))
        })
    }
    filterClear = () => {
        this.setState({filterValue: '', filteredCategories: this.state.categories});
    }

    render() {
        if (!this.state.categories)
            return <Loading/>
        else {
            const rows = this.state.filteredCategories.map((item) =>
                <tr key={item.id}>
                    <td><Link to={"/categories/" + item.id}> {item.name}</Link></td>
                    <td>
                        <button className="common" onClick={() => this.props.history.push(`/categories/${item.id}/attributes`)}>
                            Привязать атрибуты
                        </button>
                    </td>
                    <td>
                        <button className="edit-button action-button"
                                onClick={() => this.props.history.push("/createCategory/" + item.id)}>
                        </button>
                    </td>
                    <td>
                        <button className="delete-button action-button" onClick={this.deleteCategory} value={item.id}>

                        </button>
                    </td>
                </tr>
            );
            return (
                <div className="main-content">
                    <div className="filter-data">
                        <label htmlFor="filter">Поиск: </label>
                        <input type="text" id="filter" onChange={this.filterChange} value={this.state.filterValue}/>
                        <button className="action-button" onClick={this.filterClear}>.</button>
                    </div>
                    <table className="data-table">
                        <tbody>

                        {rows}
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <button className="add-button action-button"
                                        onClick={() => this.props.history.push("/createCategory/")}></button>
                            </td>


                        </tr>
                        </tbody>
                    </table>
                </div>
            )
        }

    }
}


export default Categories;

