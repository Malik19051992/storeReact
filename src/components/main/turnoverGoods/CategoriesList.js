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
                    <td><Link to={(this.props.otherParametrs.typeList === 0 ?"/createArrivedGoodsByCategory/":"/createSoldGoodsByCategory/") + item.id}> {item.name}</Link></td>
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

                        </tbody>
                    </table>
                </div>
            )
        }

    }
}


export default Categories;

