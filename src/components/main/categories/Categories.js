import React, {Component} from 'react';
import Loading from '../../Loading'
import {Link} from 'react-router-dom';
import DataTable from '../DataTable'

class Categories extends Component {

    state = {
        categories: [],
        filterValue: '',

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.categories !== this.props.categories) {
            this.setState({categories: nextProps.categories});
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

    editCategory = (event) => {
        return this.props.history.push("/createCategory/" + (+event.target.value))
    }

    changeFilterValue = (event) => {
        const filterValue = event.target.value.toLowerCase();
        this.setState({filterValue})
    }

    clearFilterValue = () => {
        this.setState({filterValue: ''});
    }

    findFilterValue = () => {
        this.props.changePage(this.props.pageSize, 1, this.state.filterValue)
    }

    changePage = (pageNumber) => {
        this.props.changePage(this.props.pageSize, pageNumber, this.state.filterValue)
    }

    addCategory = () => {
        this.props.history.push("/createCategory/");
    }

    render() {

        if (!this.state.categories)
            return <Loading/>
        else {
            return (
                <div className="main-content">
                    <div className="filter-data">
                        <label htmlFor="filter">Поиск: </label>
                        <input type="text" id="filter" onChange={this.changeFilterValue}
                               value={this.state.filterValue}/>
                        <button className="find-button action-button" onClick={this.findFilterValue}>.</button>
                        <button className="clear-button action-button" onClick={this.clearFilterValue}>.</button>
                    </div>

                    <DataTable header={["Название категории", ""]} columns={["nameElement", "addAttributeButton"]}
                               data={this.state.categories.map(item => {
                                   item.nameElement = <Link to={"/categories/" + item.id}> {item.name}</Link>;
                                   item.addAttributeButton =
                                       <button className="common" onClick={() => this.props.history.push(`/categories/${item.id}/attributes`)}>
                                           Привязать атрибуты
                                       </button>
                                   return item;
                               })}
                               editFunction={this.editCategory}
                               deleteFunction={this.deleteCategory} addFunction={this.addCategory}
                               dataCountAll={this.props.countCategories} dataCountOnPage={this.props.pageSize}
                               activePage={this.props.pageNumber} changePage={this.changePage}/>
                </div>
            )
        }

    }
}


export default Categories;

